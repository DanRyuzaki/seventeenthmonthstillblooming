"use client";

export default function PetalFrame({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
}) {
  const clipId = `petal-clip-${id}`;
  return (
    <div className={className} style={{ position: "relative" }}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d="M0.5,0 C0.85,0 1,0.22 1,0.5 C1,0.82 0.7,1 0.5,1 C0.3,1 0,0.82 0,0.5 C0,0.22 0.15,0 0.5,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div
        style={{ clipPath: `url(#${clipId})`, width: "100%", height: "100%" }}
        className="relative overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
