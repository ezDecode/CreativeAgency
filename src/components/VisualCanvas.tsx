import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Service {
    title: string;
    description: string;
    imageUrl: string;
}

interface VisualCanvasProps {
    activeIndex: number;
    services: Service[];
}

class Particle {
    x: number; y: number;
    size: number;
    velocityX: number; velocityY: number;
    life: number;
    color: string;

    constructor(x: number, y: number, color: string) {
        this.x = x; this.y = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.velocityX = (Math.random() - 0.5) * 1.5;
        this.velocityY = (Math.random() - 0.5) * 1.5 + 0.5; // Drift downwards
        this.life = 1;
        this.color = color;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.life -= 0.02;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.color}, ${this.life})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

export default function VisualCanvas({ activeIndex, services }: VisualCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);

    useEffect(() => {
        if (previousIndex === null || previousIndex === activeIndex) {
            setPreviousIndex(activeIndex);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        
        let animationFrameId: number;
        const particles: Particle[] = [];

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = services[previousIndex].imageUrl;
        
        img.onload = () => {
            const container = canvas.parentElement!;
            const aspectImg = img.width / img.height;
            const aspectCont = container.clientWidth / container.clientHeight;
            let drawWidth, drawHeight, offsetX, offsetY;

            if (aspectImg > aspectCont) { // image wider than container
                drawHeight = container.clientHeight;
                drawWidth = drawHeight * aspectImg;
                offsetX = (container.clientWidth - drawWidth) / 2;
                offsetY = 0;
            } else { // image taller than container
                drawWidth = container.clientWidth;
                drawHeight = drawWidth / aspectImg;
                offsetX = 0;
                offsetY = (container.clientHeight - drawHeight) / 2;
            }
            
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let y = 0; y < imageData.height; y += 4) { // Iterate faster
                for (let x = 0; x < imageData.width; x += 4) {
                    const i = (y * imageData.width + x) * 4;
                    const r = imageData.data[i];
                    const g = imageData.data[i + 1];
                    const b = imageData.data[i + 2];
                    const a = imageData.data[i + 3];
                    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
                    
                    if (brightness > 20 && a > 100) {
                        particles.push(new Particle(x, y, `${r}, ${g}, ${b}`));
                    }
                }
            }

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    p.update();
                    p.draw(ctx);
                    if (p.life <= 0) particles.splice(i, 1);
                }
                if (particles.length > 0) {
                    animationFrameId = requestAnimationFrame(animate);
                }
            };
            animate();
        };

        setPreviousIndex(activeIndex);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };

    }, [activeIndex, services]);

    return (
        <div className="absolute inset-0 w-full h-full">
            <AnimatePresence>
                <motion.div
                    key={services[activeIndex].imageUrl}
                    className="absolute inset-0 bg-cover bg-center rounded-2xl"
                    style={{ backgroundImage: `url(${services[activeIndex].imageUrl})` }}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                />
            </AnimatePresence>
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={500} height={500 / (16/9)} />
        </div>
    );
}