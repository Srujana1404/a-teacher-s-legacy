import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// Soft drifting light leak — a warm streak that moves slowly
export const LightLeak: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow drift across the screen
  const x1 = interpolate(frame, [0, 1500], [-200, 1920 + 200]);
  const opacity1 = 0.07 + 0.03 * Math.sin(frame * 0.02);

  const x2 = interpolate(frame, [0, 1500], [1920 + 200, -300]);
  const opacity2 = 0.05 + 0.02 * Math.sin(frame * 0.018 + 1.5);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", mixBlendMode: "screen" }}>
      <div
        style={{
          position: "absolute",
          left: x1,
          top: -100,
          width: 900,
          height: 1300,
          background:
            "radial-gradient(ellipse, rgba(255,180,90,0.6) 0%, rgba(255,140,60,0.0) 60%)",
          opacity: opacity1,
          filter: "blur(60px)",
          transform: "rotate(-20deg)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: x2,
          top: 200,
          width: 700,
          height: 1100,
          background:
            "radial-gradient(ellipse, rgba(255,210,140,0.55) 0%, rgba(255,170,80,0.0) 60%)",
          opacity: opacity2,
          filter: "blur(70px)",
          transform: "rotate(15deg)",
        }}
      />
    </AbsoluteFill>
  );
};
