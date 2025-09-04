import { motion, useSpring, motionValue, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

interface LiquidImageProps {
    imageUrl: string;
}

export default function LiquidImage({ imageUrl }: LiquidImageProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

    const frequency = motionValue(0);
    const smoothFrequency = useSpring(frequency, {
        damping: 40,
        stiffness: 120,
        mass: 0.8,
    });

    const handleHoverStart = () => {
        frequency.set(0.02);
    };

    const handleHoverEnd = () => {
        frequency.set(0);
    };
    
    return (
        <>
            {/* The small, clickable image card in the grid */}
            <motion.div
                layoutId={`liquid-image-container-${imageUrl}`} // Unique layoutId for the animation
                className="relative w-full h-[70vh] rounded-3xl overflow-hidden group cursor-pointer"
                onClick={() => setIsExpanded(true)}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
            >
                <svg className="absolute w-0 h-0">
                    <filter id={`liquid-filter-${imageUrl}`}>
                        <motion.feTurbulence 
                            ref={turbulenceRef} 
                            baseFrequency={smoothFrequency} 
                            numOctaves="1" 
                            seed="2" 
                        />
                        <feDisplacementMap in="SourceGraphic" scale="20" />
                    </filter>
                </svg>
                
                <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                        backgroundImage: `url(${imageUrl})`, 
                        filter: `url(#liquid-filter-${imageUrl})` 
                    }}
                    initial={{ borderRadius: "1.5rem" }} // Tailwind's rounded-3xl is 1.5rem
                    whileHover={{ scale: 1.05, borderRadius: "2.5rem" }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />
            </motion.div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setIsExpanded(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <motion.div
                            layoutId={`liquid-image-container-${imageUrl}`} // Matching layoutId
                            className="relative w-[90vw] h-[90vh] max-w-[1200px] bg-black rounded-3xl overflow-hidden"
                        >
                             <motion.div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${imageUrl})` }}
                                initial={{ borderRadius: "1.5rem" }}
                             />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}