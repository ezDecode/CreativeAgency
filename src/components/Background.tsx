export default function Background() {
  return (
    // 'fixed' positioning pins the background to the viewport.
    // 'inset-0' makes it cover the entire screen.
    // 'z-0' places it on the lowest visual layer.
    <div className="fixed inset-0 z-0">
      <img
        src="/assets/Background.webp"
        alt="Abstract background"
        className="h-full w-full object-cover" // Ensures the image covers the entire area without distortion
      />
      {/* This div applies the "Midnight Mist" gradient overlay on top of the image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />
    </div>
  );
}