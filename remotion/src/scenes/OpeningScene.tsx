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

// Opening: full-bleed AI sunrise + portrait card sliding in, no harsh dark bands
export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = frame / durationInFrames;

  const bgScale = interpolate(progress, [0, 1], [1.0, 1.08]);

  const eyebrowOpacity = interpolate(
    frame,
    [10, 35, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const portraitSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 22, stiffness: 80 },
  });
  const portraitOp = interpolate(frame, [35, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const portraitY = interpolate(portraitSpring, [0, 1], [40, 0]);

  const c1Opacity = interpolate(
    frame,
    [70, 100, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c1Y = interpolate(
    spring({ frame: frame - 70, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const c2Opacity = interpolate(
    frame,
    [120, 150, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c2Y = interpolate(
    spring({ frame: frame - 120, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const divScale = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 200 } }),
    [0, 1],
    [0, 1]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Cinematic AI sunrise backdrop */}
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
            filter: "brightness(0.85) saturate(1.1)",
          }}
        />
      </AbsoluteFill>

      {/* Soft warm wash */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,170,80,0.10) 0%, rgba(140,60,15,0.20) 100%)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Subtle bottom wash for legibility */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(20,8,2,0.55) 100%)",
        }}
      />

      {/* Top eyebrow */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: SERIF,
          fontWeight: 400,
          fontSize: 28,
          color: "#ffd98a",
          letterSpacing: 14,
          textTransform: "uppercase",
          opacity: eyebrowOpacity,
        }}
      >
        A Tribute
      </div>

      {/* Portrait framed card center-top */}
      <div
        style={{
          position: "absolute",
          top: 130,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: portraitOp,
          transform: `translateY(${portraitY}px)`,
        }}
      >
        <div
          style={{
            width: 460,
            height: 580,
            background: "rgba(255, 245, 224, 0.06)",
            border: "1px solid rgba(255, 217, 138, 0.45)",
            padding: 12,
            boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          <Img
            src={staticFile("images/photo1.jpeg")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 25%",
              filter: "saturate(1.05) contrast(1.05)",
            }}
          />
        </div>
      </div>

      {/* Bottom captions */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 220,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
            transform: `scaleX(${divScale})`,
            marginBottom: 28,
          }}
        />
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 50,
            color: "#fff5e0",
            textAlign: "center",
            opacity: c1Opacity,
            transform: `translateY(${c1Y}px)`,
            marginBottom: 14,
            lineHeight: 1.3,
          }}
        >
          ప్రతి గొప్ప ప్రయాణం…<br />ఒక చిన్న కలతో మొదలవుతుంది
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 700,
            fontSize: 40,
            color: "#ffd98a",
            textAlign: "center",
            opacity: c2Opacity,
            transform: `translateY(${c2Y}px)`,
            lineHeight: 1.3,
          }}
        >
          ఒక ఉపాధ్యాయురాలి అందమైన ప్రయాణానికి మన వందనాలు
        </div>
      </div>
    </AbsoluteFill>
  );
};
