import { motion } from "framer-motion";
import GlowButton from "./GlowButton";

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
}

export default function ProjectCard({ title, category, imageUrl }: ProjectCardProps) {
  const cardVariants = {
    initial: { filter: "saturate(0.8) brightness(0.9)" },
    hover: { filter: "saturate(1) brightness(1)" },
  };

  const imageVariants = {
    initial: { scale: 1.05 },
    hover: { scale: 1 },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  return (
    <motion.div 
      className="relative w-[80vw] h-[70vh] md:w-[45vw] md:h-[75vh] overflow-hidden rounded-2xl flex-shrink-0"
      whileHover="hover"
      initial="initial"
      variants={cardVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
        variants={imageVariants}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      
      {/* Interaction Overlay */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
        variants={overlayVariants}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
            <p className="font-sans text-lg md:text-xl text-white/80 mb-2">{category}</p>
            <h4 className="font-serif font-light text-4xl md:text-6xl mb-6">{title}</h4>
            <GlowButton className="px-8 py-3 text-lg md:text-xl font-light">
                View Case Study
            </GlowButton>
        </div>
      </motion.div>
    </motion.div>
  );
}