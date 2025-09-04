import React, { useEffect } from "react";
import { motion } from "framer-motion"; 
import type { Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Service {
  title: string;
  description: string;
  imageUrl: string;
}

interface ContentSectionProps {
  service: Service;
  index: number;
  setActiveIndex: (index: number) => void;
}

// FIX: Explicitly typed with Variants to resolve the 'ease' property type error
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } 
  },
};

const ContentSection = React.forwardRef<HTMLDivElement, ContentSectionProps>(
  ({ service, index, setActiveIndex }, ref) => {
    const { ref: inViewRef, inView } = useInView({
      threshold: 0.5,
    });

    useEffect(() => {
      if (inView) {
        setActiveIndex(index);
      }
    }, [inView, index, setActiveIndex]);

    return (
      <section 
        ref={ref} 
        className="relative w-full min-h-screen flex items-center justify-center"
      >
        <div ref={inViewRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full h-full p-8">
            <div className="w-full h-[60vh] rounded-lg overflow-hidden">
                 <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${service.imageUrl})` }}
                />
            </div>
            <motion.div 
              className="max-w-md"
              variants={textVariants} 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
                <h2 className="font-serif font-light text-5xl mb-4">{service.title}</h2>
                <p className="font-sans tracking-tighter text-lg text-white/70">{service.description}</p>
            </motion.div>
        </div>
      </section>
    );
  }
);

export default ContentSection;