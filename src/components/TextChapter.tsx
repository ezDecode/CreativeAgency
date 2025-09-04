import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface TextChapterProps {
    title: string;
    description: string;
    index: number;
    activeIndex: number; // The globally active index
    setActiveIndex: (index: number) => void;
}

export default function TextChapter({ title, description, index, activeIndex, setActiveIndex }: TextChapterProps) {
    const { ref, inView } = useInView({ threshold: 0.6 });
    const isActive = index === activeIndex;

    useEffect(() => {
        if (inView) {
            setActiveIndex(index);
        }
    }, [inView, index, setActiveIndex]);

    return (
        <div ref={ref} className="h-screen flex flex-col justify-center">
            <motion.div
                // REFINEMENT 3: Added filter for the "Focus Pull" effect
                animate={{ 
                    opacity: isActive ? 1 : 0.3,
                    filter: isActive ? 'blur(0px)' : 'blur(2px)',
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <h3 className="font-serif text-5xl font-light mb-4 text-white">{title}</h3>
                <p className="max-w-md font-sans text-lg text-white/70">{description}</p>
            </motion.div>
        </div>
    );
}