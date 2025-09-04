import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Project Alpha",
    category: "Web Experience",
    imageUrl: "/images/project-alpha.jpg",
  },
  {
    title: "Project Beta",
    category: "Branding",
    imageUrl: "/images/project-beta.jpg",
  },
  {
    title: "Project Gamma",
    category: "Motion Graphics",
    imageUrl: "/images/project-gamma.jpg",
  },
  {
    title: "Project Delta",
    category: "Digital Product",
    imageUrl: "/images/project-delta.jpg",
  },
  {
    title: "Project Epsilon",
    category: "Brand Identity",
    imageUrl: "/images/project-epsilon.jpg",
  }
];

export default function CreationsSection() {
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start end", "end start"],
  });

  // Maps scroll progress to horizontal movement. Adjust the second value to control scroll speed/distance.
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-85%"]); 

  return (
    <section ref={horizontalScrollRef} className="relative h-[400vh] bg-[#111111]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-12 items-center">
          
          {/* Intro Text */}
          <div className="flex-shrink-0 w-screen flex flex-col items-center justify-center">
             <h2 className="font-serif font-light text-5xl sm:text-7xl md:text-9xl text-white/80">
                Our Creations
             </h2>
             <p className="font-sans text-lg text-white/60 mt-4">Scroll to explore</p>
          </div>
          
          {/* Project Cards */}
          {projects.map((project, index) => (
            <ProjectCard 
              key={index} 
              title={project.title} 
              category={project.category} 
              imageUrl={project.imageUrl}
            />
          ))}

          {/* Outro Text */}
           <div className="flex-shrink-0 w-screen flex flex-col items-center justify-center pr-[5vw]">
             <h2 className="font-serif font-light text-5xl sm:text-7xl md:text-9xl text-white/80">
                Let's talk.
             </h2>
          </div>

        </motion.div>
      </div>
    </section>
  );
}