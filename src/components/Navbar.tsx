import type { Variants, Transition } from "framer-motion";
import  { useState } from "react";
import GlowButton from "./GlowButton";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);

  const containerVariants: Variants = {
    initial: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    hover: { transition: { staggerChildren: 0.03 } },
  };
  const kineticVariant: Variants = { initial: { y: "0%" }, hover: { y: "-100%" } };
  const buildVariant: Variants = { initial: { y: "100%" }, hover: { y: "0%" } };
  const sharedTransition: Transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };
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
          className="relative h-[1.2em] cursor-pointer overflow-hidden text-[1.375rem] md:text-[1.875rem] font-light font-display tracking-wide text-white leading-tight"
        >
          <motion.div variants={containerVariants} className="flex">
            {text1.map((char, index) => (
              <motion.span key={index} variants={kineticVariant} transition={sharedTransition}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div variants={containerVariants} className="absolute top-0 flex">
            {text2.map((char, index) => (
              <motion.span key={index} variants={buildVariant} transition={sharedTransition}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <nav className="flex gap-2 sm:gap-3">
          <GlowButton className="px-[1.25rem] py-2.5 text-[1.05rem] md:px-[2.25rem] md:py-3 md:text-[1.3125rem] font-light">
            Components
          </GlowButton>
          <GlowButton className="px-[1.25rem] py-2.5 text-[1.05rem] md:px-[2.25rem] md:py-3 md:text-[1.3125rem] font-light">
            Request Project
          </GlowButton>
        </nav>
      </div>
    </header>
  );
}