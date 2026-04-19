import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TELUGU, SERIF } from "../fonts";

interface TitleCardProps {
  eyebrow: string;
  teluguTitle: string;
  englishSub?: string;
}

// Elegant chapter divider scene - cream parchment-like card on warm dark bg
export const TitleCard: React.FC<TitleCardProps> = ({
  eyebrow,
  teluguTitle,
  englishSub,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const eyebrowOpacity = interpolate(
    frame,
    [5, 25, durationInFrames - 20, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(
    frame,
    [15, 40, durationInFrames - 20, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const titleY = interpolate(titleSpring, [0, 1], [25, 0]);

  const subOpacity = interpolate(
    frame,
    [40, 65, durationInFrames - 20, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #4a2818 0%, #2b1810 55%, #120804 100%)",
      }}
    >
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 30,
            color: "#ffd98a",
            letterSpacing: 14,
            textTransform: "uppercase",
            opacity: eyebrowOpacity,
            marginBottom: 50,
          }}
        >
          {eyebrow}
        </div>

        <div
          style={{
            width: 240,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
            transform: `scaleX(${dividerScale})`,
            marginBottom: 50,
          }}
        />

        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 700,
            fontSize: 80,
            color: "#fff5e0",
            textAlign: "center",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            lineHeight: 1.25,
            maxWidth: 1500,
            textShadow: "0 4px 30px rgba(0,0,0,0.7)",
          }}
        >
          {teluguTitle}
        </div>

        {englishSub && (
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 36,
              color: "#fde7c2",
              textAlign: "center",
              opacity: subOpacity,
              marginTop: 40,
              letterSpacing: 2,
            }}
          >
            {englishSub}
          </div>
        )}

        <div
          style={{
            width: 240,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
            transform: `scaleX(${dividerScale})`,
            marginTop: 50,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
