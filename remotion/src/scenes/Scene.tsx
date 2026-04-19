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
  bgSrc: string;
  captionLine1: string;
  captionLine2: string;
  kenBurnsDirection: "in" | "out";
  panX: number;
  // accent label shown small at top (English chapter marker)
  chapterLabel?: string;
}

export const Scene: React.FC<SceneProps> = ({
  imageSrc,
  bgSrc,
  captionLine1,
  captionLine2,
  kenBurnsDirection,
  panX,
  chapterLabel,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const progress = frame / durationInFrames;
  const scale =
    kenBurnsDirection === "in"
      ? interpolate(progress, [0, 1], [1.0, 1.07])
      : interpolate(progress, [0, 1], [1.07, 1.0]);

  const translateX = interpolate(progress, [0, 1], [panX * -18, panX * 18]);
  const translateY = interpolate(progress, [0, 1], [-5, 5]);

  // Chapter label
  const chapterOpacity = interpolate(
    frame,
    [10, 35, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Caption 1
  const cap1Opacity = interpolate(
    frame,
    [25, 50, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap1Y = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  // Caption 2 (delayed)
  const cap2Delay = 65;
  const cap2Opacity = interpolate(
    frame,
    [cap2Delay, cap2Delay + 22, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap2Y = interpolate(
    spring({ frame: frame - cap2Delay, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  // Divider line draws in
  const dividerScale = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill>
      {/* Pre-blurred backdrop (cheap, no runtime blur) */}
      <AbsoluteFill>
        <Img
          src={staticFile(bgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.45) saturate(1.15)",
            transform: "scale(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Main image, contained, with Ken Burns */}
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
            objectFit: "contain",
            filter: "saturate(1.05) contrast(1.04) brightness(1.02)",
          }}
        />
      </AbsoluteFill>

      {/* Subtle warm wash on top */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,180,90,0.06) 0%, rgba(120,40,10,0.10) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Top + bottom darken bands for text legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Chapter label (top) */}
      {chapterLabel && (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "Cormorant, serif",
            fontWeight: 400,
            fontSize: 28,
            color: "#ffd98a",
            letterSpacing: 12,
            textTransform: "uppercase",
            opacity: chapterOpacity,
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
          }}
        >
          {chapterLabel}
        </div>
      )}

      {/* Bottom captions area */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 90,
        }}
      >
        {/* Golden divider */}
        <div
          style={{
            width: 180,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.85), transparent)",
            transform: `scaleX(${dividerScale})`,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 60,
            color: "#fff5e0",
            textAlign: "center",
            opacity: cap1Opacity,
            transform: `translateY(${cap1Y}px)`,
            textShadow: "0 4px 24px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.6)",
            marginBottom: 18,
            lineHeight: 1.3,
            letterSpacing: 0.5,
            maxWidth: 1500,
          }}
        >
          {captionLine1}
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 400,
            fontSize: 46,
            color: "#fde7c2",
            textAlign: "center",
            opacity: cap2Opacity,
            transform: `translateY(${cap2Y}px)`,
            textShadow: "0 3px 18px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.6)",
            lineHeight: 1.35,
            maxWidth: 1500,
          }}
        >
          {captionLine2}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
