import { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "./components/HeroSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Connect Lenis to ScrollTrigger's update cycle
    lenis.on('scroll', ScrollTrigger.update);

    // Integrate Lenis into GSAP's ticker for synchronization
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#111111]">
      <HeroSection />
      <CapabilitiesSection />
      {/* 
        FIX APPLIED: Added spacer divs to create enough vertical scroll distance 
        for the horizontal scroll animation in CapabilitiesSection to complete.
      */}
      <div className="relative z-20 h-screen" />
      <div className="relative z-20 flex h-screen items-center justify-center">
        <h2 className="text-2xl text-gray-200 md:text-4xl">The Final Section</h2>
      </div>
      <div className="relative z-20 h-screen" />
    </main>
  );
}

export default App;