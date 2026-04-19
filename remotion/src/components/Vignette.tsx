import React from "react";
import { AbsoluteFill } from "remotion";

export const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        background:
          "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)",
      }}
    />
  );
};
