import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowButton from "./GlowButton";

gsap.registerPlugin(ScrollTrigger);

// --- 1. CONFIGURATION OBJECT ---
// All "magic numbers" are moved here for easy tweaking and better readability.
const ANIMATION_CONFIG = {
  chars: {
    // Replaced expensive `filter: blur` with `scale` and `opacity` for performance.
    initial: {
      y: -56,
      opacity: 0,
      rotate: -4,
      scale: 1.2,
      transformOrigin: "50% 0%",
    },
    enter: {
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      duration: 1.1,
      stagger: { each: 0.02, from: "start" as const },
    },
  },
  scrollTrigger: {
    entrance: {
      start: "top 85%",
    },
    pin: {
      start: "top top",
    },
  },
};

export default function ReadyToBuildSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<HTMLSpanElement[]>([]);
  
  // --- 2. IMPROVED REF COLLECTION ---
  // This function adds elements to our ref array. It's a more stable pattern than clearing the array in useMemo.
  const addCharRef = (el: HTMLSpanElement | null) => {
    if (el && !charRefs.current.includes(el)) {
      charRefs.current.push(el);
    }
  };

  const phrase = "Ready to Rise at Seven?";

  const renderedChars = useMemo(() => {
    // Reset refs here before rendering, ensuring it's clean for the new elements.
    charRefs.current = [];
    
    return phrase.split("").map((ch, i) => (
      <span
        key={`char-${i}`}
        ref={addCharRef}
        className="rtb-char will-change-transform"
        style={{ display: "inline-block", backfaceVisibility: "hidden" }}
      >
        {ch === " " ? "\u00A0" : ch}
      </span>
    ));
  }, [phrase]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const chars = charRefs.current;
    if (!section || !track || chars.length === 0) return;
    
    // Using GSAP context for safe cleanup.
    const ctx = gsap.context(() => {
      // --- 3. SIMPLIFIED & MORE READABLE ANIMATION LOGIC ---
      
      const setupInitialState = () => {
        gsap.set(chars, ANIMATION_CONFIG.chars.initial);
      };

      const createEntranceAnimation = () => {
        const tl = gsap.timeline({ paused: true });
        tl.to(chars, {
          ...ANIMATION_CONFIG.chars.enter,
          force3D: true, // Good for performance
        });
        
        ScrollTrigger.create({
          trigger: section,
          start: ANIMATION_CONFIG.scrollTrigger.entrance.start,
          once: true,
          onEnter: () => tl.play(),
        });

        return tl;
      };

      const createHorizontalScrollAnimation = () => {
        // Calculate the scroll distance once for efficiency.
        const scrollDistance = track.scrollWidth + window.innerWidth;
        
        return gsap.fromTo(
          track,
          { x: () => window.innerWidth },
          {
            x: () => -scrollDistance,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: ANIMATION_CONFIG.scrollTrigger.pin.start,
              end: () => `+=${scrollDistance}`,
              scrub: true,
              pin: true,
              invalidateOnRefresh: true,
              anticipatePin: 1, // Good for preventing jumps
            },
          }
        );
      };
      
      // Handle reduced motion for accessibility.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          start: "top top",
          end: "+=60vh",
        });
        return; // Exit early
      }

      // Main animation setup sequence
      setupInitialState();
      const entranceTimeline = createEntranceAnimation();
      let horizontalTween: gsap.core.Tween;
      
      // Only create the horizontal scroll animation after the entrance is complete.
      entranceTimeline.eventCallback("onComplete", () => {
        horizontalTween = createHorizontalScrollAnimation();
      });

      // Handle viewport resizing gracefully.
      ScrollTrigger.addEventListener("refreshInit", setupInitialState);

      // Cleanup function
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", setupInitialState);
      };

    }, section); // Scope context to the section

    return () => ctx.revert(); // Cleanup GSAP animations and ScrollTriggers on unmount
  }, [renderedChars]); // Rerun effect if the rendered characters change.

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      aria-label="Ready to Rise at Seven horizontal scroll"
    >
      {/* Decorative beams (unchanged) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[50vh] w-[40vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.14),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-16 left-[-20%] h-[40vh] w-[35vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.14),transparent_70%)] blur-3xl" />
      </div>

      {/* UI elements (unchanged) */}
      <div className="pointer-events-none absolute left-6 top-6 md:left-10 md:top-10 z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-sky-400" />
          Motion-first studio
        </span>
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10">
        <GlowButton className="px-5 py-3 text-sm md:text-base border border-white/10">
          Start a project →
        </GlowButton>
      </div>

      <div className="flex h-full items-center">
        <div ref={trackRef} className="whitespace-nowrap">
          <h2
            className="font-sans font-light tracking-tight select-none text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/30 drop-shadow-[0_10px_30px_rgba(255,255,255,0.06)]"
            style={{
              fontSize: "clamp(5.5rem, 16vw, 18rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              margin: 0,
              padding: 0,
              whiteSpace: "nowrap",
            }}
            aria-label={phrase}
          >
            {/* The subtle glow behind text is kept, as its performance impact is static */}
            <span
              aria-hidden
              className="absolute -z-10 translate-y-[2px] blur-2xl opacity-40 text-white/60"
              style={{
                pointerEvents: "none",
                WebkitTextStroke: "transparent",
                filter: "blur(10px)",
              }}
            >
              {renderedChars}
            </span>
            {renderedChars}
          </h2>
        </div>
      </div>
    </section>
  );
}