# BlockReveal

A responsive, scroll-triggered **staggered block reveal** transition built with
React, Tailwind CSS, and Framer Motion.

An overlay of equal-width column blocks completely covers a section, then wipes
away (`scaleY: 1 → 0`) with a left-to-right / center-out / edges-in stagger the
moment the section scrolls into view. The content underneath stays pinned in
place while the blocks animate out.

![reference](./reference.png)

## Files

| File | Purpose |
| --- | --- |
| `BlockReveal.tsx` | The reusable component. |
| `BlockRevealDemo.tsx` | A self-contained Hero → Section 2 demo page. |

## Install

```bash
npm install framer-motion
# Tailwind CSS must already be configured in your app.
```

## Usage

Wrap the "Section 2" content you want revealed. The reveal only fires once
enough of the section is on screen — i.e. after the user scrolls past the hero.

```tsx
import { BlockReveal } from "./BlockReveal";

export default function Page() {
  return (
    <>
      <section className="h-screen">…your hero…</section>

      <BlockReveal
        blockCount={6}
        stagger={0.09}
        duration={0.7}
        order="ltr"       // "ltr" | "rtl" | "center-out" | "edges-in"
        origin="top"      // blocks collapse toward the top
        color="#ffffff"
        amount={0.4}      // trigger threshold: 40% of the section visible
        once
        className="min-h-screen"
      >
        <YourSectionTwo />
      </BlockReveal>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Section 2 content revealed underneath the blocks. |
| `blockCount` | `number` | `5` | Number of vertical column blocks. |
| `stagger` | `number` | `0.08` | Delay between columns, in seconds. |
| `duration` | `number` | `0.6` | Duration of each block's wipe, in seconds. |
| `ease` | `RevealEase` | `[0.22, 1, 0.36, 1]` | Cubic-bezier tuple or a Framer easing keyword. |
| `origin` | `"top" \| "bottom"` | `"top"` | Edge the blocks collapse toward. |
| `order` | `"ltr" \| "rtl" \| "center-out" \| "edges-in"` | `"ltr"` | Column wipe order. |
| `color` | `string` | `"#0a0a0a"` | Block fill (any CSS color). |
| `amount` | `number` | `0.35` | Fraction of the section visible before the wipe fires (0–1). |
| `once` | `boolean` | `true` | Play the reveal only once. |
| `className` | `string` | `""` | Extra classes for the `<section>` wrapper. |
| `overlayClassName` | `string` | `""` | Extra classes for the overlay layer. |

## How it triggers "after the hero"

The component uses Framer Motion's `useInView(ref, { amount, once })`. Because
the observed element is Section 2 itself, the animation cannot start until that
section scrolls into the viewport past the hero. Raise `amount` (e.g. `0.5`) to
require more of the section on screen before the blocks lift.

## Accessibility

Respects `prefers-reduced-motion`: users with that setting see the content
revealed immediately, with the blocks already collapsed and no wipe.

## Responsiveness

Blocks are laid out with `flex` and `flex-1`, so the columns are always equal
width and fill the section at any viewport size. Font sizes in the demo scale
with Tailwind's responsive utilities.
