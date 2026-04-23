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

interface QuoteCardProps {
  teluguQuote: string;
  englishQuote: string;
  attribution?: string;
}

// Elegant quote slide on parchment-style background
export const QuoteCard: React.FC<QuoteCardProps> = ({
  teluguQuote,
  englishQuote,
  attribution,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const tOp = interpolate(
    frame,
    [10, 35, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const tY = interpolate(
    spring({ frame: frame - 10, fps, config: { damping: 200 } }),
    [0, 1],
    [22, 0]
  );

  const eOp = interpolate(
    frame,
    [40, 70, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const aOp = interpolate(
    frame,
    [75, 100, durationInFrames - 25, durationInFrames - 8],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("images/ai_parchment.jpeg")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(20,8,2,0.4) 0%, rgba(20,8,2,0.55) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 180px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: SERIF,
            fontSize: 110,
            color: "#ffd98a",
            lineHeight: 0.6,
            marginBottom: 20,
          }}
        >
          “
        </div>
        <div
          style={{
            fontFamily: TELUGU,
            fontWeight: 600,
            fontSize: 60,
            color: "#fff5e0",
            opacity: tOp,
            transform: `translateY(${tY}px)`,
            lineHeight: 1.35,
            marginBottom: 36,
            maxWidth: 1500,
          }}
        >
          {teluguQuote}
        </div>
        <div
          style={{
            width: 220,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,217,138,0.9), transparent)",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 38,
            color: "#fde7c2",
            opacity: eOp,
            lineHeight: 1.4,
            maxWidth: 1400,
          }}
        >
          {englishQuote}
        </div>
        {attribution && (
          <div
            style={{
              fontFamily: SERIF,
              fontSize: 22,
              color: "#ffd98a",
              opacity: aOp,
              letterSpacing: 6,
              textTransform: "uppercase",
              marginTop: 36,
            }}
          >
            — {attribution}
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
