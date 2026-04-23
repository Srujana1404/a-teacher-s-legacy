import React from "react";
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TELUGU, SERIF } from "../fonts";

interface NarrativeSceneProps {
  bgSrc: string; // full-bleed AI image
  teluguLine: string;
  englishLine?: string;
  kenBurnsDirection?: "in" | "out";
  panX?: number;
  // softness of the dark wash at the bottom for caption legibility
  bottomWash?: number;
}

// Full-bleed AI imagery scene — gentle Ken Burns, elegant captions on bottom
export const NarrativeScene: React.FC<NarrativeSceneProps> = ({
  bgSrc,
  teluguLine,
  englishLine,
  kenBurnsDirection = "in",
  panX = 0,
  bottomWash = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = frame / durationInFrames;

  const scale =
    kenBurnsDirection === "in"
      ? interpolate(progress, [0, 1], [1.0, 1.08])
      : interpolate(progress, [0, 1], [1.08, 1.0]);
  const tx = interpolate(progress, [0, 1], [panX * -25, panX * 25]);

  const tOpacity = interpolate(
    frame,
    [20, 50, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const tY = interpolate(
    spring({ frame: frame - 20, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const eOpacity = interpolate(
    frame,
    [55, 85, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translateX(${tx}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(bgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.08) contrast(1.04) brightness(0.95)",
          }}
        />
      </AbsoluteFill>

      {/* Soft warm wash for cohesion */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,170,80,0.06) 0%, rgba(120,40,10,0.12) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Gentle bottom wash for caption legibility (no harsh black band) */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(20,8,2,${bottomWash}) 100%)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 110,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 200,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.85), transparent)",
            transform: `scaleX(${dividerScale})`,
            marginBottom: 26,
          }}
        />
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 56,
            color: "#fff5e0",
            textAlign: "center",
            opacity: tOpacity,
            transform: `translateY(${tY}px)`,
            textShadow: "0 4px 24px rgba(0,0,0,0.65)",
            marginBottom: 18,
            lineHeight: 1.3,
            maxWidth: 1500,
          }}
        >
          {teluguLine}
        </div>
        {englishLine && (
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 30,
              color: "#fde7c2",
              textAlign: "center",
              opacity: eOpacity,
              letterSpacing: 2,
              textShadow: "0 3px 18px rgba(0,0,0,0.65)",
            }}
          >
            {englishLine}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
