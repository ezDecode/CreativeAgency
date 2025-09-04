import { type MotionValue, motion, useTransform } from 'framer-motion';

interface CapabilityCardProps {
  i: number;
  title: string;
  description: string;
  imageUrl: string;
  progress: MotionValue<number>;
  range: [number, number];
  totalCards: number;
}

export default function CapabilityCard({ i, title, description, imageUrl, progress, range, totalCards }: CapabilityCardProps) {
  
  const targetScale = 1 - ((totalCards - i) * 0.05);
  const scale = useTransform(progress, range, [1, targetScale]);
  
  const textOpacity = useTransform(progress, [range[0], range[0] + 0.1], [0, 1]);

  return (
    // This is the full-screen sticky layer. It stacks on top of the others.
    <div className="sticky top-0 h-screen">
      
      {/* This wrapper uses flexbox to perfectly center the card content. */}
      <div className="relative h-full w-full flex items-center justify-center">
        
        <motion.div 
          className="relative w-[90%] md:w-[80%] max-w-5xl h-[75vh] rounded-3xl transform-gpu"
          style={{ scale }} // The only transform needed is scale.
        >
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl border border-white/10 shadow-2xl shadow-black/40"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent rounded-3xl" />
            
            {/* The text now fades in based on the overall scroll progress, not the card scale */}
            <motion.div 
              className="relative flex h-full flex-col justify-end p-6 md:p-10 text-white"
              style={{ opacity: textOpacity }}
            >
              <h3 className="font-serif text-3xl md:text-5xl font-light mb-3">{title}</h3>
              <p className="max-w-lg font-sans text-base md:text-lg text-white/80">{description}</p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}