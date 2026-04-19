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

  // Featured photo - main portrait. Slow zoom in.
  const scale = interpolate(progress, [0, 1], [1.1, 1.25]);

  // Caption 1: appears, then fades
  const c1Opacity = interpolate(
    frame,
    [25, 50, 95, 115],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c1Y = interpolate(
    spring({ frame: frame - 25, fps, config: { damping: 200 } }),
    [0, 1],
    [25, 0]
  );

  // Caption 2: tribute line
  const c2Opacity = interpolate(
    frame,
    [120, 145, durationInFrames - 25, durationInFrames - 5],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const c2Y = interpolate(
    spring({ frame: frame - 120, fps, config: { damping: 200 } }),
    [0, 1],
    [25, 0]
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Featured image (photo1 = main smiling portrait) */}
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
            filter: "saturate(1.05) contrast(1.05) brightness(1.0)",
          }}
        />
      </AbsoluteFill>

      {/* Strong dark gradient for caption */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Warm wash */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(255,170,80,0.12) 0%, rgba(140,60,15,0.18) 100%)",
          mixBlendMode: "overlay",
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
            fontSize: 60,
            color: "#fff5e0",
            textAlign: "center",
            opacity: c1Opacity,
            transform: `translateY(${c1Y}px)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            marginBottom: 16,
            lineHeight: 1.3,
            position: "absolute",
            bottom: 110,
          }}
        >
          ప్రతి గొప్ప ప్రయాణం…<br />ఒక చిన్న కలతో మొదలవుతుంది
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 700,
            fontSize: 56,
            color: "#ffd98a",
            textAlign: "center",
            opacity: c2Opacity,
            transform: `translateY(${c2Y}px)`,
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            lineHeight: 1.3,
            position: "absolute",
            bottom: 130,
          }}
        >
          ఒక ఉపాధ్యాయురాలి అందమైన<br />ప్రయాణానికి మన వందనాలు
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
