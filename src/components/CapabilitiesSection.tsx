import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';

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
    imageUrl: "/images/service-content.jpg",
  },
];

interface FloatingCardProps {
  service: typeof services[0];
  index: number;
}

function FloatingCard({ service, index }: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  
  // Scroll-based animations for individual cards
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, index % 2 === 0 ? -2 : 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.21, 1.11, 0.81, 0.99]
        }
      });
    }
  }, [isInView, controls, index]);

  return (
    <motion.div 
      className="group"
      style={{ y, opacity, scale, rotate }}
    >
      {/* Newspaper-style dividing lines */}
      <motion.div 
        className="flex items-center mb-6 lg:mb-8"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: index * 0.1 }}
      >
        <motion.div 
          className="flex-1 h-px bg-white/20 origin-left"
          style={{ scaleX: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
        ></motion.div>
        <motion.div 
          className="mx-3 lg:mx-4 text-white/40 text-xs lg:text-sm font-sans tracking-wider"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        <motion.div 
          className="flex-1 h-px bg-white/20 origin-right"
          style={{ scaleX: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
        ></motion.div>
      </motion.div>

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={controls}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className="relative cursor-pointer mb-8 lg:mb-12"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Simple card with image */}
        <div className="relative h-64 md:h-72 lg:h-80 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${service.imageUrl})` }}
          />
          
          {/* Simple overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Hover indicator */}
          <motion.div
            className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full"
            animate={{
              scale: isHovered ? [1, 1.2, 1] : 1,
              opacity: isHovered ? [0.3, 0.8, 0.3] : 0.3,
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
            }}
          />
        </div>
        
        {/* Content below the card */}
        <motion.div
          className="mt-4 lg:mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
        >
          <h3 className="font-serif text-xl md:text-2xl lg:text-3xl font-light text-white mb-3 lg:mb-4 group-hover:text-white/90 transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-white/70 font-sans text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
            {service.description}
          </p>
          
          {/* Simple underline that appears on hover */}
          <motion.div
            className="mt-4 h-px bg-white/30"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? '60px' : '0px' }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-200px" });
  
  // Main section scroll progress
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Background parallax effect
  const backgroundY = useTransform(sectionProgress, [0, 1], [0, -100]);
  const backgroundOpacity = useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden">
      
      {/* Animated background with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY, opacity: backgroundOpacity }}
      >
        {/* Floating particles that move with scroll */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Subtle grid lines that appear on scroll */}
        <motion.div 
          className="absolute inset-0"
          style={{ opacity: useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.1, 0]) }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute w-full h-px bg-white/5"
              style={{ top: `${(i + 1) * 5}%` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute h-full w-px bg-white/5"
              style={{ left: `${(i + 1) * 10}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header with newspaper-style lines */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.21, 1.11, 0.81, 0.99] }}
          style={{ y: useTransform(sectionProgress, [0, 0.3], [0, -30]) }}
        >
          {/* Top decorative line with scroll animation */}
          <motion.div 
            className="flex items-center justify-center mb-8"
            style={{ 
              scale: useTransform(sectionProgress, [0, 0.2, 0.8, 1], [1, 1.1, 1.1, 1]),
              opacity: useTransform(sectionProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0.5])
            }}
          >
            <motion.div 
              className="w-20 h-px bg-white/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            ></motion.div>
            <motion.div 
              className="mx-4 w-2 h-2 bg-white/30 rounded-full"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              style={{ rotate: useTransform(sectionProgress, [0, 1], [0, 360]) }}
            ></motion.div>
            <motion.div 
              className="w-20 h-px bg-white/30"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.7 }}
            ></motion.div>
          </motion.div>
          
          <motion.h2 
            className="font-serif text-5xl md:text-7xl font-light text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ 
              y: useTransform(sectionProgress, [0, 0.3], [0, -50]),
              scale: useTransform(sectionProgress, [0, 0.3], [1, 1.05])
            }}
          >
            Our Capabilities
          </motion.h2>
          <motion.p 
            className="font-sans text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ 
              y: useTransform(sectionProgress, [0, 0.3], [0, -20]),
              opacity: useTransform(sectionProgress, [0, 0.2, 0.8, 1], [0.7, 1, 1, 0.4])
            }}
          >
            We are a full-service creative studio, guiding projects from initial strategy to final execution with innovative approaches that set new standards.
          </motion.p>
          
          {/* Bottom decorative line with scroll animation */}
          <motion.div 
            className="flex items-center justify-center mt-8"
            style={{ scale: useTransform(sectionProgress, [0, 0.5, 1], [1, 1.2, 0.8]) }}
          >
            <motion.div 
              className="w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 2, delay: 1 }}
              style={{ opacity: useTransform(sectionProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.2]) }}
            ></motion.div>
          </motion.div>
        </motion.div>

        {/* Cards in 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <FloatingCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Final decorative element with scroll animation */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          style={{ 
            y: useTransform(sectionProgress, [0.7, 1], [0, 50]),
            opacity: useTransform(sectionProgress, [0.7, 0.9, 1], [1, 0.8, 0.3])
          }}
        >
          <motion.div 
            className="flex items-center justify-center"
            style={{ scale: useTransform(sectionProgress, [0.8, 1], [1, 1.5]) }}
          >
            <motion.div 
              className="w-12 h-px bg-white/20"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 3 }}
            ></motion.div>
            <motion.div 
              className="mx-3 text-white/40 text-xs tracking-widest"
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={isInView ? { opacity: 1, letterSpacing: "0.3em" } : {}}
              transition={{ duration: 1.5, delay: 3.5 }}
            >
              END
            </motion.div>
            <motion.div 
              className="w-12 h-px bg-white/20"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 3.2 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}