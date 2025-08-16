// import React from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function HeroSection() {

  const h1ContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.5 },
    },
  };

  const h1CharacterVariant: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
      opacity: 1,
      y: "0%",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

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
    hidden: {
      opacity: 0,
      filter: "blur(5px)",
      x: "20px",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: "0px",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };


  const h1Characters = "Kinetic—Studios".split("");
  const paragraphWords = "From a single spark of an idea, we build kinetic digital worlds that truly move audiences.".split(" ");
  const subtitleContent = [
    { type: "word", text: "A" },
    { type: "jsx", content: <>Creati<span className="italic">v</span>e</> },
    { type: "jsx", content: <>St<span className="italic">u</span>dio.</> },
  ];

  return (
    // The section is now transparent to allow the shared background to be visible.
    <section className="relative flex min-h-screen max-h-screen flex-col overflow-hidden p-6 text-white md:p-8 lg:p-12">
      {/* NOTE: This component's self-contained background has been REMOVED. */}

      <div className="relative z-10 flex h-full flex-grow flex-col">
        <Navbar />

        <div className="flex-grow flex flex-col">
          <div className="flex-grow flex flex-col justify-center">
            <div className="relative mx-auto flex w-[90vw] justify-end">
              <motion.p
                className="mt-8 max-w-[35.2rem] text-right font-sans text-[2.17rem] leading-snug text-white/80"
                variants={sharedContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {paragraphWords.map((word, wordIndex) => (
                  <motion.span
                    key={wordIndex}
                    variants={sharedWordVariant}
                    className="mr-2 inline-block whitespace-nowrap"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>

          <div className="relative mx-auto w-[90vw]">
            <div className="space-y-0">
              <motion.h3
                className="mb-1 text-right font-serif text-[4.03rem] font-light leading-[0.9] text-white/80 md:text-[4.84rem] lg:text-[6.45rem]"
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

              <motion.div
                className="overflow-hidden py-1 text-center"
                variants={h1ContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <h1 className="mb-8 font-display text-[17.1vw] font-normal leading-[0.75] tracking-tighter md:text-[15.2vw] lg:text-[13.3vw]">
                  {h1Characters.map((char, index) => (
                    <motion.span key={index} variants={h1CharacterVariant} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
