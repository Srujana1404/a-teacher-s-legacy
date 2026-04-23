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

// Final tribute: warm sunset bg → portrait fades to side → name card emerges centered.
export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = frame / durationInFrames;

  const bgScale = interpolate(progress, [0, 1], [1.0, 1.06]);

  // Phase 1 caption (0-150)
  const c1Op = interpolate(
    frame,
    [15, 45, 130, 160],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c1Y = interpolate(
    spring({ frame: frame - 15, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  // Tribute card 180+
  const cardSpring = spring({
    frame: frame - 180,
    fps,
    config: { damping: 22, stiffness: 90 },
  });
  const cardOp = interpolate(frame, [180, 215], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.94, 1]);

  const eyebrowOp = interpolate(frame, [205, 235], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameOp = interpolate(frame, [225, 260], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameY = interpolate(
    spring({ frame: frame - 225, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );
  const dateOp = interpolate(frame, [260, 290], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalOp = interpolate(frame, [295, 330], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalY = interpolate(
    spring({ frame: frame - 295, fps, config: { damping: 200 } }),
    [0, 1],
    [20, 0]
  );

  const dividerScale = interpolate(
    spring({ frame: frame - 200, fps, config: { damping: 200, mass: 1.2 } }),
    [0, 1],
    [0, 1]
  );

  // overlay grows softly to focus on card
  const overlayOp = interpolate(frame, [160, 210], [0, 0.55], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Sunset backdrop */}
      <AbsoluteFill
        style={{
          transform: `scale(${bgScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("images/ai_sunset.jpeg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8) saturate(1.15)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,140,60,0.12) 0%, rgba(180,70,20,0.22) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Phase 1 caption (centered) */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 56,
            color: "#fff5e0",
            textAlign: "center",
            opacity: c1Op,
            transform: `translateY(${c1Y}px)`,
            textShadow: "0 4px 24px rgba(0,0,0,0.65)",
            lineHeight: 1.3,
          }}
        >
          ఇది ముగింపు కాదు…<br />ఒక అందమైన అధ్యాయం ముగింపు
        </div>
      </AbsoluteFill>

      {/* Soft overlay to focus on card */}
      <AbsoluteFill style={{ backgroundColor: `rgba(8,4,2,${overlayOp})` }} />

      {/* Tribute card */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: cardOp,
          transform: `scale(${cardScale})`,
        }}
      >
        <div style={{ textAlign: "center", padding: "40px 90px" }}>
          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: 28,
              color: "#ffd98a",
              letterSpacing: 14,
              marginBottom: 24,
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
              margin: "0 auto 32px",
            }}
          />

          <div
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              fontSize: 92,
              color: "#fff5e0",
              lineHeight: 1.05,
              marginBottom: 20,
              textShadow: "0 4px 28px rgba(0,0,0,0.5)",
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
              fontSize: 36,
              color: "#fde7c2",
              letterSpacing: 3,
              marginBottom: 36,
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
              margin: "0 auto 32px",
            }}
          />

          <div
            style={{
              fontFamily: TELUGU,
              fontWeight: 600,
              fontSize: 42,
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
