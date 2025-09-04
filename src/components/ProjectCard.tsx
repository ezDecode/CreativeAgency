import { motion, type Variants } from "framer-motion";
import GlowButton from "./GlowButton";

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

// These variants are for the overlay and its children
const overlayVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  initial: { y: 20, opacity: 0 },
  hover: { y: 0, opacity: 1 }
};

export default function ProjectCard({ title, category, imageUrl }: ProjectCardProps) {
  return (
    // --- FIX: REMOVED the faulty variants, initial, and whileInView props from this container ---
    // The card is now visible by default.
    <motion.div 
      className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl flex-shrink-0"
      whileHover="hover" // The hover animation trigger remains
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* The overlay animation is self-contained and works correctly */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
        variants={overlayVariants}
        initial="initial" // The overlay starts invisible
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
            <motion.p variants={itemVariants} className="font-sans text-lg md:text-xl text-white/80 mb-2">{category}</motion.p>
            <motion.h4 variants={itemVariants} className="font-serif font-light text-4xl md:text-6xl mb-6">{title}</motion.h4>
            <motion.div variants={itemVariants}>
              <GlowButton className="px-8 py-3 text-lg md:text-xl font-light">
                  View Project
              </GlowButton>
            </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}