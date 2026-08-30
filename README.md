# Paulig City Series

A vertical, interactive-style coffee advert built with Remotion. A fictional K-Ruoka browsing flow lets viewers select Paulig City coffees, then expands each package into an AI-generated destination scene.

Portfolio concept only. This is not an official Paulig or K-Ruoka campaign.

## Run and Render

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run dev` opens Remotion Studio. Use composition `MyComp` for preview and render. `npm run build` creates a Remotion bundle; render the bundle with the Remotion CLI or Studio.

## Composition

| Property | Value |
| --- | --- |
| Format | 1080 x 1920 (9:16) |
| Frame rate | 30 fps |
| Duration | 525 frames (17.5 seconds) |
| Composition ID | `MyComp` |

The scene order and timings are defined in `src/Composition.tsx`:

| Frames | Scene |
| --- | --- |
| 0-55 | Intro and headline |
| 45-105 | Initial coffee carousel |
| 105-180 | Paris transition |
| 180-220 | Carousel |
| 225-315 | Reykjavik transition |
| 315-340 | Carousel |
| 340-480 | New York transition |
| 480-525 | Outro |

Some scenes intentionally overlap to make the handoffs feel continuous. If a scene duration changes, update both its `Sequence` and `durationInFrames` in `src/Root.tsx`.

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

## Asset and AI Workflow

Product/UI assets are composed deterministically in Remotion. Destination keyframes were generated with OpenAI image generation, then animated with Google Flow / Veo 3.1 image-to-video. This keeps packaging, logos, typography, and UI consistent while AI video supplies environmental motion.

The destinations are Paris, Reykjavik, and New York. Preserve vertical framing and use restrained video motion so coffee remains the visual focus.
