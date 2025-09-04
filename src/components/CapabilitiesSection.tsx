import React, { useState, useRef, createRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import ContentSection from "./ContentSection";

const services = [
  {
    title: "Digital Design",
    description: "Our obsessively user-centric design process ensures every interaction is not just functional, but delightful.",
    imageUrl: "/images/service-design.jpg",
  },
  {
    title: "Branding",
    description: "We forge a consistent and bold visual language that resonates deeply in a crowded, competitive marketplace.",
    imageUrl: "/images/service-branding.jpg",
  },
  {
    title: "Motion",
    description: "Through compelling animation and dynamic effects, we capture attention and tell stories that refuse to let go.",
    imageUrl: "/images/service-motion.jpg",
  },
  {
    title: "Strategy",
    description: "Our approach to content and SEO ensures your message is not just heard, but discovered, felt, and acted upon.",
    imageUrl: "/images/service-content.jpg",
  },
];

export default function CapabilitiesSection(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- REFS FOR CLICK-TO-SNAP SCROLL ---
  const contentRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);
  contentRefs.current = services.map((_, i) => contentRefs.current[i] ?? createRef());

  // --- MOUSE POSITION FOR HOVER THUMBNAIL ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
  };
  
  const handleNavClick = (index: number) => {
    contentRefs.current[index].current?.scrollIntoView({
      behavior: "smooth", // Changed to smooth for a more graceful snap
      block: "center",
    });
  };

  return (
    <div className="relative bg-black text-white grid grid-cols-1 lg:grid-cols-3">
      {/* --- LEFT COLUMN: STICKY NAVIGATION --- */}
      <aside 
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIndex(null)}
        className="hidden lg:block lg:col-span-1 sticky top-0 h-screen p-16"
      >
        <div className="flex flex-col gap-y-4 relative">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleNavClick(index)}
            >
              <h3 
                className={`font-sans text-2xl font-light tracking-tighter cursor-pointer transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
              >
                {service.title}
              </h3>
              {activeIndex === index && (
                 <motion.div className="absolute left-[-2rem] top-0 h-full w-1 bg-white" layoutId="active-line" />
              )}
            </div>
          ))}
        </div>
        
        {/* --- HOVER THUMBNAIL --- */}
        <AnimatePresence>
            {hoveredIndex !== null && (
                 <motion.div
                    className="absolute w-48 h-32 rounded-lg bg-cover bg-center pointer-events-none"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        backgroundImage: `url(${services[hoveredIndex].imageUrl})`
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                 />
            )}
        </AnimatePresence>
      </aside>

      {/* --- RIGHT COLUMN: SCROLLING CONTENT --- */}
      <main className="lg:col-span-2">
        {services.map((service, index) => (
          <ContentSection
            key={index}
            ref={contentRefs.current[index]}
            service={service}
            index={index}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </main>
    </div>
  );
}