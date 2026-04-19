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

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = frame / durationInFrames;

  // Slow pull back
  const scale = interpolate(progress, [0, 1], [1.18, 1.05]);

  // Caption 1: "ఇది ముగింపు కాదు…"
  const c1Opacity = interpolate(
    frame,
    [20, 45, 90, 110],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Caption 2: "మీ సేవలకు మా హృదయపూర్వక కృతజ్ఞతలు"
  const c2Opacity = interpolate(
    frame,
    [115, 140, 175, 195],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Final tribute card: name + year + final message
  const cardOpacity = interpolate(
    frame,
    [200, 225],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cardScale = spring({
    frame: frame - 200,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const cardScaleVal = interpolate(cardScale, [0, 1], [0.92, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Hero portrait (photo1 again for emotional bookend) */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center 35%",
        }}
      >
        <Img
          src={staticFile("images/photo1.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.95) contrast(1.05) brightness(0.95)",
          }}
        />
      </AbsoluteFill>

      {/* Sunset warm wash */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,140,60,0.20) 0%, rgba(180,70,20,0.30) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Dark overlay growing for ending tribute card */}
      <AbsoluteFill
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          opacity: interpolate(frame, [180, 220], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Captions phase 1+2 */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 130,
        }}
      >
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 58,
            color: "#fff5e0",
            textAlign: "center",
            opacity: c1Opacity,
            textShadow: "0 4px 20px rgba(0,0,0,0.85)",
            lineHeight: 1.3,
            position: "absolute",
            bottom: 140,
          }}
        >
          ఇది ముగింపు కాదు…<br />ఒక అందమైన అధ్యాయం ముగింపు
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 700,
            fontSize: 56,
            color: "#ffd98a",
            textAlign: "center",
            opacity: c2Opacity,
            textShadow: "0 4px 20px rgba(0,0,0,0.85)",
            lineHeight: 1.3,
            position: "absolute",
            bottom: 160,
          }}
        >
          మీ సేవలకు మా హృదయపూర్వక<br />కృతజ్ఞతలు
        </div>
      </AbsoluteFill>

      {/* Final tribute card */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: cardOpacity,
          transform: `scale(${cardScaleVal})`,
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "60px 90px",
            background: "rgba(20,10,5,0.55)",
            borderTop: "1px solid rgba(255,200,120,0.35)",
            borderBottom: "1px solid rgba(255,200,120,0.35)",
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 32,
              color: "#ffd98a",
              letterSpacing: 8,
              marginBottom: 28,
              textTransform: "uppercase",
            }}
          >
            With Gratitude
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 90,
              color: "#fff5e0",
              lineHeight: 1.05,
              marginBottom: 20,
              textShadow: "0 4px 24px rgba(0,0,0,0.6)",
            }}
          >
            Smt. Niranjani Yarala
          </div>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 38,
              color: "#fde7c2",
              letterSpacing: 4,
              marginBottom: 30,
            }}
          >
            Retirement · April 24, 2026
          </div>
          <div
            style={{
              fontFamily: TELUGU,
              fontWeight: 600,
              fontSize: 44,
              color: "#ffe9b5",
              lineHeight: 1.35,
            }}
          >
            ధన్యవాదాలు మేడమ్ 💐<br />
            మీరు ఎప్పటికీ మా హృదయాల్లో ఉంటారు
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
