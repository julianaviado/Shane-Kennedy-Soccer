"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Cubic-bezier tuple or a named framer-motion easing keyword. */
export type RevealEase =
  | [number, number, number, number]
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut";

export type RevealOrder = "ltr" | "rtl" | "center-out" | "edges-in";
export type RevealOrigin = "top" | "bottom";

export interface BlockRevealProps {
  /** Section 2 content that sits underneath the blocks and is revealed. */
  children: ReactNode;
  /** Number of vertical column blocks in the overlay. Default 5. */
  blockCount?: number;
  /** Delay between each column, in seconds. Default 0.08. */
  stagger?: number;
  /** Duration of each block's wipe, in seconds. Default 0.6. */
  duration?: number;
  /** Easing curve for the wipe. Default a smooth ease-out cubic-bezier. */
  ease?: RevealEase;
  /** Edge the blocks collapse toward as they scale away. Default "top". */
  origin?: RevealOrigin;
  /** Order the columns wipe in. Default "ltr". */
  order?: RevealOrder;
  /** Block fill (any CSS color). Default near-black "#0a0a0a". */
  color?: string;
  /**
   * Fraction of the section that must be visible before the wipe fires (0–1).
   * This is what makes it trigger only once you scroll past the hero into Section 2.
   * Default 0.35.
   */
  amount?: number;
  /** Play the reveal only once. Default true. */
  once?: boolean;
  /** Extra classes for the <section> wrapper. */
  className?: string;
  /** Extra classes for the overlay layer (e.g. mix-blend, ring). */
  overlayClassName?: string;
}

/**
 * BlockReveal
 * -----------
 * Wrap the incoming "Section 2" content. An overlay of equal-width column
 * blocks covers it completely, then wipes away (scaleY 1 → 0) with a
 * left-to-right / center-out / edges-in stagger the moment the section
 * scrolls into view. The content underneath stays pinned in place while the
 * blocks animate out.
 *
 * Requires: react, framer-motion, tailwindcss.
 */
export function BlockReveal({
  children,
  blockCount = 5,
  stagger = 0.08,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1],
  origin = "top",
  order = "ltr",
  color = "#0a0a0a",
  amount = 0.35,
  once = true,
  className = "",
  overlayClassName = "",
}: BlockRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // `useInView` with an `amount` threshold + `once` is the trigger: the wipe
  // only initiates when enough of Section 2 is on screen — i.e. after the hero.
  const inView = useInView(ref, { amount, once });
  // Accessibility: users who prefer reduced motion get the content revealed
  // immediately, with the blocks already collapsed and no wipe animation.
  const reduce = useReducedMotion();

  const last = Math.max(blockCount - 1, 0);
  const mid = last / 2;

  const delayFor = (i: number) => {
    switch (order) {
      case "rtl":
        return (last - i) * stagger;
      case "center-out": // middle columns clear first, edges last
        return Math.abs(i - mid) * stagger;
      case "edges-in": // outer columns clear first, middle last
        return (mid - Math.abs(i - mid)) * stagger;
      case "ltr":
      default:
        return i * stagger;
    }
  };

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Incoming content — pinned underneath while the blocks wipe away. */}
      <div className="relative z-0">{children}</div>

      {/* Overlay grid of solid column blocks. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 z-10 flex ${overlayClassName}`}
      >
        {Array.from({ length: blockCount }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 will-change-transform"
            style={{ backgroundColor: color, transformOrigin: origin }}
            initial={{ scaleY: reduce ? 0 : 1 }}
            animate={reduce || inView ? { scaleY: 0 } : { scaleY: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration, ease, delay: delayFor(i) }
            }
          />
        ))}
      </div>
    </section>
  );
}

export default BlockReveal;
