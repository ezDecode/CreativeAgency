import React, { useState } from "react";
import { motion } from "framer-motion";
import KineticTitle from "./KineticTitle";
import LiquidImage from "./LiquidImage";

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

  // NOTE: This logic could be replaced with a scrolling library for more robust snapping.
  // For this example, we simplify by showing one service at a time.
  const activeService = services[activeIndex];

  return (
    <div className="relative bg-black text-white grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      {/* --- LEFT COLUMN: KINETIC NAVIGATION --- */}
      <aside 
        className="lg:col-span-1 flex flex-col justify-center sticky top-0 h-screen p-16"
      >
        <div className="flex flex-col gap-y-8 relative">
          {services.map((service, index) => (
            <KineticTitle
              key={index}
              title={service.title}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              layoutId={`title-${service.title}`} // Unique layoutId for the animation
            />
          ))}
        </div>
      </aside>

      {/* --- RIGHT COLUMN: CONTENT CANVAS --- */}
      <main className="lg:col-span-2 flex items-center p-8 md:p-16">
        <div className="w-full">
            <motion.div
              key={activeIndex} // Re-triggers animation on change
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                <LiquidImage imageUrl={activeService.imageUrl} />
                <div className="mt-6 flex justify-between items-start">
                    <motion.h2 
                        layoutId={`title-${activeService.title}`} // Matching layoutId
                        className="font-sans text-2xl font-light lowercase tracking-tight text-white/90"
                    >
                      {activeService.title}
                    </motion.h2>
                    <p className="font-sans tracking-tight font-light text-lg text-white/60 max-w-sm text-right">
                      {activeService.description}
                    </p>
                </div>
            </motion.div>
        </div>
      </main>
    </div>
  );
}