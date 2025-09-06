import { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "./components/HeroSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
// Other imports remain the same

function App() {
  useEffect(() => {
    // REFINEMENT 2: Lerp value tuned for a slightly more responsive feel
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-[#111111]">
      <div>
        <HeroSection />
        
        <CapabilitiesSection />

        {/* This final section can be your footer or contact section later */}
        <div className="bg-white flex h-[60vh] items-center justify-center">
          <h2 className="text-2xl md:text-4xl text-gray-800">The Final Section</h2>
        </div>
      </div>
    </main>
  );
}

export default App;