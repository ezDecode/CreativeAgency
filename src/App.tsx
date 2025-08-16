import { useEffect } from "react";
import Lenis from "lenis";
import Background from "./components/Background";
import HeroSection from "./components/HeroSection";
import ReadyToBuildSection from "./components/ReadyToBuildSection";

function App() {
  // Initializes Lenis for a smooth scrolling experience
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

    // Cleanup function to destroy Lenis instance on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Background />
      {/* This container holds all scrollable content and sits on a higher z-index than the background */}
      <div className="relative z-10">
        <HeroSection />
        <ReadyToBuildSection />
      </div>
    </main>
  );
}

export default App;
