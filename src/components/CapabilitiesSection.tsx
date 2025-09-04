import { useState } from 'react';
import { motion, useMotionValue } from "framer-motion"; // Added useMotionValue
import TextChapter from './TextChapter';
import VisualCanvas from './VisualCanvas';

const services = [
  // ... services data remains unchanged
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
    imageUrl: "/images/service-strategy.jpg",
  },
];

export default function CapabilitiesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    
    // REFINEMENT 3: Hooks for the cursor light
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    return (
        <section 
            onMouseMove={handleMouseMove} // Mouse listener for the light effect
            className="relative bg-black w-full"
        >
            {/* REFINEMENT 3: The cursor light element */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-full z-10"
                style={{
                    background: `radial-gradient(500px at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.1), transparent 80%)`
                }}
            />

            <div className="w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-2">
                
                <div className="lg:col-span-1 py-12 relative z-20">
                    <h2 
                        className="font-sans text-base uppercase tracking-widest text-white/50 mb-32"
                    >
                        Our Process
                    </h2>
                    {services.map((service, index) => (
                        <TextChapter
                            key={index}
                            title={service.title}
                            description={service.description}
                            index={index}
                            activeIndex={activeIndex} // Pass down the activeIndex
                            setActiveIndex={setActiveIndex}
                        />
                    ))}
                </div>

                {/* REFINEMENT 1: Padding added for image resizing and balance */}
                <div className="lg:col-span-1 hidden lg:block sticky top-0 h-screen p-24">
                   <VisualCanvas activeIndex={activeIndex} services={services} />
                </div>
            </div>
        </section>
    );
}