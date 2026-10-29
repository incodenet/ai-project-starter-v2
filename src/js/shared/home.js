/* =========================================================
   Home page behaviour (templates/home.php, loaded with defer).
   ========================================================= */

(() => {
  /* ---------- Page loader and entrance ----------
     Counts up while the page loads (eases toward 90%, then 100%
     once window load and fonts are ready, capped at 4s), fades out,
     then reveals the page blocks. */
  const initLoader = () => {
    const loader = document.querySelector('[data-loader]');
    if (!loader) return;

    const outline = loader.querySelector('[data-loader-outline]');
    const fill = loader.querySelector('[data-loader-fill]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let progress = 0;
    let done = false;
    let resolveDone = null;

    const step = () => {
      const target = done ? 100 : 90;
      progress += (target - progress) * (done ? 0.25 : 0.035);
      if (done && progress > 99.5) progress = 100;

      const value = `${Math.round(progress)}%`;
      outline.textContent = value;
      fill.textContent = value;
      fill.style.clipPath = `inset(${100 - progress}% 0 0 0)`;

      if (progress < 100) requestAnimationFrame(step);
      else if (resolveDone) resolveDone();
    };

    const finish = () =>
      new Promise((resolve) => {
        resolveDone = resolve;
        done = true;
      });

    const reveal = () => {
      if (reducedMotion || !Element.prototype.animate) return;
      document.querySelectorAll('.header_bar, main > :not([data-loader]), .footer').forEach((block) => {
        if (block.offsetHeight === 0) return;
        block.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], {
          duration: 420,
          easing: 'cubic-bezier(.2,.7,.2,1)',
        });
      });
    };

    const loaded = new Promise((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve, { once: true });
    });
    const fonts = (document.fonts && document.fonts.ready) || Promise.resolve();
    const cap = new Promise((resolve) => setTimeout(resolve, 4000));

    requestAnimationFrame(step);

    Promise.race([Promise.all([loaded, fonts]), cap])
      .then(finish)
      .then(() => {
        setTimeout(() => {
          loader.classList.add('is-hidden');
          reveal();
          setTimeout(() => loader.remove(), 460);
        }, 180);
      });
  };

  /* ---------- Hero video ----------
     Plays forward from 0.5s, holds, plays the captured frames
     backwards on a canvas, holds again and restarts. */
  const initHeroVideo = () => {
    const video = document.querySelector('[data-hero-video]');
    if (!video) return;

    const LOOP_PAUSE_MS = 2000;
    const FRAME_WIDTH = 640;
    const frames = [];
    let floor = 0;
    let reversing = false;
    let finished = false;
    let captured = false;
    let lastGrab = -1;
    let canvas = null;
    let context = null;
    let drawing = false;

    const hideCanvas = () => {
      if (canvas) canvas.style.opacity = '0';
    };

    video.muted = true;
    const playing = video.play();
    if (playing && playing.catch) playing.catch(() => {});

    /* frame capture for the reverse pass */
    if (video.requestVideoFrameCallback) {
      let buffer = null;
      let bufferContext = null;

      const grab = () => {
        if (video.videoWidth && !finished) {
          const height = Math.round((FRAME_WIDTH * video.videoHeight) / video.videoWidth);
          if (!buffer) {
            buffer = document.createElement('canvas');
            buffer.width = FRAME_WIDTH;
            buffer.height = height;
            bufferContext = buffer.getContext('2d');
          }
          const start = video.duration > 1 ? 0.5 : 0;
          if (!captured && frames.length < 200 && video.currentTime >= start && video.currentTime > lastGrab) {
            lastGrab = video.currentTime;
            bufferContext.drawImage(video, 0, 0, FRAME_WIDTH, height);
            const frame = document.createElement('canvas');
            frame.width = FRAME_WIDTH;
            frame.height = height;
            frame.getContext('2d').drawImage(buffer, 0, 0);
            frames.push({ canvas: frame, time: video.currentTime });
          }
        }
        if (!finished) video.requestVideoFrameCallback(grab);
      };
      video.requestVideoFrameCallback(grab);
    }

    video.addEventListener('loadeddata', () => {
      floor = video.duration > 1 ? 0.5 : 0;
      if (!floor) return;
      try {
        video.currentTime = 0.5;
      } catch (error) {
        /* not seekable yet */
      }
    });

    video.addEventListener('seeked', () => video.classList.add('is-visible'));

    video.addEventListener('play', () => {
      if (!reversing) hideCanvas();
    });

    video.addEventListener('timeupdate', () => {
      if (!reversing && canvas && canvas.style.opacity !== '0') hideCanvas();
      if (video.currentTime > 0.45) video.classList.add('is-visible');
      if (reversing || !(video.duration > 1) || video.currentTime >= 0.45) return;
      try {
        video.currentTime = 0.5;
      } catch (error) {
        /* ignore */
      }
    });

    const restart = () => {
      drawing = false;
      setTimeout(() => {
        try {
          video.currentTime = floor;
          const resume = () => {
            if (video.currentTime < floor + 0.02) return;
            video.removeEventListener('timeupdate', resume);
            hideCanvas();
            reversing = false;
            finished = false;
          };
          video.addEventListener('timeupdate', resume);
          video.play().catch(() => {});
          setTimeout(resume, 700);
        } catch (error) {
          hideCanvas();
          reversing = false;
          finished = false;
        }
      }, Math.round(LOOP_PAUSE_MS * 0.4));
    };

    const playBackwards = () => {
      try {
        video.pause();
      } catch (error) {
        /* ignore */
      }

      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.className = 'hero_video-reverse';
        canvas.setAttribute('aria-hidden', 'true');
        canvas.width = frames[0].canvas.width;
        canvas.height = frames[0].canvas.height;
        context = canvas.getContext('2d');
        video.parentNode.appendChild(canvas);
      }
      if (drawing) return;
      drawing = true;

      const first = frames[0].time;
      const last = frames[frames.length - 1].time;
      const total = Math.max(600, (last - first) * 1000);
      const startedAt = performance.now();
      canvas.style.opacity = '1';

      const draw = (now) => {
        const progress = Math.min(1, (now - startedAt) / total);
        const target = first + (1 - progress) * (last - first);
        let index = 0;
        for (let k = frames.length - 1; k >= 0; k--) {
          if (frames[k].time <= target) {
            index = k;
            break;
          }
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frames[index].canvas, 0, 0);
        if (progress < 1) requestAnimationFrame(draw);
        else {
          drawing = false;
          restart();
        }
      };
      requestAnimationFrame(draw);
    };

    video.addEventListener('ended', () => {
      if (reversing) return;
      reversing = true;
      finished = true;

      const lastTime = frames.length ? frames[frames.length - 1].time : 0;
      if (lastTime >= video.duration - 0.25) {
        if (frames.length > 8) frames.splice(0, 2);
        captured = true;
      } else {
        frames.length = 0;
        lastGrab = -1;
      }

      setTimeout(frames.length < 8 ? restart : playBackwards, LOOP_PAUSE_MS);
    });
  };

  /* ---------- In stock: Individual / Professional filter ----------
     Switches the pressed option and the product photo set. */
  const initStockFilter = () => {
    const options = document.querySelectorAll('[data-stock-filter]');
    if (!options.length) return;

    const images = document.querySelectorAll('[data-src-professional]');

    options.forEach((option) => {
      option.addEventListener('click', () => {
        const audience = option.dataset.stockFilter;
        options.forEach((other) => {
          const active = other === option;
          other.classList.toggle('abq-segmented_option--active', active);
          other.setAttribute('aria-pressed', String(active));
        });
        images.forEach((image) => {
          image.src = audience === 'professional' ? image.dataset.srcProfessional : image.dataset.srcIndividual;
        });
      });
    });
  };

  /* ---------- In stock: slider arrows ---------- */
  const initSlider = () => {
    document.querySelectorAll('[data-slider-prev], [data-slider-next]').forEach((button) => {
      button.addEventListener('click', () => {
        const slider = button.closest('section').querySelector('[data-slider]');
        if (!slider) return;
        const direction = button.hasAttribute('data-slider-prev') ? -1 : 1;
        slider.scrollBy({ left: direction * slider.clientWidth * 0.8, behavior: 'smooth' });
      });
    });
  };

  initLoader();
  initHeroVideo();
  initStockFilter();
  initSlider();
})();
