import { useEffect } from "react";
import Lenis from "lenis";
import HeroSection from "./components/HeroSection";

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
    <main>
      <div>
        <HeroSection />

        <div className="bg-white flex h-[60vh] items-center justify-center">
          <h2 className="text-2xl md:text-4xl text-gray-800">The Next Section</h2>
        </div>
      </div>
    </main>
  );
}

export default App;