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

interface SceneProps {
  imageSrc: string;
  bgSrc: string;
  captionLine1: string;
  captionLine2: string;
  kenBurnsDirection: "in" | "out";
  panX: number;
  chapterLabel?: string;
}

// Photo scene: photo sits in upper 70% of frame inside a soft cream card,
// captions live in their own lower band — so text never overlaps the photo.
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
      ? interpolate(progress, [0, 1], [1.0, 1.05])
      : interpolate(progress, [0, 1], [1.05, 1.0]);
  const translateX = interpolate(progress, [0, 1], [panX * -10, panX * 10]);

  const chapterOpacity = interpolate(
    frame,
    [8, 30, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const cap1Opacity = interpolate(
    frame,
    [22, 48, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap1Y = interpolate(
    spring({ frame: frame - 22, fps, config: { damping: 200 } }),
    [0, 1],
    [18, 0]
  );

  const cap2Delay = 60;
  const cap2Opacity = interpolate(
    frame,
    [cap2Delay, cap2Delay + 22, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap2Y = interpolate(
    spring({ frame: frame - cap2Delay, fps, config: { damping: 200 } }),
    [0, 1],
    [18, 0]
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 18, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  // photo card geometry
  const PHOTO_TOP = 70;
  const PHOTO_HEIGHT = 680;

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Soft warm parchment-style background */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #5a3320 0%, #2d180c 60%, #150a04 100%)",
        }}
      />

      {/* Very soft blurred backdrop for color harmony */}
      <AbsoluteFill style={{ opacity: 0.45 }}>
        <Img
          src={staticFile(bgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Chapter eyebrow */}
      {chapterLabel && (
        <div
          style={{
            position: "absolute",
            top: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 24,
            color: "#ffd98a",
            letterSpacing: 12,
            textTransform: "uppercase",
            opacity: chapterOpacity,
          }}
        >
          {chapterLabel}
        </div>
      )}

      {/* Photo card with cream border */}
      <div
        style={{
          position: "absolute",
          top: PHOTO_TOP,
          left: 0,
          right: 0,
          height: PHOTO_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 1080,
            height: PHOTO_HEIGHT,
            background: "rgba(255, 245, 224, 0.06)",
            border: "1px solid rgba(255, 217, 138, 0.35)",
            padding: 14,
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              transform: `scale(${scale}) translateX(${translateX}px)`,
              transformOrigin: "center center",
            }}
          >
            <Img
              src={staticFile(imageSrc)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "saturate(1.05) contrast(1.04) brightness(1.02)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Captions in a dedicated lower band — never over the photo */}
      <div
        style={{
          position: "absolute",
          top: PHOTO_TOP + PHOTO_HEIGHT + 20,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 20,
        }}
      >
        <div
          style={{
            width: 220,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.85), transparent)",
            transform: `scaleX(${dividerScale})`,
            marginBottom: 22,
          }}
        />
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 44,
            color: "#fff5e0",
            textAlign: "center",
            opacity: cap1Opacity,
            transform: `translateY(${cap1Y}px)`,
            marginBottom: 10,
            lineHeight: 1.25,
            maxWidth: 1500,
          }}
        >
          {captionLine1}
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 400,
            fontSize: 34,
            color: "#fde7c2",
            textAlign: "center",
            opacity: cap2Opacity,
            transform: `translateY(${cap2Y}px)`,
            lineHeight: 1.3,
            maxWidth: 1500,
          }}
        >
          {captionLine2}
        </div>
      </div>
    </AbsoluteFill>
  );
};
