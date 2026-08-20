import { useRef, useState, useEffect } from "react";

export function BeforeAfter({
  image,
  alt,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  image: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const newPos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(newPos);
  };

  // Handle touch events for mobile
  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (e.touches[0]) {
      move(e.touches[0].clientX);
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      move(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Add touch event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden border border-border touch-none"
      onPointerMove={(e) => {
        if (e.buttons === 1 || isDragging) {
          move(e.clientX);
        }
      }}
      onPointerDown={(e) => {
        setIsDragging(true);
        move(e.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerLeave={() => setIsDragging(false)}
    >
      <img
        src={image}
        alt={`${alt} — after`}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt={`${alt} — before`}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
          style={{ filter: "grayscale(1) contrast(0.75) brightness(0.7) sepia(0.35)" }}
        />
        <span className="absolute bottom-3 left-3 bg-primary/85 px-2 py-1 font-display text-xs font-bold uppercase tracking-wide text-primary-foreground">
          {beforeLabel}
        </span>
      </div>
      <span className="absolute bottom-3 right-3 bg-accent px-2 py-1 font-display text-xs font-bold uppercase tracking-wide text-accent-foreground">
        {afterLabel}
      </span>
      <div
        className="absolute inset-y-0 w-0.5 bg-accent pointer-events-none"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent font-display text-lg font-bold text-accent-foreground shadow-lg">
          ↔
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${alt} before and after comparison`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
