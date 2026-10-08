# Animation spec — Design System export

Every animation in the design system, as it runs in this export. Timings are the design's own.
Easing names: **ease-out-quint** = `cubic-bezier(.16,1,.3,1)` (`--ease-out-quint`), **ease-shutter** = the preloader curve.
**Reduced motion** (`prefers-reduced-motion: reduce`): every entrance shows its end state at once, loops stop,
3D icons render a still frame — the same rules as the design.

## Shared triggers

| Trigger | Implementation |
|---|---|
| In view | `IntersectionObserver` + rAF-throttled scroll check fallback; fires once per element |
| Hover / focus | CSS `:hover` / `:focus-visible` only |
| Tab change | `[data-tabs]` → `tabs:change` event; panels listening replay their demo |

## Foundations

**Motion sheet (`motion.html`)** — every demo replays its sample on entering view and on its "Replay" button:
fade-up (24px, .8s ease-out-quint), line reveal (clip frame, 1.05s, +.1s/line), stagger (.08s step),
count-up (1.4s, ease-out-cubic, rAF), accent-line drip and grow, snapping transitions. Each demo states its
duration and curve beside it.

**3D Icons / 3D Icon Lab / Service 3D components** — `<hi-3d-icon>` (three.js r150, shipped verbatim):
idle rotation `rotate-speed`, pointer parallax `mouse-parallax`, drag-to-rotate with inertia `drag-rotate`,
energy flow along rails `flow-speed`. Sheet previews are frozen (`rotate-speed 0`, `flow-speed 0`, no parallax/drag),
exactly like the design. Each scene stops rendering off-screen. iOS glow fix inline in `<head>`.

**UI Illustrations Lab** — each mock card's loop (rows filling, bars growing, pills cycling) runs on CSS keyframes
with the design's durations; the badge floats `translateY(0 → -10px)` on a 6s ease-in-out loop.

## Atoms

**Button** — label roll: the inner label translates `-100%` and the copy below rises in, .45s ease-out-quint;
arrow nudges 3px; primary lifts its glow. Link variant dims to .72 inside cards.
**Filter tabs** — active underline slides between tabs (.45s ease-out-quint); `--scrollfade` edge fades
re-measured on scroll/resize; a clipped tab is tweened into view (380ms, `scrollLeft`, 46px clearance).
**Accent line** — `flow="drip"`: a bright segment runs down/along the line on a loop (default 1.87s in the
component preview); `grow`: scales from 0 on entering view (.9s ease-out-quint).
**Icon tile** — plate lifts to white with `--shadow-tile` on hover (.2s).
**Pointer tilt** — `hi-tilt` (verbatim): card rotates up to the configured max toward the pointer with a moving
glare, eases back on leave.
**Figure** — image zooms to 1.04 on hover (.5s ease-out-quint).

## Molecules

**Cards** — value cards: hover lifts 4px with deeper shadow; `--open` keeps the body revealed; partner tiles
fade their logo to full colour. Case card: metric panel counts up on entering view.
**Stat Row** — on entering view: each figure's mask wipes open, dividers draw in staggered (.12s step), the
numbers count up (1.4s). Dark and light variants identical in timing.
**Logo Sphere** — partner marks orbit the extruded B on an ellipse (rAF), depth-sorted with scale/opacity by z;
pointer parallax tilts the orbit; pauses off-screen.
**Article blocks** — quote rule draws in, numbered rows fade up in sequence on entering view.
**Menu Row / Panel** — row fills `#f2f2f4` (.2s); tile turns white and lifts; chevron fades in and slides 3px.
Undocked panel: opacity + `translate(…,10px → 0)` + visibility, .3s ease-out-quint, nudged inside the
viewport via `--panel-shift`.

## Sections

**Site Header** — scroll progress bar; progressive blur and scrim fade in after the first scroll; nav ink
switches between light and dark by the section under the bar; dropdowns as Menu Panel above; mobile drawer
slides in with accordions animating to their measured height.
**Site Footer** — columns rise 30px and fade in on entering view (.8s/.9s ease-out-quint); two masked dot
fields, half the dots twinkling (4–8s loops, random delays).

## Component files

**Section Head** — each rendered title line rises out of its own clip frame (`translateY(118% → 0)`, 1.05s,
+.1s per line); eyebrow and body fade up 18px (.8s, body +.18s); triggers when the top crosses 94% of the
viewport; lines re-split 220ms after resize.
**FAQ Accordion** — answer opens to its measured height (max-height .45s ease-out-quint, opacity .35s),
chevron rotates 180°, the open row floats onto a tinted plaque (.3s); one open at a time.
**Form Field** — shell border/ring .25s; `--line` grows a 2px violet line from the centre (.35s ease-out-quint).
**Section Transition** — static ramp (the optional scroll squeeze is off by default, as in the design).
**News Card** — image 1.04 zoom, title to violet, accent dash scales `.7 → 1`, CTA label roll.
**Numeral / Numbered Item / Numbered Row / Caption** — static.
