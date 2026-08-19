"use client";

import { BlockReveal } from "./BlockReveal";

/**
 * BlockRevealDemo
 * ---------------
 * A minimal, self-contained page showing the scroll-triggered block reveal.
 *
 *   1. A tall Hero fills the first viewport.
 *   2. As you scroll into Section 2, an overlay of white column blocks wipes
 *      away left-to-right (scaleY 1 → 0), uncovering the pinned media + intro
 *      content underneath.
 *
 * Drop this into any React + Tailwind + Framer Motion app (e.g. a Next.js
 * `app/page.tsx`). Swap the image and copy for your own.
 */
export default function BlockRevealDemo() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      {/* ---------- HERO (scroll past this to trigger the reveal) ---------- */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#1c1f24_0%,#0a0a0a_60%)]" />
        <div className="relative z-10 px-6 text-center">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            Scroll down
          </p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
            The Hero Section
          </h1>
          <p className="mx-auto mt-6 max-w-md text-neutral-400">
            Keep scrolling — the block reveal fires the moment the next section
            enters the viewport.
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl text-neutral-500">
          ↓
        </div>
      </section>

      {/* ---------- SECTION 2 (revealed by the wiping blocks) ---------- */}
      <BlockReveal
        blockCount={6}
        stagger={0.09}
        duration={0.7}
        order="ltr"
        origin="top"
        color="#ffffff"
        amount={0.4}
        once
        className="min-h-screen bg-neutral-900"
      >
        {/* Pinned media + content sitting underneath the blocks. */}
        <div className="relative min-h-screen">
          <img
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/40 to-neutral-950" />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col justify-end px-6 pb-24">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block h-4 w-4 rounded-sm bg-orange-500" />
              <span className="text-lg font-medium">Hey, Just An Intro</span>
            </div>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
              The columns lift to reveal what was underneath all along.
            </h2>
          </div>
        </div>
      </BlockReveal>

      {/* A little scroll room after the reveal. */}
      <section className="flex h-[60vh] items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-500">
          End of demo
        </p>
      </section>
    </main>
  );
}
