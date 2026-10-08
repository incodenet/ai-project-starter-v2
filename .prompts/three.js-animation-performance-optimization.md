# Three.js Animation Performance Optimization Prompt

## Role

Act as a senior Three.js / WebGL performance engineer.

Your task is to analyze the existing Three.js implementation and optimize its code and runtime performance while preserving the current visual appearance, animation behavior, timing, interactions, responsive behavior, and the animation logic delivered by the design.

This is a **code optimization task only**.

Do **not** redesign, reinterpret, simplify, replace, or recreate the animation.

Do **not** change the animation technology, rendering approach, animation library, or core implementation strategy unless a change is strictly required to fix a bug and does not alter the original behavior.

The existing Three.js implementation and the animation behavior coming from the design are the source of truth.

The optimized result must look and behave the same as the current implementation.

---

## Primary Goals

Optimize the Three.js scene for:

- higher and more stable FPS;
- lower CPU usage;
- lower GPU usage;
- fewer draw calls;
- lower memory consumption;
- fewer unnecessary allocations;
- reduced garbage collection;
- reduced main-thread workload;
- better mobile performance;
- smoother scrolling;
- faster initialization;
- correct cleanup and disposal;
- no memory leaks.

Target:

- desktop: stable **60 FPS** where realistically possible;
- mobile: stable **30–60 FPS**, depending on device capability;
- avoid noticeable frame drops during animation, scrolling, resizing, and interaction.

---

# 1. Analyze Before Modifying

Before changing the implementation, inspect the complete Three.js lifecycle:

```text
scene creation
↓
renderer initialization
↓
camera setup
↓
geometry creation
↓
material creation
↓
texture loading
↓
object creation
↓
animation loop
↓
user interaction
↓
resize handling
↓
scroll handling
↓
component/page destruction
```

Identify performance bottlenecks before refactoring.

Pay particular attention to:

- `requestAnimationFrame`;
- `renderer.render()`;
- object count;
- mesh count;
- draw calls;
- geometry complexity;
- shader complexity;
- material count;
- texture sizes;
- shadows;
- lights;
- transparency;
- post-processing;
- DOM measurements;
- scroll listeners;
- resize listeners;
- raycasting;
- object creation inside animation loops;
- unnecessary matrix calculations;
- unnecessary scene updates.

Do not apply optimizations blindly.

---

# 2. Preserve Existing Animation and Design Behavior

Treat the existing animation as **locked design behavior**.

Do not make subjective improvements to motion or replace the original animation with a supposedly cleaner, simpler, more modern, or more performant alternative.

Do not change:

- the animation engine or technology;
- Three.js to another rendering technology;
- GSAP / ScrollTrigger to another animation system if currently used;
- shader-based animation to CSS/DOM animation;
- JavaScript animation to CSS animation;
- the animation architecture purely for stylistic or technological reasons;
- the intended animation logic exported or implemented from the original design.

Optimization must happen primarily at the code/runtime level: remove redundant work, cache values, reduce allocations, avoid duplicate calculations, improve lifecycle management, reduce unnecessary renders, and optimize existing Three.js usage without changing what the user sees.

The following must remain unchanged unless technically impossible:

- animation sequence;
- timing;
- easing;
- camera movement;
- object positions;
- object rotations;
- object scale;
- object colors;
- materials;
- lighting appearance;
- transitions;
- scroll-triggered behavior;
- mouse interactions;
- hover behavior;
- responsive layouts;
- current breakpoints;
- animation direction;
- visual hierarchy.

Small internal implementation differences are acceptable only when they are visually and behaviorally imperceptible.

Do **not** simplify the design, motion, geometry, effects, materials, or animation sequence purely to achieve a higher FPS.

If an optimization would change the visible animation or design in any way, do not apply it automatically. Report it separately as an optional optimization instead.

---

# 3. Optimize the Render Loop

Inspect the animation loop.

Avoid unnecessary work such as:

```js
function animate() {
  requestAnimationFrame(animate);

  // expensive calculations
  // allocations
  // DOM queries
  // event processing
  // repeated setup

  renderer.render(scene, camera);
}
```

Move static calculations outside the render loop.

Do not allocate unnecessary objects every frame.

Avoid patterns such as:

```js
const position = new THREE.Vector3();
const quaternion = new THREE.Quaternion();
const matrix = new THREE.Matrix4();
```

inside `requestAnimationFrame`.

Reuse temporary objects:

```js
const tempVector = new THREE.Vector3();
const tempQuaternion = new THREE.Quaternion();
```

where appropriate.

---

# 4. Render Only When Necessary

Determine whether the scene actually needs continuous rendering.

If the scene is mostly static and only changes on:

- scrolling;
- mouse movement;
- GSAP animation;
- camera movement;
- interaction;

consider an invalidation-based rendering approach.

Example concept:

```js
let needsRender = true;

function invalidate() {
  needsRender = true;
}

function animate() {
  requestAnimationFrame(animate);

  if (!needsRender) return;

  renderer.render(scene, camera);

  needsRender = false;
}
```

However, do **not** use this approach if continuous rendering is genuinely required.

---

# 5. Pause Rendering When Invisible

The Three.js animation must not consume significant resources when the user cannot see it.

Handle:

```js
document.visibilityState
```

Pause or reduce rendering when the browser tab is hidden.

Also consider `IntersectionObserver` when the Three.js canvas is outside the viewport.

Example behavior:

```text
canvas visible
→ normal animation

canvas outside viewport
→ pause or heavily throttle animation

browser tab hidden
→ stop animation
```

Resume correctly when visible again.

---

# 6. Optimize Device Pixel Ratio

Never blindly use:

```js
renderer.setPixelRatio(window.devicePixelRatio);
```

because modern phones may report DPR values of 3–4+, which can dramatically increase GPU load.

Use a sensible cap.

Example:

```js
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);
```

Consider adaptive limits for weaker/mobile devices if appropriate.

Preserve acceptable visual quality.

---

# 7. Optimize Resize Handling

Do not execute expensive renderer/camera operations for every raw resize event.

Avoid:

```js
window.addEventListener('resize', resize);
```

if `resize()` performs expensive work dozens of times per second.

Prefer:

- debouncing;
- throttling;
- `ResizeObserver`;
- requestAnimationFrame scheduling.

Only update:

```js
camera.aspect
camera.updateProjectionMatrix()
renderer.setSize()
composer.setSize()
```

when dimensions actually changed.

---

# 8. Optimize Scroll Handling

If the animation reacts to scrolling, inspect all scroll handlers.

Never repeatedly call expensive DOM APIs unnecessarily:

```js
element.getBoundingClientRect();
window.getComputedStyle();
offsetHeight;
offsetWidth;
```

inside an uncontrolled scroll/render loop.

Avoid layout thrashing such as:

```text
DOM read
DOM write
DOM read
DOM write
```

Batch DOM reads and writes.

Where possible, calculate scroll state once per animation frame.

Prefer:

```js
requestAnimationFrame
```

over performing rendering logic directly inside every `scroll` event.

---

# 9. GSAP / ScrollTrigger Optimization

If GSAP or ScrollTrigger is used together with Three.js:

Inspect whether both systems independently maintain animation loops.

Avoid unnecessary duplicated frame processing.

Where practical:

- synchronize Three.js changes with GSAP;
- avoid redundant `requestAnimationFrame` loops;
- avoid continuously updating properties that are not changing;
- use `quickSetter` / `quickTo` where beneficial;
- avoid excessive `ScrollTrigger.onUpdate` work;
- avoid recalculating DOM layout during every ScrollTrigger update.

Do **not** replace GSAP automatically if it already solves the animation efficiently.

---

# 10. Reduce Draw Calls

Inspect:

```js
renderer.info.render.calls
```

and identify unnecessary draw calls.

Where appropriate consider:

### InstancedMesh

For many identical objects:

```js
THREE.InstancedMesh
```

instead of creating hundreds of individual meshes.

### Merge geometry

For static objects with compatible materials, consider merging geometries.

### Material reuse

Do not create identical materials repeatedly.

Prefer:

```js
const material = new THREE.MeshStandardMaterial(...);

mesh1.material = material;
mesh2.material = material;
```

when appropriate.

### Geometry reuse

Reuse geometry for identical objects.

---

# 11. Optimize Geometry

Inspect polygon counts.

Avoid unnecessary high-resolution geometry.

Examples:

```js
new THREE.SphereGeometry(radius, 128, 128)
```

may be excessive when:

```js
new THREE.SphereGeometry(radius, 32, 32)
```

would look visually identical at the displayed size.

Reduce geometry complexity only if the visual difference is negligible.

Consider:

- lower segment counts;
- geometry reuse;
- instancing;
- LOD for complex scenes.

Do not modify geometry solely because it is theoretically expensive.

---

# 12. Optimize Textures

Inspect all textures.

Check:

- source dimensions;
- memory usage;
- GPU upload size;
- texture filtering;
- mipmaps;
- format;
- duplicate textures.

Avoid loading oversized textures such as:

```text
4096×4096
```

for an object displayed at only a few hundred pixels.

Where possible recommend:

- WebP;
- AVIF when appropriate;
- KTX2 / Basis;
- compressed GPU textures;
- appropriate texture resolution.

Reuse textures instead of loading duplicate copies.

---

# 13. Optimize Materials and Shaders

Inspect material complexity.

Pay special attention to:

- `MeshPhysicalMaterial`;
- transmission;
- clearcoat;
- environment maps;
- reflections;
- transparency;
- custom shaders;
- expensive fragment calculations.

Do not downgrade materials if that noticeably changes the design.

But identify cases where expensive material features are enabled but visually unnecessary.

For custom shaders:

- remove calculations that are constant;
- move suitable calculations from fragment to vertex shader;
- minimize expensive operations;
- avoid unnecessary branches;
- reduce repeated calculations;
- use uniforms correctly;
- avoid unnecessary per-frame uniform updates.

---

# 14. Optimize Transparency

Transparent objects can be particularly expensive.

Inspect:

```js
transparent: true
opacity
depthWrite
depthTest
blending
```

Avoid `transparent: true` where transparency is not actually required.

Do not alter blending if it changes the design.

---

# 15. Optimize Lighting

Inspect how many dynamic lights exist.

Especially check:

```js
PointLight
SpotLight
DirectionalLight
```

combined with shadows.

Reduce unnecessary lights or replace redundant dynamic lighting with cheaper alternatives only when visually equivalent.

Avoid many shadow-casting lights.

---

# 16. Optimize Shadows

Inspect:

```js
renderer.shadowMap.enabled
light.castShadow
mesh.castShadow
mesh.receiveShadow
```

Do not enable shadows globally if only a few objects require them.

Review shadow map resolution.

Avoid excessive values such as:

```js
4096 × 4096
```

unless genuinely required.

Possible optimization:

```js
light.shadow.mapSize.set(1024, 1024);
```

or another visually acceptable value.

Reduce shadow camera bounds when possible.

---

# 17. Disable Unnecessary Automatic Matrix Updates

For completely static objects, consider:

```js
object.matrixAutoUpdate = false;
object.updateMatrix();
```

Do this only for objects that never change position, rotation, or scale during animation.

Do not disable matrix updates on animated objects.

---

# 18. Frustum Culling

Ensure that unnecessary objects outside the camera view are not rendered.

Do not globally disable:

```js
frustumCulled
```

without a clear reason.

If custom geometry/shaders caused incorrect bounding information, fix bounding volumes rather than disabling culling globally.

---

# 19. Raycasting Optimization

If mouse interactions use `Raycaster`, do not test the entire scene unnecessarily.

Avoid:

```js
raycaster.intersectObjects(scene.children, true);
```

for large scenes if only several objects are interactive.

Maintain a dedicated collection:

```js
const interactiveObjects = [];
```

and raycast only against them.

Throttle pointer processing to once per animation frame where appropriate.

---

# 20. Mousemove / Pointer Events

Avoid expensive scene calculations directly inside:

```js
mousemove
pointermove
touchmove
```

Store normalized input state:

```js
pointer.x
pointer.y
```

and consume it during the animation frame.

Use passive listeners where appropriate:

```js
{ passive: true }
```

---

# 21. Memory Allocation and Garbage Collection

Search for allocations happening every frame:

```js
new THREE.Vector3()
new THREE.Color()
new THREE.Matrix4()
new THREE.Euler()
new THREE.Quaternion()
new Array()
array.map(...)
array.filter(...)
object spread
```

inside animation loops.

Where reasonable:

- reuse objects;
- mutate existing objects;
- cache calculations;
- preallocate arrays.

Avoid premature micro-optimization outside performance-critical paths.

---

# 22. Correct Resource Disposal

Ensure all Three.js resources are properly destroyed when the scene/component is removed.

Dispose:

```js
geometry.dispose();
material.dispose();
texture.dispose();
renderTarget.dispose();
composer?.dispose();
renderer.dispose();
```

Remove:

- window listeners;
- document listeners;
- ResizeObservers;
- IntersectionObservers;
- requestAnimationFrame callbacks;
- GSAP timelines;
- ScrollTriggers;
- controls;
- timers.

Example:

```js
cancelAnimationFrame(animationFrameId);
```

If GSAP is used:

```js
timeline.kill();
ScrollTrigger.kill();
```

where appropriate.

Ensure revisiting the page does not create duplicate scenes or animation loops.

---

# 23. Avoid Duplicate Animation Loops

Verify that initialization cannot accidentally create:

```text
requestAnimationFrame loop #1
requestAnimationFrame loop #2
requestAnimationFrame loop #3
```

after:

- resize;
- component remount;
- route change;
- reinitialization;
- page navigation.

There must normally be only one active rendering lifecycle per scene.

---

# 24. Mobile Optimization

Evaluate weaker devices separately.

Do not simply identify devices by screen width.

Consider:

```js
navigator.hardwareConcurrency
devicePixelRatio
WebGL capabilities
```

where useful.

Possible adaptive optimizations may be considered only when they do not alter the intended visual animation.

Do not introduce lower-quality mobile variants automatically if the current design does not already define them.

Examples of acceptable runtime-level tuning:

```text
high-end desktop
→ DPR 2
→ full effects

average laptop
→ DPR 1.5–2
→ full/near-full effects

mobile
→ sensible DPR cap
→ same animation behavior

low-power device
→ conservative renderer settings where visually imperceptible
→ same animation behavior
```

Do not reduce particles, geometry complexity, shadows, effects, or animation detail unless that variation already exists in the design or the user explicitly requests it.

---

# 25. Adaptive Quality

If the scene is particularly heavy, consider a small quality system instead of hardcoding one expensive configuration.

Example concept:

```js
const quality = {
  pixelRatio: 1.5,
  shadows: true,
  particles: 1000,
};
```

Potential presets:

```text
high
medium
low
```

Do not introduce this abstraction unless it provides measurable value.

---

# 26. Performance Monitoring

During analysis inspect, where available:

```js
renderer.info
```

including:

```js
renderer.info.render.calls
renderer.info.render.triangles
renderer.info.memory.geometries
renderer.info.memory.textures
```

Optionally use:

- Chrome Performance panel;
- Chrome GPU profiling;
- Three.js stats;
- Spector.js;
- `performance.now()`;
- FPS sampling.

Do not leave heavyweight debugging tools enabled in production.

---

# 27. Loading Performance

Optimize scene initialization.

Avoid blocking initial page rendering with unnecessary Three.js resources.

Consider:

- lazy initialization;
- lazy model loading;
- asynchronous texture loading;
- showing the Three.js scene only when needed;
- preloading only critical resources.

If the Three.js animation is below the fold, consider initializing it shortly before it enters the viewport.

---

# 28. Models / GLTF

If `.glb` or `.gltf` assets are used, inspect:

- polygon count;
- number of meshes;
- number of materials;
- texture sizes;
- unused nodes;
- duplicate materials.

Where appropriate recommend:

- Draco;
- Meshopt;
- KTX2;
- texture resizing;
- mesh merging;
- removing unused nodes.

Do not modify source models unnecessarily if runtime optimizations are sufficient.

---

# 29. Post-processing

If the project uses:

```js
EffectComposer
RenderPass
UnrealBloomPass
ShaderPass
SSAOPass
BokehPass
```

inspect their cost carefully.

Avoid running expensive passes that provide little visible benefit.

Ensure:

```js
composer.setPixelRatio(...)
composer.setSize(...)
```

uses sensible values.

Consider rendering expensive effects at reduced resolution if visually acceptable.

---

# 30. Code Architecture

After optimization, separate responsibilities when beneficial:

```text
ThreeScene
RendererManager
AnimationController
InteractionController
ResourceManager
PerformanceManager
```

But do not over-engineer a small implementation.

Performance-critical code should remain easy to understand.

---

# 31. Do Not Perform Blind Rewrites or Technology Changes

Do not rewrite the entire Three.js implementation simply because a different architecture exists.

Do not migrate the animation to another technology or library as part of optimization.

Do not replace Three.js, GSAP, ScrollTrigger, custom shaders, or the current animation mechanism simply because another option might benchmark better.

Prefer optimizing the existing implementation in place.

Prefer incremental optimization:

```text
measure
↓
identify bottleneck
↓
optimize
↓
verify
```

Preserve stable code when no measurable performance problem exists.

---

# 32. Required Output

After the analysis, provide:

## 1. Current Performance Problems

List the actual bottlenecks found in the implementation.

For each item specify:

```text
Problem:
Why it is expensive:
Expected impact:
Recommended fix:
```

Classify impact as:

```text
CRITICAL
HIGH
MEDIUM
LOW
```

---

## 2. Optimization Plan

Order improvements by expected impact.

Example:

```text
1. Cap DPR
2. Stop rendering while offscreen
3. Remove per-frame allocations
4. Reduce draw calls
5. Optimize shadow resolution
6. Optimize textures
```

Do not prioritize minor micro-optimizations over large rendering bottlenecks.

---

## 3. Implement the Optimizations

Modify the actual project code.

Do not only describe theoretical improvements.

Preserve existing public APIs and architecture unless changing them is necessary.

---

## 4. Before / After Summary

Provide a concise summary containing:

```text
Before:
- render strategy
- draw calls
- triangles
- DPR
- active animation loops
- expensive effects

After:
- render strategy
- draw calls
- triangles
- DPR
- active animation loops
- optimized effects
```

Use measured numbers when available.

Do not invent benchmark values.

---

# Final Rule

The priority order is:

```text
1. Preserve the original design animation exactly
2. Preserve the current technology and animation approach
3. Preserve the visual result and interaction behavior
4. Optimize the existing code in place
5. Fix major performance bottlenecks
6. Reduce GPU workload
7. Reduce CPU workload
8. Reduce memory allocation
9. Improve lifecycle and cleanup
10. Improve code maintainability
```

Never sacrifice or reinterpret animation quality, timing, behavior, effects, or design intent for a theoretical optimization.

If a performance improvement requires a visible change or a technology change, do **not** implement it. Mention it only as an optional recommendation and clearly state the tradeoff.

The default expectation is:

```text
same Three.js animation
+ same design behavior
+ same timing and effects
+ same technology
+ cleaner and more efficient code
+ lower runtime cost
```

Every optimization should answer:

> What measurable or technically justified performance problem does this solve?