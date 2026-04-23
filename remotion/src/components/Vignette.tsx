import React from "react";
import { AbsoluteFill } from "remotion";

// Very subtle warm corner softening (no dark vignette).
export const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 70%, rgba(60,30,10,0.18) 100%)",
      }}
    />
  );
};
