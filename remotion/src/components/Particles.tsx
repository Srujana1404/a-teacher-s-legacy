import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Soft drifting golden particles
export const Particles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = React.useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => {
      const seed = i * 9301 + 49297;
      const r = (n: number) => ((seed * n) % 233280) / 233280;
      return {
        x: r(1) * 1920,
        ySeed: r(2),
        size: 3 + r(3) * 8,
        speed: 0.15 + r(4) * 0.4,
        drift: (r(5) - 0.5) * 80,
        opacity: 0.15 + r(6) * 0.35,
        phase: r(7) * 6.28,
      };
    });
  }, []);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const y =
          (1080 + 100) -
          ((frame * p.speed * 4 + p.ySeed * 1200) % (1080 + 200));
        const x = p.x + Math.sin(frame * 0.015 + p.phase) * p.drift;
        const flicker =
          0.7 + 0.3 * Math.sin(frame * 0.05 + p.phase);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,220,150,1) 0%, rgba(255,180,80,0) 70%)",
              opacity: p.opacity * flicker,
              filter: "blur(1px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
