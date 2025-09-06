"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    // Wait for refs to be populated
    if (!textContainerRef.current || charRefs.current.length === 0) return;

    // Create horizontal movement timeline with smoother start position
    const moveTimeline = gsap.timeline({ paused: true })
      .fromTo(
        textContainerRef.current,
        { x: "110vw" }, // Start further right for smoother entrance
        { x: "-110%", ease: "none" } // End further left for complete exit
      );

    // Create enhanced character animation timeline - TOP RIGHT TO CENTER with FLUID MOTION
    const charTimeline = gsap.timeline({ paused: true })
      .fromTo(charRefs.current.filter(Boolean), 
        { 
          x: "8vw", // Start from RIGHT (horizontal offset)
          y: "-20vh", // Start from TOP (vertical offset) - increased for more dramatic effect
          scaleY: 0.8, // More dramatic vertical compression
          scaleX: 1.2, // More dramatic horizontal stretch
          rotation: 15, // Add slight rotation for more dynamic feel
          filter: "blur(8px)", // Increased blur for smoother transition
          opacity: 0.5, // Lower opacity for smoother fade-in
        },
        {
          x: "0vw", // Move to center horizontally
          y: "0vh", // Move to center vertically
          scaleY: 1,
          scaleX: 1,
          rotation: 0, // Rotate back to normal
          filter: "blur(0px)",
          opacity: 1,
          ease: "elastic.out(1.5, 0.4)", // INCREASED ELASTIC: more amplitude and period
          stagger: {
            amount: 0.3, // Increased total stagger time for more fluid wave
            from: "start",
            ease: "power2.out" // Smooth stagger distribution
          },
          duration: 2.2 // Longer duration for more fluid motion
        }
      );

    // Enhanced ScrollTrigger with smoother scrub
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=400%", // Increased scroll distance for more fluid control
      scrub: 2, // Increased scrub for smoother, more fluid movement
      pin: true,
      anticipatePin: 1, // Better performance
      onUpdate: (self) => {
        // Smooth progress updates
        const progress = self.progress;
        moveTimeline.progress(progress);
        charTimeline.progress(progress);
      }
    });

    // Cleanup
    return () => {
      st.kill();
    };

  }, { scope: sectionRef });

  // Enhanced character splitting function
  function SplitChars({ text }: { text: string }) {
    const chars = text.split("");
    
    return (
      <>
        {chars.map((char, index) => (
          <span
            key={index}
            className="char inline-block relative"
            style={{ 
              transformOrigin: 'center center', // Center origin for balanced rotation
              willChange: 'transform, opacity, filter' // GPU optimization
            }}
            ref={(el) => {
              charRefs.current[index] = el;
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </>
    );
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-screen overflow-hidden bg-black"
    >
      {/* Fixed side masks - removed conflicting via classes */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black via-black/70 to-transparent z-10 pointer-events-none" />
      
      <div
        ref={textContainerRef}
        className="absolute top-1/2 -translate-y-1/2 h-fit"
        style={{
          willChange: 'transform', // GPU optimization
          backfaceVisibility: 'hidden' // Prevent flickering
        }}
      >
        <h1 className="px-[5vw] font-sans text-white whitespace-nowrap font-light text-[clamp(4.8rem,16vw,12.8rem)]">
          <SplitChars text="Digital Design • Branding • Motion • Strategy" />
        </h1>
      </div>
    </div>
  );
}