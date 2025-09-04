import { motion, type Variants } from 'framer-motion'; // Import Variants type

interface CapabilityCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function CapabilityCard({ title, description, imageUrl }: CapabilityCardProps) {
  // Explicitly type the constant with Variants
  const cardVariants: Variants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      variants={cardVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-6 md:p-8 text-white">
        <h3 className="font-serif text-3xl md:text-4xl font-light mb-2">{title}</h3>
        <p className="max-w-md font-sans text-base text-white/80">{description}</p>
      </div>
    </motion.div>
  );
}