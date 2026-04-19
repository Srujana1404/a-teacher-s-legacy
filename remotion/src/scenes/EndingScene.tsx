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

  const scale = interpolate(progress, [0, 1], [1.04, 1.0]);

  // Phase 1: Telugu farewell line (0-150)
  const c1Opacity = interpolate(
    frame,
    [15, 40, 110, 140],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c1Y = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  // Phase 2: dark overlay grows (140-200)
  const overlayOpacity = interpolate(frame, [140, 200], [0, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: tribute card appears (190+)
  const cardSpring = spring({
    frame: frame - 195,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const cardOpacity = interpolate(frame, [195, 230], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.94, 1]);

  // Eyebrow on card
  const eyebrowOp = interpolate(frame, [220, 250], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Name
  const nameOp = interpolate(frame, [240, 275], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameY = interpolate(
    spring({ frame: frame - 240, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );
  // Date
  const dateOp = interpolate(frame, [275, 305], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Final farewell
  const finalOp = interpolate(frame, [310, 345], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalY = interpolate(
    spring({ frame: frame - 310, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 215, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Blurred backdrop */}
      <AbsoluteFill>
        <Img
          src={staticFile("images/bg_photo1.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.4) saturate(1.2)",
            transform: "scale(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Hero portrait */}
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/photo1.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            filter: "saturate(0.95) contrast(1.05) brightness(0.95)",
          }}
        />
      </AbsoluteFill>

      {/* Sunset warm wash */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,140,60,0.18) 0%, rgba(180,70,20,0.28) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Phase 1 caption */}
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
            transform: `translateY(${c1Y}px)`,
            textShadow: "0 4px 24px rgba(0,0,0,0.9)",
            lineHeight: 1.3,
          }}
        >
          ఇది ముగింపు కాదు…<br />ఒక అందమైన అధ్యాయం ముగింపు
        </div>
      </AbsoluteFill>

      {/* Dark overlay for tribute card */}
      <AbsoluteFill style={{ backgroundColor: `rgba(8,4,2,${overlayOpacity})` }} />

      {/* Tribute card */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: cardOpacity,
          transform: `scale(${cardScale})`,
        }}
      >
        <div style={{ textAlign: "center", padding: "60px 90px" }}>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 30,
              color: "#ffd98a",
              letterSpacing: 14,
              marginBottom: 30,
              textTransform: "uppercase",
              opacity: eyebrowOp,
            }}
          >
            With Heartfelt Gratitude
          </div>

          <div
            style={{
              width: 240,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
              transform: `scaleX(${dividerScale})`,
              margin: "0 auto 40px",
            }}
          />

          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 96,
              color: "#fff5e0",
              lineHeight: 1.05,
              marginBottom: 22,
              textShadow: "0 4px 28px rgba(0,0,0,0.6)",
              opacity: nameOp,
              transform: `translateY(${nameY}px)`,
              letterSpacing: 1,
            }}
          >
            Smt. Niranjani Yarala
          </div>

          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 38,
              color: "#fde7c2",
              letterSpacing: 3,
              marginBottom: 50,
              opacity: dateOp,
            }}
          >
            Retirement &nbsp;·&nbsp; April 24, 2026
          </div>

          <div
            style={{
              width: 240,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
              transform: `scaleX(${dividerScale})`,
              margin: "0 auto 40px",
            }}
          />

          <div
            style={{
              fontFamily: TELUGU,
              fontWeight: 600,
              fontSize: 46,
              color: "#ffe9b5",
              lineHeight: 1.4,
              opacity: finalOp,
              transform: `translateY(${finalY}px)`,
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
