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
    return (
        <section className="bg-black w-full py-20 md:py-28">
            <div className="w-[90vw] mx-auto">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-serif text-5xl sm:text-7xl font-light text-white/90">
                        Our Capabilities
                    </h2>
                    <p className="font-sans text-lg text-white/60 mt-4 max-w-2xl mx-auto">
                        We are a full-service creative studio, guiding projects from initial strategy to final execution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {services.map((service, index) => (
                        <CapabilityCard
                            key={index}
                            title={service.title}
                            description={service.description}
                            imageUrl={service.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}