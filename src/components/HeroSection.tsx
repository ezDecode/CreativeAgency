import Navbar from "./Navbar";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import InfiniteMovingText from "./InfiniteMovingText";

// ARCHITECTURAL FIX:
// This component is now simple and presentational. It no longer needs
// `forwardRef` as it is completely decoupled from other sections.
export default function HeroSection() {
    const sharedContainerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

    return (
        // ARCHITECTURAL FIX:
        // No bottom margin. This section is exactly 100vh tall and will
        // touch the next section perfectly, ensuring a seamless transition.
        <section className="relative z-10 flex h-screen flex-col overflow-hidden p-4 sm:p-6 text-white md:p-8 lg:p-12">
            <div className="relative z-10 flex h-full flex-grow flex-col">
                <Navbar />
                <div className="flex-grow flex flex-col justify-end">
                    <div className="relative mx-auto w-full space-y-0">
                        <div className="w-[90vw] mx-auto">
                            <motion.h3
                                className="mb-1 text-right font-serif text-[2.4rem] sm:text-[3.2rem] md:text-[4.84rem] lg:text-[6.45rem] font-light leading-[0.9] text-white/80"
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
                        </div>
                        <div className="overflow-hidden">
                            <InfiniteMovingText baseVelocity={-1}>
                                Kinetic—Studios • Ideas in Motion •
                            </InfiniteMovingText>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}