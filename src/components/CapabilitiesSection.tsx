"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HEADING_TEXT = "Digital Design • Branding • Motion • Strategy";

// Helper component for splitting text into animatable characters
function SplitChars({ text, charRefs }: { text: string; charRefs: React.MutableRefObject<(HTMLSpanElement | null)[]> }) {
  return (
    <>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block origin-bottom will-change-transform"
          ref={(el) => { charRefs.current[index] = el; }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const initAnimation = () => {
        if (!sectionRef.current || !headingRef.current) return;
        const validChars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
        if (validChars.length === 0) return;

        const heading = headingRef.current;

        // 1. Master Horizontal Scroll (UNTOUCHED - Logic is correct)
        const horizontalScroll = gsap.fromTo(
          heading,
          { x: () => window.innerWidth },
          {
            x: () => -heading.offsetWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${heading.offsetWidth + window.innerWidth}`,
              scrub: 1.5,
              pin: true,
              invalidateOnRefresh: true,
            },
          }
        );

        // 2. REFINED "WAVE REVEAL" ANIMATION (UNTOUCHED - Logic is correct)
        gsap.set(validChars, {
          yPercent: 100,
          opacity: 0,
          transformOrigin: "bottom center",
        });

        gsap.to(validChars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.02,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            containerAnimation: horizontalScroll,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      };

      gsap.delayedCall(0.1, initAnimation);

    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <div ref={sectionRef} className="relative z-20 w-full overflow-hidden">
      <div className="flex h-screen items-center">
        <h1
          ref={headingRef}
          className="shrink-0 -translate-y-16 whitespace-nowrap font-sans text-[clamp(6.72rem,25.2vw,16.8rem)] font-semibold leading-none tracking-tight text-gray-200"
          aria-label={HEADING_TEXT}
        >
          <SplitChars text={HEADING_TEXT} charRefs={charRefs} />
        </h1>
      </div>
    </div>
  );
}