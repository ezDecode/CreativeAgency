import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

interface ServiceItemProps {
  title: string;
  description: string;
}

const serviceItemVariant: Variants = {
    hidden: { 
        opacity: 0, 
        y: 40,
        filter: "blur(5px)",
    },
    visible: { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        transition: { 
            duration: 0.8, 
            ease: [0.22, 1, 0.36, 1] 
        } 
    },
  };

export default function ServiceItem({ title, description }: ServiceItemProps) {
  return (
    <motion.div 
        className="border-t border-white/20 pt-6 group"
        variants={serviceItemVariant}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl max-w-2xl">{title}</h3>
        <p className="font-sans text-base md:text-lg text-white/70 max-w-xs pt-2 hidden sm:block">
          {description}
        </p>
      </div>
      {/* Description for mobile view */}
      <p className="font-sans text-base text-white/70 mt-4 sm:hidden">
        {description}
      </p>
    </motion.div>
  );
}