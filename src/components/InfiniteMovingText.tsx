import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface InfiniteMovingTextProps {
  children: string;
  baseVelocity: number;
}

export default function InfiniteMovingText({ children, baseVelocity = 100 }: InfiniteMovingTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  // This transforms the scroll velocity into a multiplier for the base velocity
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // This creates the seamless looping effect by wrapping the x position
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => {
    // Calculate the base movement per frame
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Adjust direction based on scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    // Add the scroll-based velocity to the base movement
    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    // Update the base x position
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div 
        className="inline-block font-display text-[18.5vw] sm:text-[17.1vw] font-normal leading-[0.75] tracking-tighter md:text-[15.2vw] lg:text-[13.3vw]" 
        style={{ x }}
      >
        {/* The text is repeated 4 times to create the illusion of infinity */}
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
      </motion.div>
    </div>
  );
}