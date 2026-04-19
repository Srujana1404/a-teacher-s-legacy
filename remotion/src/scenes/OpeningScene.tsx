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

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = frame / durationInFrames;

  const scale = interpolate(progress, [0, 1], [1.0, 1.06]);

  // "WITH GRATITUDE" eyebrow
  const eyebrowOpacity = interpolate(
    frame,
    [10, 35, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Telugu line 1
  const c1Opacity = interpolate(
    frame,
    [40, 70, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c1Y = interpolate(
    spring({ frame: frame - 40, fps, config: { damping: 200 } }),
    [0, 1],
    [25, 0]
  );

  // Telugu line 2
  const c2Opacity = interpolate(
    frame,
    [110, 140, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c2Y = interpolate(
    spring({ frame: frame - 110, fps, config: { damping: 200 } }),
    [0, 1],
    [25, 0]
  );

  // Divider
  const divScale = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 200 } }),
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
            filter: "brightness(0.45) saturate(1.2)",
            transform: "scale(1.15)",
          }}
        />
      </AbsoluteFill>

      {/* Main portrait */}
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
            filter: "saturate(1.05) contrast(1.05) brightness(1.0)",
          }}
        />
      </AbsoluteFill>

      {/* Strong dark gradient for caption */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.92) 100%)",
        }}
      />

      {/* Warm wash */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,170,80,0.10) 0%, rgba(140,60,15,0.16) 100%)",
          mixBlendMode: "overlay",
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
          fontSize: 30,
          color: "#ffd98a",
          letterSpacing: 14,
          textTransform: "uppercase",
          opacity: eyebrowOpacity,
          textShadow: "0 2px 14px rgba(0,0,0,0.85)",
        }}
      >
        A Tribute
      </div>

      {/* Bottom captions */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 90,
        }}
      >
        <div
          style={{
            width: 220,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
            transform: `scaleX(${divScale})`,
            marginBottom: 36,
          }}
        />
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
            marginBottom: 22,
            lineHeight: 1.3,
          }}
        >
          ప్రతి గొప్ప ప్రయాణం…<br />ఒక చిన్న కలతో మొదలవుతుంది
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 700,
            fontSize: 50,
            color: "#ffd98a",
            textAlign: "center",
            opacity: c2Opacity,
            transform: `translateY(${c2Y}px)`,
            textShadow: "0 4px 24px rgba(0,0,0,0.9)",
            lineHeight: 1.3,
          }}
        >
          ఒక ఉపాధ్యాయురాలి అందమైన<br />ప్రయాణానికి మన వందనాలు
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
