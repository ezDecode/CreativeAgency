"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const { contextSafe } = useGSAP();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (
      sectionRef.current &&
      textContainerRef.current &&
      textRefs.current.length > 0
    ) {
      startAnimation();
    }
  }, []);

  const startAnimation = contextSafe(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Define breakpoints
        isDesktop: "(min-width: 1280px)",
        isLaptop: "(min-width: 990px) and (max-width: 1279px)",
        isTablet: "(min-width: 768px) and (max-width: 989px)",
        isMobile: "(min-width: 640px) and (max-width: 767px)",
        isSmallMobile: "(min-width: 440px) and (max-width: 639px)",
        isVerySmallMobile: "(max-width: 639px)",
      },
      (context) => {
        let startX = "100vw"; // Start from right edge of screen
        let endX = "-260rem"; // Increased for larger font

        if (context.conditions?.isDesktop) {
          startX = "100vw";
          endX = "-300rem"; // Increased for larger font
        } else if (context.conditions?.isLaptop) {
          startX = "100vw";
          endX = "-270rem"; // Increased for larger font
        } else if (context.conditions?.isTablet) {
          startX = "100vw";
          endX = "-280rem"; // Increased for larger font
        } else if (context.conditions?.isMobile) {
          startX = "100vw";
          endX = "-290rem"; // Increased for larger font
        } else if (context.conditions?.isSmallMobile) {
          startX = "100vw";
          endX = "-240rem"; // Increased for larger font
        } else if (context.conditions?.isVerySmallMobile) {
          startX = "100vw";
          endX = "-250rem"; // Increased for larger font
        }

        // Apply initial positioning - exactly like ImpactSection
        gsap.set(textContainerRef.current, {
          x: startX,
          willChange: "transform",
        });

        // Create movement timeline - exactly like ImpactSection
        const moveTl = gsap
          .timeline({ paused: true })
          .to(textContainerRef.current, {
            x: endX,
            ease: "none",
          });

        // Create character reveal timeline with bottom-right to top-left reveal
        const riseTl = gsap
          .timeline({ paused: true })
          .from(textRefs.current, {
            y: "80vh", // Start further down
            x: "30px", // More pronounced right offset
            filter: "blur(15px)",
            opacity: 0,
            scale: 0.7, // Smaller initial scale
            rotation: 8, // Slightly more rotation
            stagger: {
              amount: 1.2, // Longer stagger duration
              from: "end", // Start from the last character (bottom right)
              ease: "power2.out"
            },
            ease: "elastic.out(1, 0.5)", // Slightly more elastic
            duration: 1.5, // Longer duration
          });

        // Create ScrollTrigger with more reasonable scroll distance
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: context.conditions?.isVerySmallMobile ? "top 35%" : "top 25%",
          end: "+=2000vh", // Reduced from 3500vh for better user experience
          pin: true,
          scrub: 1.5, // Slightly more responsive
          onUpdate: (self) => {
            moveTl.progress(self.progress);
            riseTl.progress(self.progress);
          },
        });
      }
    );
  });

  function SplitText({ text }: { text: string }) {
    const chars = text.split("");
    
    return (
      <div className="whitespace-nowrap">
        {chars.map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            ref={(el) => {
              if (textRefs.current.length <= i) {
                textRefs.current.push(el);
              } else {
                textRefs.current[i] = el;
              }
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="flex w-screen h-[100dvh] pointer-events-none select-none overflow-hidden relative bg-black"
    >
      <h1
        ref={textContainerRef}
        className="will-change-transform h-fit absolute top-1/2 -translate-y-1/2 text-[11.2vw] md:text-[8.4vw] lg:text-[7vw] xl:text-[6.3vw] font-sans font-light text-white whitespace-nowrap"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <SplitText text="Digital Design • Branding • Motion • Strategy" />
      </h1>
    </div>
  );
}