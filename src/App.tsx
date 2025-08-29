import { useEffect } from "react";
import Lenis from "lenis";
import Background from "./components/Background";
import HeroSection from "./components/HeroSection";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
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
      <Background />
      <div className="relative z-10">
        <HeroSection />

        <div className="flex h-[60vh] items-center justify-center">
          <h2 className="text-2xl md:text-4xl text-white/50">The Next Section</h2>
        </div>
      </div>
    </main>
  );
}

export default App;