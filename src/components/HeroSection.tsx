import { useRef } from "react";
import Navbar from "./Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

export default function HeroSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"]);

    const sharedContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const sharedWordVariant: Variants = {
        hidden: { opacity: 0, filter: "blur(5px)", x: "20px" },
        visible: {
            opacity: 1,
            filter: "blur(0px)",
            x: "0px",
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const subtitleContent = [
        { type: "word", text: "A" },
        { type: "jsx", content: <>Creati<span className="italic">v</span>e</> },
        { type: "jsx", content: <>St<span className="italic">u</span>dio.</> },
    ];
    
    // --- CHANGE: Updated the marquee text to be more descriptive ---
    const marqueeText = "Kinetic—Studios • Ideas in Motion • ".repeat(8);

    return (
        <section ref={targetRef} className="relative flex h-screen flex-col overflow-hidden p-4 sm:p-6 text-white md:p-8 lg:p-12">
            <div className="relative z-10 flex h-full flex-grow flex-col">
                <Navbar />

                <div className="flex-grow flex flex-col justify-end">
                    <div className="relative mx-auto w-full">
                        <div className="space-y-0">
                            <motion.h3
                                className="mb-1 text-right font-serif text-[2.4rem] sm:text-[3.2rem] md:text-[4.84rem] lg:text-[6.45rem] font-light leading-[0.9] text-white/80 pr-[5vw]"
                                variants={sharedContainerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {subtitleContent.map((item, index) => (
                                    <motion.span key={index} variants={sharedWordVariant} className="ml-4 inline-block">
                                        {item.type === "jsx" ? item.content : item.text}
                                    </motion.span>
                                ))}
                            </motion.h3>

                            <motion.div style={{ x }} className="overflow-hidden py-1 whitespace-nowrap">
                                <h1 className="font-display text-[18.5vw] sm:text-[17.1vw] font-normal leading-[0.75] tracking-tighter md:text-[15.2vw] lg:text-[13.3vw]">
                                    {marqueeText}
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}