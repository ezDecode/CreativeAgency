import { motion, animate } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface KineticTitleProps {
    title: string;
    isActive: boolean;
    onClick: () => void;
    layoutId: string;
}

const CHARACTERS = 'ABCDEFGHIJKL';

export default function KineticTitle({ title, isActive, onClick, layoutId }: KineticTitleProps) {
    const [scrambledTitle, setScrambledTitle] = useState(title);
    const animationControls = useRef<ReturnType<typeof animate> | null>(null);

    // REFACTOR: The core scramble logic is now a standalone function powered by framer-motion's animate.
    const scramble = () => {
        // Stop any existing animation
        animationControls.current?.stop();

        const controls = animate(0, title.length, {
            // POLISH: Duration adjusted, and an easeOut curve is applied for smoothness
            duration: 0.8, // Slower duration for a more graceful effect
            ease: 'easeOut',
            onUpdate: (progress) => {
                const newText = title
                    .split('')
                    .map((char, index) => {
                        if (index < progress) {
                            return title[index];
                        }
                        if (char === ' ') return ' ';
                        return CHARACTERS[Math.floor(Math.random() * 12)];
                    })
                    .join('');
                setScrambledTitle(newText);
            }
        });

        animationControls.current = controls;
    };
    
    // When the component is unmounted or the hover ends, ensure we stop the animation.
    useEffect(() => {
        return () => animationControls.current?.stop();
    }, []);

    const reset = () => {
        animationControls.current?.stop();
        setScrambledTitle(title);
    };

    return (
        <div
            className="relative group" 
            onMouseEnter={scramble}
            onMouseLeave={reset}
            onClick={onClick}
        >
            <motion.h3
                layoutId={layoutId}
                className={`font-sans text-2xl font-light cursor-pointer transition-opacity duration-300 
                    ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`
                }
            >
                {scrambledTitle}
            </motion.h3>
            {isActive && (
                <motion.div 
                    className="absolute left-[-2rem] top-0 h-full w-1 bg-white" 
                    layoutId="active-line" 
                />
            )}
        </div>
    );
}