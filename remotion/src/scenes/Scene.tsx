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
  // Vertical focus for face framing inside the card. 0 = top, 1 = bottom.
  // Default 0.22 keeps faces near the top third visible.
  focusY?: number;
}

// Side-by-side layout: portrait photo card on the left, captions on the right.
// Photo uses object-position to keep the subject's face in frame at all times.
export const Scene: React.FC<SceneProps> = ({
  imageSrc,
  bgSrc,
  captionLine1,
  captionLine2,
  kenBurnsDirection,
  panX,
  chapterLabel,
  focusY = 0.22,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const progress = frame / durationInFrames;
  const scale =
    kenBurnsDirection === "in"
      ? interpolate(progress, [0, 1], [1.0, 1.04])
      : interpolate(progress, [0, 1], [1.04, 1.0]);
  const translateX = interpolate(progress, [0, 1], [panX * -8, panX * 8]);

  const chapterOpacity = interpolate(
    frame,
    [10, 35, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Card slides in from the left
  const cardSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 22, stiffness: 70 },
  });
  const cardOp = interpolate(frame, [20, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardX = interpolate(cardSpring, [0, 1], [-60, 0]);

  const cap1Opacity = interpolate(
    frame,
    [55, 90, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap1Y = interpolate(
    spring({ frame: frame - 55, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const cap2Delay = 110;
  const cap2Opacity = interpolate(
    frame,
    [cap2Delay, cap2Delay + 30, durationInFrames - 30, durationInFrames - 10],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cap2Y = interpolate(
    spring({ frame: frame - cap2Delay, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 70, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  // Card geometry — portrait card on the LEFT, text panel on the RIGHT
  const CARD_W = 760;
  const CARD_H = 980;
  const CARD_LEFT = 110;
  const CARD_TOP = (1080 - CARD_H) / 2;
  const TEXT_LEFT = CARD_LEFT + CARD_W + 80;
  const TEXT_W = 1920 - TEXT_LEFT - 110;

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
      <AbsoluteFill style={{ opacity: 0.4 }}>
        <Img
          src={staticFile(bgSrc)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(1.05)",
          }}
        />
      </AbsoluteFill>

      {/* Chapter eyebrow at top */}
      {chapterLabel && (
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 26,
            color: "#ffd98a",
            letterSpacing: 14,
            textTransform: "uppercase",
            opacity: chapterOpacity,
          }}
        >
          {chapterLabel}
        </div>
      )}

      {/* Portrait photo card on the left */}
      <div
        style={{
          position: "absolute",
          top: CARD_TOP,
          left: CARD_LEFT,
          width: CARD_W,
          height: CARD_H,
          opacity: cardOp,
          transform: `translateX(${cardX}px)`,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "rgba(255, 245, 224, 0.06)",
            border: "1px solid rgba(255, 217, 138, 0.4)",
            padding: 16,
            boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
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
                objectPosition: `center ${focusY * 100}%`,
                filter: "saturate(1.05) contrast(1.04) brightness(1.02)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Caption panel on the right */}
      <div
        style={{
          position: "absolute",
          top: CARD_TOP + 60,
          left: TEXT_LEFT,
          width: TEXT_W,
          height: CARD_H - 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            width: 140,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,217,138,0.95), transparent)",
            transform: `scaleX(${dividerScale})`,
            transformOrigin: "left center",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 52,
            color: "#fff5e0",
            textAlign: "left",
            opacity: cap1Opacity,
            transform: `translateY(${cap1Y}px)`,
            marginBottom: 28,
            lineHeight: 1.35,
            maxWidth: TEXT_W,
          }}
        >
          {captionLine1}
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 400,
            fontSize: 38,
            color: "#fde7c2",
            textAlign: "left",
            opacity: cap2Opacity,
            transform: `translateY(${cap2Y}px)`,
            lineHeight: 1.4,
            maxWidth: TEXT_W,
          }}
        >
          {captionLine2}
        </div>
      </div>
    </AbsoluteFill>
  );
};
