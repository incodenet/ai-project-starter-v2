<link rel="stylesheet" href="assets/css/pages/home.css">
<link rel="stylesheet" href="assets/css/pages/home.tablet.css" media="(max-width: 1100px)">

<div class="hero-band" data-hero-band>
  <div class="hero-band_bg" aria-hidden="true"></div>
  <div class="hero-band_pattern" aria-hidden="true"></div>

  <!-- ========================= HERO ========================= -->
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero_content" data-reveal>
      <p class="eyebrow eyebrow--live">
        <span class="hero_live" aria-hidden="true"><span class="hero_live-dot"></span></span>
        Производитель полного цикла
      </p>
      <h1 class="hero_title" id="hero-title">Свой завод, свои люди&nbsp;<span class="accent">Полный цикл</span></h1>
      <p class="hero_text">ARIDES — это собственные инженерные компетенции, несколько производственных площадок и полный цикл разработки и выпуска изделий: от идеи до готового продукта.</p>
      <div class="hero_buttons">
        <a class="button button--primary" href="production.html">
          <svg class="icon" width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M1.3335 1.33334V14.6667H14.6668V6.00001L10.0002 8.66668V6.00001L5.3335 8.66668V1.33334H1.3335Z" stroke="currentColor" stroke-width="1.2"></path><path d="M4 14.6667V12" stroke="currentColor" stroke-width="1.2"></path></svg>
          Смотреть производство
        </a>
        <a class="button button--secondary" href="catalog.html">
          Каталог продукции
          <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
        </a>
      </div>
    </div>

    <div class="hero_media" data-reveal data-reveal-delay="140">
      <figure class="hero_frame">
        <img class="hero_image" src="assets/img/hero-main.webp" alt="Производственный корпус ARIDES — общий план">
      </figure>

      <div class="float-card float-card--load">
        <svg width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
          <circle cx="26" cy="26" r="21" fill="none" stroke="#EDEDED" stroke-width="5"></circle>
          <circle cx="26" cy="26" r="21" fill="none" stroke="rgba(223,6,57,0.18)" stroke-width="1"></circle>
          <circle class="float-card_ring" cx="26" cy="26" r="21" fill="none" stroke="#DF0639" stroke-width="3" stroke-linecap="round" stroke-dasharray="131.9" stroke-dashoffset="9.2" transform="rotate(-90 26 26)"></circle>
        </svg>
        <div>
          <p class="float-card_value">93%</p>
          <p class="float-card_label">загрузка по <br>площадкам</p>
        </div>
      </div>

      <div class="float-card float-card--lines">
        <p class="float-card_caption">Производственные линии</p>
        <p class="float-card_status">
          <span class="float-card_dot" aria-hidden="true"></span>
          Активны 12 участков
        </p>
      </div>
    </div>
  </section>

  <!-- ========================= METRICS ========================= -->
  <section class="metrics" aria-labelledby="metrics-title">
    <div class="metrics_panel anim-defer" data-reveal data-anim-defer>
      <div class="metrics_frame">
        <div class="metrics_bg" aria-hidden="true"></div>
        <div class="metrics_inner">
          <div class="metrics_head">
            <p class="eyebrow eyebrow--dark">Производство в цифрах</p>
            <h2 class="metrics_title" id="metrics-title">Показатели группы <span class="accent accent--light">в реальном времени</span></h2>
          </div>

          <div class="metrics_grid">
            <!-- Gauge -->
            <article class="metric-card">
              <h3 class="metric-card_title">Загрузка мощностей</h3>
              <p class="metric-card_subtitle metric-card_subtitle--gauge">Средняя по трём площадкам</p>
              <div class="gauge">
                <svg class="gauge_svg" viewBox="0 0 180 180" role="img" aria-label="Загрузка мощностей 91%">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stop-color="#FF6B85"></stop>
                      <stop offset="100%" stop-color="#DF0639"></stop>
                    </linearGradient>
                  </defs>
                  <circle cx="90" cy="90" r="58" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="5"></circle>
                  <circle class="gauge_progress" cx="90" cy="90" r="58" fill="none" stroke="url(#gauge-gradient)" stroke-width="5" stroke-linecap="round" stroke-dasharray="364.4" stroke-dashoffset="364.4" transform="rotate(-90 90 90)"></circle>
                  <text class="gauge_value" data-count-to="91" x="84" y="101" text-anchor="middle" fill="#FFFFFF">0</text>
                  <text class="gauge_unit" x="112" y="101" text-anchor="start" fill="rgba(255,255,255,0.5)">%</text>
                </svg>
              </div>
            </article>

            <!-- Area chart -->
            <article class="metric-card">
              <h3 class="metric-card_title">Выпуск изделий / смена</h3>
              <p class="metric-card_subtitle">Динамика за последние смены</p>
              <div class="chart">
                <div class="chart_plot">
                  <svg class="chart_svg" viewBox="0 0 240 90" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#FF6B85" stop-opacity="0.42"></stop>
                        <stop offset="100%" stop-color="#FF6B85" stop-opacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path class="chart_area" d="M0,66 C15,66 15,58 30,58 C45,58 45,70 60,70 C75,70 75,48 90,48 C105,48 105,60 120,60 C135,60 135,36 150,36 C165,36 165,48 180,48 C195,48 195,26 210,26 C225,26 225,30 240,30 L240,90 L0,90 Z" fill="url(#chart-gradient)"></path>
                    <path class="chart_line" d="M0,66 C15,66 15,58 30,58 C45,58 45,70 60,70 C75,70 75,48 90,48 C105,48 105,60 120,60 C135,60 135,36 150,36 C165,36 165,48 180,48 C195,48 195,26 210,26 C225,26 225,30 240,30" fill="none" stroke="#FF3357" stroke-width="1.4" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  <span class="chart_dot" aria-hidden="true"></span>
                </div>
                <span class="chart_value" data-count-to="1480">0</span>
              </div>
            </article>

            <!-- Bars -->
            <article class="metric-card">
              <h3 class="metric-card_title">Производственные площадки</h3>
              <p class="metric-card_subtitle">Загрузка по площадкам</p>
              <div class="bars">
                <div class="bars_row">
                  <span class="bars_label">№1</span>
                  <span class="bars_track"><span class="bars_fill"></span></span>
                  <span class="bars_value">93%</span>
                </div>
                <div class="bars_row">
                  <span class="bars_label">№2</span>
                  <span class="bars_track"><span class="bars_fill"></span></span>
                  <span class="bars_value">91%</span>
                </div>
                <div class="bars_row">
                  <span class="bars_label">№3</span>
                  <span class="bars_track"><span class="bars_fill"></span></span>
                  <span class="bars_value">89%</span>
                </div>
              </div>
            </article>

            <!-- Red card -->
            <article class="metric-card metric-card--accent">
              <canvas class="dome" data-dome aria-hidden="true"></canvas>
              <div class="dots-overlay" aria-hidden="true"></div>
              <h3 class="metric-card_title">Производитель полного цикла</h3>
              <p class="metric-card_subtitle">с 2008 года</p>
              <div class="years">
                <span class="years_value">18</span>
                <span class="years_label">лет на рынке</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<!-- ========================= CATALOG ========================= -->
<section class="catalog" id="catalog" aria-labelledby="catalog-title">
  <div class="catalog_bg" aria-hidden="true">
    <div class="catalog_pattern"></div>
    <div class="catalog_blur"></div>
  </div>

  <div class="section-head catalog_head" data-reveal>
    <div class="section-head_text">
      <p class="eyebrow">Каталог</p>
      <h2 class="section-title" id="catalog-title">Продукция по <span class="accent">категориям</span></h2>
    </div>
    <a class="button button--link" href="catalog.html">
      Перейти в каталог
      <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
    </a>
  </div>

  <div class="tabs" role="tablist" aria-label="Категории продукции" data-tabs data-reveal data-reveal-delay="80">
    <button class="tab" id="catalog-tab-beds" type="button" role="tab" aria-selected="true" aria-controls="catalog-track" data-category="beds">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 5.5V18.5" stroke="currentColor" stroke-width="1.5"></path><path d="M3 14H21" stroke="currentColor" stroke-width="1.5"></path><path d="M21 18.5V14.5" stroke="currentColor" stroke-width="1.5"></path><path d="M11 7.5V14H21V9.5C21 8.39543 20.1046 7.5 19 7.5H11Z" stroke="currentColor" stroke-width="1.5"></path><circle cx="7" cy="10" r="2" fill="currentColor"></circle></svg>
      Медицинские кровати
    </button>
    <button class="tab" id="catalog-tab-alco" type="button" role="tab" aria-selected="false" aria-controls="catalog-track" tabindex="-1" data-category="alco">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2 2H22V22H2V2Z" stroke="currentColor" stroke-width="1.5"></path><path d="M6 14H18V18H6V14Z" stroke="currentColor" stroke-width="1.5"></path></svg>
      Алкотестеры
    </button>
    <button class="tab" id="catalog-tab-sanit" type="button" role="tab" aria-selected="false" aria-controls="catalog-track" tabindex="-1" data-category="sanit">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.74805 2.75V12.7305C4.74805 12.9017 4.88739 13.041 5.05859 13.041H18.4346C19.3143 13.0409 20.0273 12.327 20.0273 11.4473C20.0271 10.5677 19.3141 9.85463 18.4346 9.85449H9.14355V2.75H4.74805Z" stroke="currentColor" stroke-width="1.5"></path><path d="M4.63081 12.8828L7.35174 15.6037V21.4991H16.6939L15.7869 19.2316C16.8451 18.0223 18.8706 15.1503 18.5078 13.3363" stroke="currentColor" stroke-width="1.5"></path></svg>
      Кресла-туалеты
    </button>
    <button class="tab" id="catalog-tab-walkers" type="button" role="tab" aria-selected="false" aria-controls="catalog-track" tabindex="-1" data-category="walkers">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.10547 19.9167V13.4583M6.10547 7V3.66667L7.5 3M6.10547 7H18.1888M6.10547 7V13.4583M18.1888 7V3.66667L19.5 3M18.1888 7V13.4583M18.1888 19.9167V13.4583M6.10547 13.4583H18.1888" stroke="currentColor" stroke-width="1.5"></path><circle cx="6" cy="20" r="2" fill="currentColor"></circle><circle cx="18" cy="20" r="2" fill="currentColor"></circle></svg>
      Ходунки
    </button>
    <button class="tab" id="catalog-tab-wheelchairs" type="button" role="tab" aria-selected="false" aria-controls="catalog-track" tabindex="-1" data-category="wheelchairs">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3.5H6.57895C6.82602 3.5 7.02632 3.70029 7.02632 3.94737V7.07895M7.02632 8.86842V7.07895M7.02632 7.07895H15.8684C16.4207 7.07895 16.8684 7.52666 16.8684 8.07895V11.7763M16.8684 16.4737V11.7763M16.8684 11.7763H13.7368" stroke="currentColor" stroke-width="1.5"></path><circle cx="8.36842" cy="15.1301" r="4.61842" stroke="currentColor" stroke-width="1.5"></circle><circle cx="16.8697" cy="18.2642" r="1.48684" stroke="currentColor" stroke-width="1.5"></circle><path d="M20.8951 18.1719H18.2109" stroke="currentColor" stroke-width="1.5"></path></svg>
      Кресла-коляски
    </button>
    <button class="tab" id="catalog-tab-lamps" type="button" role="tab" aria-selected="false" aria-controls="catalog-track" tabindex="-1" data-category="lamps">
      <svg class="icon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18.4672 7.32122C18.8189 8.1705 19 9.08075 19 10C19 10.9193 18.8189 11.8295 18.4672 12.6788C18.1154 13.5281 17.5998 14.2997 16.9497 14.9497C16.2997 15.5998 15.5281 16.1154 14.6788 16.4672C13.8295 16.8189 12.9193 17 12 17C11.0807 17 10.1705 16.8189 9.32122 16.4672C8.47194 16.1154 7.70026 15.5998 7.05025 14.9497C6.40024 14.2997 5.88463 13.5281 5.53284 12.6788C5.18106 11.8295 5 10.9193 5 10C5 9.08075 5.18106 8.1705 5.53284 7.32122C5.88463 6.47194 6.40024 5.70026 7.05025 5.05025C7.70026 4.40024 8.47194 3.88463 9.32122 3.53284C10.1705 3.18106 11.0807 3 12 3C12.9193 3 13.8295 3.18106 14.6788 3.53284C15.5281 3.88463 16.2997 4.40024 16.9497 5.05025C17.5998 5.70026 18.1154 6.47194 18.4672 7.32122Z" stroke="currentColor" stroke-width="1.5"></path><path d="M12 17L17 19.6667L14.5 21H12" stroke="currentColor" stroke-width="1.5"></path><path d="M12 17L7 19.6667L9.5 21H12" stroke="currentColor" stroke-width="1.5"></path></svg>
      Соляные лампы
    </button>
  </div>

  <div class="slider" data-slider>
    <button class="icon-button slider_arrow slider_arrow--prev" type="button" aria-label="Назад" aria-controls="catalog-track" data-slider-prev>
      <svg class="icon" width="22" height="22" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
    </button>
    <button class="icon-button slider_arrow slider_arrow--next" type="button" aria-label="Вперёд" aria-controls="catalog-track" data-slider-next>
      <svg class="icon" width="22" height="22" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
    </button>
    <div class="slider_track hidden-scrollbar" id="catalog-track" role="tabpanel" aria-labelledby="catalog-tab-beds" aria-live="polite" data-slider-track></div>
  </div>

  <template id="product-card-template">
    <article class="product-card">
      <div class="product-card_media">
        <img class="product-card_image" src="" alt="" loading="lazy" decoding="async" data-field="image">
      </div>
      <div class="product-card_body">
        <h3 class="product-card_title"><a href="" data-field="title"></a></h3>
        <p class="product-card_spec" data-field="spec"></p>
        <div class="product-card_actions">
          <button class="product-card_request" type="button" data-field="request">Запросить цену</button>
          <a class="product-card_link" href="" aria-label="Открыть страницу товара" data-field="link">
            <svg class="icon" width="18" height="18" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
          </a>
        </div>
      </div>
    </article>
  </template>

  <script type="application/json" id="catalog-data">
    {
      "beds": {
        "href": "product.html",
        "items": [
          { "name": "Barry MB1", "spec": "Медицинская механическая кровать", "image": "assets/img/product-barry-mb1.webp" },
          { "name": "Barry MB2", "spec": "Медицинская механическая кровать", "image": "assets/img/product-barry-mb2.webp" },
          { "name": "Barry MB3", "spec": "Медицинская механическая кровать", "image": "assets/img/product-barry-mb3.webp" },
          { "name": "Barry MBЕ2", "spec": "Медицинская электрическая кровать", "image": "assets/img/product-barry-mbe2.webp" },
          { "name": "Barry MBЕ3", "spec": "Медицинская электрическая кровать", "image": "assets/img/product-barry-mbe3.webp" },
          { "name": "Barry Pino", "spec": "Прикроватный столик", "image": "assets/img/product-barry-pino.webp" }
        ]
      },
      "alco": {
        "href": "catalog.html",
        "items": [
          { "name": "Динго Е-200", "spec": "Профессиональный алкотестер · электрохимический сенсор · память на 500 измерений", "image": "assets/img/product-dingo-e200.webp" },
          { "name": "Динго Е-200 (B)", "spec": "Профессиональный алкотестер", "image": "assets/img/product-dingo-e200b.webp" },
          { "name": "Динго Е-200 с принтером", "spec": "Профессиональный алкотестер", "image": "assets/img/product-dingo-e200pr.webp" },
          { "name": "Динго Е-010", "spec": "Профессиональный алкотестер", "image": "assets/img/product-dingo-e010.webp" }
        ]
      },
      "sanit": {
        "href": "catalog.html",
        "items": [
          { "name": "Barry WC100", "spec": "Кресло-туалет", "image": "assets/img/product-wc100.webp" },
          { "name": "Barry WC101", "spec": "Кресло-туалет", "image": "assets/img/product-wc101.webp" },
          { "name": "Barry WC200", "spec": "Кресло-туалет", "image": "assets/img/product-wc200.webp" },
          { "name": "Barry WC201", "spec": "Кресло-туалет", "image": "assets/img/product-wc201.webp" },
          { "name": "Barry WC302", "spec": "Кресло-туалет", "image": "assets/img/product-wc302.webp" }
        ]
      },
      "walkers": {
        "href": "catalog.html",
        "items": [
          { "name": "R Wheel", "spec": "Опоры-ходунки", "image": "assets/img/product-rwheel.webp" },
          { "name": "W HR", "spec": "Опоры-ходунки", "image": "assets/img/product-whr.webp" },
          { "name": "W Navigator", "spec": "Опоры-ходунки", "image": "assets/img/product-wnavigator.webp" },
          { "name": "W Universal", "spec": "Опоры-ходунки", "image": "assets/img/product-wuniversal.webp" },
          { "name": "Трость Standart", "spec": "Трость опорная", "image": "assets/img/product-standart.webp" }
        ]
      },
      "wheelchairs": {
        "href": "catalog.html",
        "items": [
          { "name": "CA881", "spec": "Кресло-коляска", "image": "assets/img/product-ca881.webp" }
        ]
      },
      "lamps": {
        "href": "catalog.html",
        "items": [
          { "name": "Barry Rock с USB", "spec": "Соляная лампа", "image": "assets/img/product-lamp-rockusb.webp" },
          { "name": "Barry Globe с USB", "spec": "Соляная лампа", "image": "assets/img/product-lamp-globeusb.webp" },
          { "name": "Barry Heart с USB", "spec": "Соляная лампа", "image": "assets/img/product-lamp-heartusb.webp" },
          { "name": "Barry Moon с USB", "spec": "Соляная лампа", "image": "assets/img/product-lamp-moonusb.webp" },
          { "name": "Barry Wood", "spec": "Соляная лампа", "image": "assets/img/product-lamp-wood.webp" }
        ]
      }
    }
  </script>
</section>

<!-- ========================= PRODUCTION SITES ========================= -->
<section class="sites" id="sites" aria-labelledby="sites-title">
  <div class="section-head sites_head" data-reveal>
    <div class="section-head_text">
      <p class="eyebrow">Производство</p>
      <h2 class="section-title" id="sites-title">Производственные <span class="accent">площадки</span></h2>
    </div>
  </div>

  <div class="sites_grid" data-reveal>
    <article class="site-card site-card--wide site-card--dark site-card--medical">
      <img class="site-card_image site-card_image--mirrored" src="assets/img/site-1.webp" alt="Площадка №1 — производственный цех медицинских изделий" loading="lazy" decoding="async">
      <span class="site-card_scrim" aria-hidden="true"></span>
      <div class="site-card_content">
        <div class="site-card_meta">
          <span class="site-card_icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 5V2H10V5H7V9H10V12H14V9H17V5H14Z"></path><path d="M4.5 22.5L2 20V9C4 9 5.5 10 5.5 12V15"></path><path d="M19.5322 22.5L22.0322 20V9C20.0322 9 18.5322 10 18.5322 12V15"></path><path d="M6.65607 19.337L5.64607 18.327C4.43407 17.115 4.73707 15.6 5.94907 14.387L10.0021 18.441V23"></path><path d="M17.3758 19.337L18.3858 18.327C19.5978 17.115 19.2958 15.6 18.0828 14.387L14.0298 18.441V23"></path></svg>
          </span>
          <p class="site-card_kicker">Площадка №1 <br>Медицинские изделия</p>
        </div>
        <h3 class="site-card_title site-card_title--balanced" id="site-medical-title">Производство медицинских изделий</h3>
        <p class="site-card_text">Пластик, металл, окраска, сборка и упаковка на одной площадке.</p>
      </div>
      <a class="site-card_arrow" href="production-medical-equipment.html" aria-describedby="site-medical-title" aria-label="Подробнее о площадке" title="Подробнее о площадке">
        <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </a>
    </article>

    <article class="site-card site-card--narrow site-card--bordered site-card--alco">
      <img class="site-card_image" src="assets/img/site-2.webp" alt="Площадка №2 — алкотестеры ARIDES на линии сборки" loading="lazy" decoding="async">
      <div class="site-card_content">
        <div class="site-card_meta">
          <span class="site-card_icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 15V22M8 22H16"></path><path d="M4.5 6.5H19.5" stroke-linejoin="round"></path><path d="M4.5 2H19.5V7.5C19.5 9.48912 18.7098 11.3968 17.3033 12.8033C15.8968 14.2098 13.9891 15 12 15C10.0109 15 8.10322 14.2098 6.6967 12.8033C5.29018 11.3968 4.5 9.48912 4.5 7.5V2Z"></path></svg>
          </span>
          <p class="site-card_kicker">Площадка №2 <br>Алкотестеры ARIDES</p>
        </div>
        <h3 class="site-card_title" id="site-alco-title">Производство алкотестеров</h3>
        <p class="site-card_text">Измерительные приборы: сборка, калибровка, контроль и хранение.</p>
      </div>
      <a class="site-card_arrow" href="production-alcotester.html" aria-describedby="site-alco-title" aria-label="Подробнее о площадке" title="Подробнее о площадке">
        <svg class="icon" width="19" height="19" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </a>
    </article>

    <article class="site-card site-card--narrow site-card--bordered site-card--abeq">
      <img class="site-card_image" src="assets/img/site-3.webp" alt="Площадка №3 — цех пресс-форм ABEQ Tech" loading="lazy" decoding="async">
      <div class="site-card_content">
        <div class="site-card_meta">
          <span class="site-card_icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15.5 2.00001C16.4861 1.99863 17.4595 2.22231 18.346 2.65401L14.5 6.50001V9.50001H17.5L21.346 5.65401C21.925 6.84132 22.1284 8.17685 21.9293 9.48271C21.7302 10.7886 21.138 12.0028 20.2314 12.9636C19.3249 13.9244 18.1472 14.5862 16.8551 14.8609C15.563 15.1355 14.2179 15.01 12.999 14.501L5.5 22L2 18.5L9.499 11.001C9.08718 10.0131 8.92569 8.93881 9.02885 7.8735C9.13201 6.80819 9.49663 5.78484 10.0903 4.89432C10.6841 4.00379 11.4885 3.27366 12.4322 2.76875C13.3759 2.26384 14.4297 1.99977 15.5 2.00001Z"></path></svg>
          </span>
          <p class="site-card_kicker">Площадка №3 <br>ABEQ TECH</p>
        </div>
        <h3 class="site-card_title" id="site-abeq-title">Производство <br>пресс-форм</h3>
        <p class="site-card_text">Оснастка для пластмассовых изделий.</p>
      </div>
      <a class="site-card_arrow" href="production-abeq-tech.html" aria-describedby="site-abeq-title" aria-label="Подробнее о площадке" title="Подробнее о площадке">
        <svg class="icon" width="19" height="19" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </a>
    </article>

    <article class="site-card site-card--wide site-card--bordered site-card--lab">
      <img class="site-card_image" src="assets/img/site-4.webp" alt="Площадка №4 — метрологическая лаборатория" loading="lazy" decoding="async">
      <div class="site-card_content">
        <div class="site-card_meta">
          <span class="site-card_icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"><path d="M6.99023 5.55859H12.0003V12.5662H6.99023V5.55859Z"></path><path d="M8.06348 5.55821V2.69531H10.9264V5.55821"></path><path d="M12.7487 9.22074C15.2948 9.22074 17.3589 11.2848 17.3589 13.831V17.7256L21.3052 17.7254V13.8716C21.3052 9.28475 17.5869 5.56641 13.0001 5.56641H10.5693"></path><path d="M6.98985 21.3042H21.3044V17.7256H4.12695"></path><path d="M9.94363 17.7256L6.98926 21.3042" stroke-linecap="butt"></path><path d="M7.39226 21.3047H2.69531"></path></svg>
          </span>
          <p class="site-card_kicker">Площадка №4 <br>лаборатория</p>
        </div>
        <h3 class="site-card_title site-card_title--balanced" id="site-lab-title">Метрологическая лаборатория</h3>
        <p class="site-card_text">Поверка, калибровка и обслуживание анализаторов паров этанола любых производителей.</p>
      </div>
      <a class="site-card_arrow" href="production-metrology-lab.html" aria-describedby="site-lab-title" aria-label="Подробнее о площадке" title="Подробнее о площадке">
        <svg class="icon" width="20" height="20" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </a>
    </article>
  </div>
</section>

<!-- ========================= PROCESSES ========================= -->
<section class="processes" id="processes" aria-labelledby="processes-title">
  <div class="section-head processes_head" data-reveal>
    <div class="section-head_text">
      <p class="eyebrow">Возможности производства</p>
      <h2 class="section-title" id="processes-title">Процессы и участки — от литья до <span class="accent">упаковки</span></h2>
      <p class="processes_lead">Каждый процесс — отдельный участок со своим оборудованием и командой.</p>
    </div>
    <div class="processes_nav">
      <button class="icon-button" type="button" aria-label="Назад" aria-controls="processes-track" data-processes-prev>
        <svg class="icon" width="22" height="22" aria-hidden="true"><use href="#icon-arrow-left"></use></svg>
      </button>
      <button class="icon-button" type="button" aria-label="Вперёд" aria-controls="processes-track" data-processes-next>
        <svg class="icon" width="22" height="22" aria-hidden="true"><use href="#icon-arrow-right"></use></svg>
      </button>
    </div>
  </div>

  <div class="processes_track hidden-scrollbar anim-defer" id="processes-track" data-reveal data-anim-defer data-processes-track>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-casting.webp" alt="Литьё пластика" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title">Литьё пластика</h3>
      <p class="process-card_text">Термопластавтоматы для серийного и мелкосерийного литья. Точные размеры и стабильное качество деталей.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-welding.png" alt="Сварка и сварочный робот" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title process-card_title--two-lines">Сварка и<br>сварочный робот</h3>
      <p class="process-card_text">Роботизированная и ручная сварка металлоконструкций. Ровный шов и повторяемость на потоке.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-powder-coating.png" alt="Порошковая окраска" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title process-card_title--two-lines">Порошковая<br>окраска</h3>
      <p class="process-card_text">Нанесение и полимеризация покрытия в камере. Стойкий равномерный слой без подтёков.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-painting-line.png" alt="Покрасочная линия" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title process-card_title--two-lines">Покрасочная<br>линия</h3>
      <p class="process-card_text">Жидкая окраска на конвейере с камерой сушки. Готовая поверхность под любой цвет и фактуру.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-metalworking.png" alt="Металлообработка" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title">Металлообработка</h3>
      <p class="process-card_text">Резка, гибка и обработка металла на станках с ЧПУ. От заготовки до готового узла.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-assembly.png" alt="Конвейерная и ручная сборка" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title process-card_title--two-lines">Конвейерная и<br>ручная сборка</h3>
      <p class="process-card_text">Сборка изделий на линии и на постах. Собираем как продукт, а не как набор операций.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-packaging.png" alt="Упаковка" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title">Упаковка</h3>
      <p class="process-card_text">Упаковка и маркировка готовой продукции. Защита при хранении и доставке.</p>
    </article>
    <article class="process-card">
      <div class="process-card_media"><img class="process-card_image" src="assets/img/process-printing.png" alt="Типография" loading="lazy" decoding="async"></div>
      <h3 class="process-card_title">Типография</h3>
      <p class="process-card_text">Печать этикеток, коробок и полиграфии. Оформление продукта под ваш бренд.</p>
    </article>
  </div>
</section>

<script src="assets/js/shared/home.js" defer></script>
