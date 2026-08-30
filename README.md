# Paulig City Series

A vertical, interactive-style coffee advert built with Remotion. A fictional K-Ruoka browsing flow lets viewers select Paulig City coffees, then expands each package into an AI-generated destination scene.

Portfolio concept only. This is not an official Paulig or K-Ruoka campaign.

Product/UI assets are composed deterministically in Remotion. Destination keyframes were generated with OpenAI image generation with real images of the locations as reference, then animated with Google Flow / Veo 3.1 image-to-video. This keeps packaging, logos, typography, and UI consistent while AI video supplies environmental motion.

The destinations are Paris, Reykjavik, and New York. Preserve vertical framing and use restrained video motion so coffee remains the visual focus.

## Run and Render

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run dev` opens Remotion Studio. Use composition `MyComp` for preview and render. `npm run build` creates a Remotion bundle; render the bundle with the Remotion CLI or Studio.

## Reason for Determenistic + Generative Workflow

Product packaging, typography, UI, cursor interactions, and transitions are built programmatically in Remotion because these elements require precise positioning and frame-to-frame consistency—areas where generative video can introduce text distortion, object changes, or visual drift.

Destination scenes use image-to-video rather than text-to-video. Establishing and refining a still keyframe first gives direct control over composition, coffee placement, lighting, and city identity before motion is introduced. Veo is then used primarily for what generative video handles well: natural environmental and cinematic motion. This reduces unpredictable generation and makes the final result easier to art-direct, reproduce, and integrate with exact brand assets.

## Technical Stack

| Stage | Tool / Technology | Purpose |
|---|---|---|
| Image generation & editing | ChatGPT / OpenAI image generation | Creation and modification of photorealistic destination keyframes |
| Image-to-video | Google Flow / Veo 3.1 | Animation of generated keyframes into realistic destination footage |
| Motion graphics | Remotion | Programmatic animation, carousel movement, transitions, cursor interactions |
| UI composition | React + TypeScript | Construction of reusable UI and visual components |
| Video compositing | Remotion | Combining AI video, product assets, browser UI and animation |
| Final visual treatment | CSS / Remotion | Cropping, zooms, brightness adjustments, grain and other finishing effects |


---

## Project Layout

```text
src/
  Composition.tsx       Scene timeline
  Root.tsx              Remotion composition settings
  components/           UI, carousel, intro/outro, and city transitions
  data/cities.ts        City coffee card data
  data/motion.ts        Shared motion helpers
public/
  packages/             Product package PNGs
  videos/               Destination MP4s
  icons/                Cursor, search bar, logo, and intro imagery
```

Use `staticFile()` for anything in `public/`. City cards are data-driven through `src/data/cities.ts`; add or change products there before changing carousel presentation code.

## Animation Notes

- Remotion animations are frame-based, using `useCurrentFrame()` and `interpolate()`.
- Cursor positions use screen-center-relative offsets. Transition exit positions should align with the next carousel entry position to avoid visible jumps.
- Product packages remain independent PNG overlays during transitions so brand text and packaging stay stable while cards expand into video.
- The shared `SearchBar` is rendered persistently in `Composition.tsx`; scene-level instances support the intro and transitions where needed.

