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
];

export default function CreationsSection() {
  return (
    <section className="relative w-full bg-[#111111] py-20 md:py-28">
        <div className="w-[90vw] mx-auto">
            <div className="text-center mb-12 md:mb-16">
                <h2 className="font-serif text-5xl sm:text-7xl font-light text-white/90">
                    Our Creations
                </h2>
                <p className="font-sans text-lg text-white/60 mt-4 max-w-2xl mx-auto">
                    A curated selection of projects that showcase our passion for design and technology.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        title={project.title} 
                        category={project.category} 
                        imageUrl={project.imageUrl}
                    />
                ))}
            </div>
            
            <div className="text-center mt-20 md:mt-28">
                 <h2 className="font-serif font-light text-5xl sm:text-7xl md:text-8xl text-white/80">
                    Let's talk.
                 </h2>
            </div>
        </div>
    </section>
  );
}