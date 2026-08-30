# Paulig City Series — AI-Assisted Advertising Concept

A short-form advertising concept exploring Paulig's City Coffee Series through an interactive travel-inspired visual experience.

The reel presents the coffee collection as a fictional online shopping interface. The viewer browses through different Paulig City coffees, selects a destination, and the product card transitions into an AI-generated cinematic scene inspired by that city.

The project was created as an interview portfolio piece to demonstrate an AI-assisted content production workflow combining generative image creation, image-to-video generation, motion graphics, compositing, and programmatic video editing.

> Spec / portfolio concept. Not an official campaign commissioned by Paulig or K-Ruoka.

---

## 1. Technical Stack

| Stage | Tool / Technology | Purpose |
|---|---|---|
| Image generation & editing | ChatGPT / OpenAI image generation | Creation and modification of photorealistic destination keyframes based on real images |
| Image-to-video | Google Flow / Veo 3.1 | Animation of generated keyframes into realistic destination footage |
| Motion graphics | Remotion | Programmatic animation, carousel movement, transitions, cursor interactions |
| UI composition | React + TypeScript | Construction of reusable UI and visual components |
| Video compositing | Remotion | Combining AI video, product assets, browser UI and animation |
| Final visual treatment | CSS / Remotion | Cropping, zooms, brightness adjustments, grain and other finishing effects |

---

# 2. Production Pipeline

The project uses a hybrid production workflow rather than generating the entire advertisement with a single generative model.

The pipeline is:

Concept / storyboard
        ↓
Product & UI asset preparation
        ↓
AI destination keyframe generation
        ↓
Image-to-video generation
        ↓
Remotion animation
        ↓
Video compositing
        ↓
Programmatic camera adjustments
        ↓
Visual finishing
        ↓
Final render

This approach keeps important brand and UI elements deterministic while using generative AI primarily for environmental imagery and cinematic motion.

---

# 3. Concept and Storyboard

The central concept was built around the Finnish line:

**"Kahvi kutsuu, mutta minne?"**

("Coffee calls, but where?")

The coffee collection is presented as a series of destinations.

Instead of creating a conventional product montage, the advertisement uses a fictional shopping interface where the viewer appears to browse different Paulig City coffees.

The basic interaction is:

1. Opening coffee scene
2. "Kahvi kutsuu, mutta minne?"
3. City coffee carousel appears
4. Cursor browses the products
5. A city is selected
6. Product card expands
7. Card transforms into a cinematic destination
8. Return to the product interface
9. Continue browsing to another destination

The destination sequences created for the prototype include Reykjavík, New York and Paris.

---

# 4. Asset Preparation

The project separates assets according to their role.

Example structure:

public/
├── packages/
│   ├── reykjavik.png
│   ├── new-york.png
│   ├── parisien.png
│   └── ...
│
├── videos/
│   ├── reykjavik.mp4
│   ├── new-york.mp4
│   └── paris.mp4
│
├── ui/
│   ├── searchbar.png
│   └── k-ruoka-logo.png
│
├── icons/
│   └── cursor.png
│
└── intro/
    └── coffee.png

The actual coffee packages remain separate image assets rather than being generated into the AI video.

This is important because generative video models can distort packaging, typography and logos between frames.

Brand-sensitive assets are therefore composited in Remotion instead.

---

# 5. AI Image Creation

## Tool

**ChatGPT / OpenAI image generation**

AI image generation was used to create the starting visual for each destination.

Rather than asking the video model to invent an entire scene, a carefully composed still image was first created.

This provides greater control over:

- composition
- product placement
- lighting
- camera angle
- visual hierarchy
- city identity
- position of important objects

The generated image then becomes the first frame for the video generation stage.

---

## Reykjavík

The Reykjavík scene was designed around:

- Icelandic geothermal lagoon
- pale blue geothermal water
- dark volcanic rock
- cool overcast atmosphere
- minimal distant bathers
- coffee prominently positioned in the foreground

The coffee acts as the foreground anchor while the lagoon establishes the destination.

The generated still was intentionally composed vertically for the final 9:16 format.

---

## New York

The New York image was designed around:

- yellow NYC taxi
- Manhattan street environment
- coffee held outside the taxi window
- dense urban depth
- background traffic
- recognizable New York visual language

The composition places the coffee close to the camera while the taxi and street establish the city.

This allows the coffee to remain the visual anchor even when the environment becomes animated.

---

## Paris

The Paris keyframe was developed iteratively.

The final composition included:

- foreground café table
- black coffee
- croissant
- café tableware
- second coffee
- sweater draped over a chair
- Parisian street visible behind the table
- Haussmann-style architecture
- shallow depth of field

The sweater and second coffee were added as small environmental storytelling details suggesting that the table is occupied without requiring visible people or faces.

---

# 6. Image-to-Video Generation

## Tool

**Google Flow — Veo 3.1**

The generated still images were imported into Google Flow and animated using Veo's image-to-video workflow.

The still image defines the visual composition while the prompt primarily defines **motion**.

This separation is important.

Instead of repeatedly describing the entire scene, motion prompts focus on:

- camera movement
- environmental movement
- object movement
- motion intensity
- elements that must remain stable

---

# 7. Reykjavík Video Generation

The Reykjavík animation was intentionally restrained.

Requested motion included:

- extremely slow camera push
- very small natural water ripples
- sparse geothermal mist
- subtle coffee steam
- minimal movement from distant bathers

The prompt explicitly avoided:

- large waves
- aggressive steam
- fast camera movement
- dramatic environmental changes
- new objects

This was necessary because early generations produced excessive lagoon and steam movement.

The final approach used AI video for subtle environmental motion while additional pacing and framing adjustments were performed later in Remotion.

---

# 8. New York Video Generation

The New York animation uses more environmental movement than Reykjavík.

Requested motion included:

- taxi moving slowly through traffic
- background vehicles moving naturally
- subtle movement from flags and trees
- stable passenger hand
- stable coffee cup
- slow cinematic push toward the coffee

The coffee and hand were intentionally instructed to remain relatively stable because generative video models can introduce visible artifacts when hands or small objects move excessively.

This produces a different motion language for each destination:

Reykjavík → calm / atmospheric

New York → active / urban

while keeping coffee as the visual anchor.

---

# 9. Paris Video Generation

The Paris sequence uses foreground action rather than primarily environmental movement.

Veo was instructed to animate:

- coffee being poured into the second cup
- subtle café activity
- a cyclist travelling away into the street
- limited distant pedestrian movement
- gentle environmental movement

Faces were intentionally avoided.

The cyclist moves deeper into the street rather than across the foreground so that background movement adds depth without competing with the coffee-pouring action.

The main visual hierarchy remains:

coffee → table → Paris environment.

---

# 10. Remotion Video Architecture

## Tool

**Remotion + React + TypeScript**

Remotion is used as the main animation and compositing environment.

Instead of editing the advertisement manually on a traditional video timeline, scenes are implemented as React components and controlled frame-by-frame.

Example structure:

src/
├── components/
│   ├── Intro.tsx
│   ├── CoffeeCup.tsx
│   ├── SearchBar.tsx
│   ├── CityCard.tsx
│   ├── CityCarousel.tsx
│   ├── ReykjavikTransition.tsx
│   ├── NewYorkTransition.tsx
│   └── ParisTransition.tsx
│
├── data/
│   └── cities.ts
│
├── Composition.tsx
├── Root.tsx
└── index.ts

---

# 11. Data-Driven City Cards

Coffee information is stored separately from the visual components.

Example:

```ts
export type City = {
  id: string;
  city: string;
  roast: string;
  tastingNote: string;
  color: string;
  textColor: string;
  packageSrc: string;
};