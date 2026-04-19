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
import { TELUGU } from "../fonts";

interface SceneProps {
  imageSrc: string;
  captionLine1: string;
  captionLine2: string;
  kenBurnsDirection: "in" | "out";
  panX: number; // -1, 0, or 1
}

export const Scene: React.FC<SceneProps> = ({
  imageSrc,
  captionLine1,
  captionLine2,
  kenBurnsDirection,
  panX,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Ken Burns: 8s scene = 240 frames. Slow zoom from 1.05 -> 1.18 or vice versa
  const progress = frame / durationInFrames;
  const scale =
    kenBurnsDirection === "in"
      ? interpolate(progress, [0, 1], [1.08, 1.22])
      : interpolate(progress, [0, 1], [1.22, 1.08]);

  // Subtle pan
  const translateX = interpolate(progress, [0, 1], [panX * -30, panX * 30]);
  const translateY = interpolate(progress, [0, 1], [-10, 10]);

  // Caption animations
  const cap1Opacity = interpolate(
    frame,
    [30, 50, durationInFrames - 40, durationInFrames - 20],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap1Y = interpolate(
    spring({ frame: frame - 30, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );

  const cap2Delay = 70;
  const cap2Opacity = interpolate(
    frame,
    [cap2Delay, cap2Delay + 20, durationInFrames - 40, durationInFrames - 20],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap2Y = interpolate(
    spring({ frame: frame - cap2Delay, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );

  return (
    <AbsoluteFill>
      {/* Image with Ken Burns */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.05) contrast(1.05) brightness(1.02)",
          }}
        />
      </AbsoluteFill>

      {/* Warm color grading overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,180,90,0.10) 0%, rgba(120,40,10,0.15) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Bottom gradient for caption legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Captions */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 110,
        }}
      >
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 64,
            color: "#fff5e0",
            textAlign: "center",
            opacity: cap1Opacity,
            transform: `translateY(${cap1Y}px)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.7)",
            marginBottom: 18,
            lineHeight: 1.3,
            letterSpacing: 0.5,
          }}
        >
          {captionLine1}
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 400,
            fontSize: 50,
            color: "#fde7c2",
            textAlign: "center",
            opacity: cap2Opacity,
            transform: `translateY(${cap2Y}px)`,
            textShadow: "0 3px 16px rgba(0,0,0,0.65)",
            lineHeight: 1.35,
          }}
        >
          {captionLine2}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
