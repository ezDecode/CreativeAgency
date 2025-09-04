import { motion, useMotionValue } from "framer-motion";
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
  },
  {
    title: "Project Zeta",
    category: "Web Design",
    imageUrl: "/images/project-zeta.jpg", // Assuming you have or will add this image
  }
];

export default function CreationsSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative bg-[#111111] py-24 sm:py-32"
        >
            {/* The cursor light element, repurposed for the grid */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-full z-0"
                style={{
                    background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.1), transparent 80%)`
                }}
            />

            <div className="relative z-10 mx-auto w-[90vw]">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="font-serif font-light text-5xl sm:text-7xl md:text-8xl text-white/80">
                        Our Creations
                    </h2>
                    <p className="font-sans text-lg text-white/60 mt-4">
                        A selection of our favorite projects.
                    </p>
                </div>

                {/* The Kinetic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            title={project.title}
                            category={project.category}
                            imageUrl={project.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}