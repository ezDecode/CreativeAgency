import React, { useRef } from "react";

// Define the props for the component, including standard button attributes
interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// Changed from forwardRef to a standard functional component
const GlowButton: React.FC<GlowButtonProps> = ({ className, children, ...props }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    buttonRef.current?.style.setProperty("--mouse-x", `${x}px`);
    buttonRef.current?.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <button
      {...props}
      ref={buttonRef} // The internal ref is still used here for the effect
      onMouseMove={handleMouseMove}
      className={`
        relative group inline-flex items-center justify-center overflow-hidden 
        bg-black text-white rounded-full transition-colors duration-300
        ${className}
      `}
    >
      {/* The Glow Effect */}
      <div 
        className="
          pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        "
        style={{
          background: `
            radial-gradient(
              400px circle at var(--mouse-x) var(--mouse-y), 
              rgba(99, 102, 241, 0.4), 
              transparent 80%
            )
          `,
        }}
      />
      {/* The Button Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default GlowButton;