import type { Variants, Transition } from "framer-motion";
import  { useState } from "react";
import GlowButton from "./GlowButton";
import { motion } from "framer-motion"; // Import the 'Transition' type

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  // --- Animation Variants ---

  const containerVariants: Variants = {
    initial: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    hover: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const kineticVariant: Variants = {
    initial: { y: "0%" },
    hover: { y: "-100%" },
  };

  const buildVariant: Variants = {
    initial: { y: "100%" },
    hover: { y: "0%" },
  };
  
  // THE FIX: The 'Transition' type is explicitly applied here, solving the error.
  const sharedTransition: Transition = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1], // TypeScript now correctly interprets this as a cubic-bezier tuple
  };

  // --- Component Data ---
  const text1 = "Kinetic—Studios".split("");
  const text2 = "Build—Now".split("");

  return (
    <header className="w-full">
      <div className="w-[90vw] mx-auto flex justify-between items-center py-4">
        <motion.div
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
          className="relative h-[1.2em] cursor-pointer overflow-hidden text-[1.875rem] font-light font-display tracking-wide text-white leading-tight"
        >
          {/* "Kinetic—Studios" animator */}
          <motion.div
            variants={containerVariants}
            className="flex"
          >
            {text1.map((char, index) => (
              <motion.span
                key={index}
                variants={kineticVariant}
                transition={sharedTransition} // This now uses the correctly typed object
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* "Build Now" animator */}
          <motion.div
            variants={containerVariants}
            className="absolute top-0 flex"
          >
            {text2.map((char, index) => (
              <motion.span
                key={index}
                variants={buildVariant}
                transition={sharedTransition} // This also uses the correctly typed object
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Navigation buttons */}
        <nav className="flex gap-3">
          <GlowButton className="px-[2.25rem] py-3 text-[1.3125rem] font-light">
            Components
          </GlowButton>
          <GlowButton className="px-[2.25rem] py-3 text-[1.3125rem] font-light">
            Request Project
          </GlowButton>
        </nav>
      </div>
    </header>
  );
}