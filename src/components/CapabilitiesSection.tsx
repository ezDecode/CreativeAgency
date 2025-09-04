import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import CapabilityCard from './CapabilityCard';

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
    imageUrl: "/images/service-strategy.jpg",
  },
];

export default function CapabilitiesSection() {
    // --- CHANGE 2: The ref is now on the card container itself ---
    const cardContainerRef = useRef<HTMLDivElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: cardContainerRef,
        offset: ['start start', 'end end']
    });

    return (
        <section className="relative w-full bg-black pt-20 md:pt-28">
            
            {/* --- CHANGE 1: Header is now a standard, non-sticky element --- */}
            <div 
              className="w-[90vw] max-w-4xl mx-auto text-center mb-24"
            >
                <h2 className="font-serif text-5xl sm:text-7xl font-light text-white/90">
                    Our Capabilities
                </h2>
                <p className="font-sans text-lg text-white/70 mt-4 max-w-2xl mx-auto">
                    We are a full-service creative studio, guiding projects from initial strategy to final execution.
                </p>
            </div>

            {/* This is now the dedicated animation area. The animation will only
                start when the top of this container hits the top of the screen. */}
            <div ref={cardContainerRef} className="relative h-[300vh]">
                {services.map((service, i) => {
                    const range: [number, number] = [i * 0.25, 1];
                    
                    return (
                        <CapabilityCard
                            key={service.title}
                            i={i}
                            {...service}
                            progress={scrollYProgress}
                            range={range}
                            totalCards={services.length}
                        />
                    );
                })}
            </div>
        </section>
    );
}