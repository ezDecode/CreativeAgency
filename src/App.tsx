import { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "./components/HeroSection";
import CapabilitiesSection from "./components/CapabilitiesSection";
import CreationsSection from "./components/CreationsSection"; // Import the new section

function App() {
  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
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
        <CreationsSection /> {/* Add the new section here */}

        {/* This final section can be your footer or contact section later */}
        <div className="bg-white flex h-[60vh] items-center justify-center">
          <h2 className="text-2xl md:text-4xl text-gray-800">The Final Section</h2>
        </div>
      </div>
    </main>
  );
}

export default App;