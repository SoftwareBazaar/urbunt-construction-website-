import { useRef, useState } from "react";

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
  const ref = useRef<HTMLDivElement>(null);

  const move = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full select-none overflow-hidden border border-border"
      onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
      onPointerDown={(e) => move(e.clientX)}
    >
      <img
        src={image}
        alt={`${alt} — after`}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={image}
          alt={`${alt} — before`}
          loading="lazy"
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
        className="absolute inset-y-0 w-0.5 bg-accent"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-accent-foreground">
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
        className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
