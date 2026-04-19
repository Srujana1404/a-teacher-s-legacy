import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Sequence,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene } from "./scenes/Scene";
import { OpeningScene } from "./scenes/OpeningScene";
import { EndingScene } from "./scenes/EndingScene";
import { Particles } from "./components/Particles";
import { Vignette } from "./components/Vignette";
import { LightLeak } from "./components/LightLeak";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Scene durations (in frames at 30fps)
const TRANS = 25; // crossfade frames
const OPEN_DUR = 180; // 6s opening
const SCENE_DUR = 240; // 8s per photo scene
const END_DUR = 240; // 8s ending

// 1 opening + 5 photo scenes + 1 ending = 7 scenes
// Total raw = 180 + 5*240 + 240 = 1620
// Transitions overlap: 6 transitions * 25 = -150
// Total = 1470 frames = 49s
export const TOTAL_FRAMES =
  OPEN_DUR + 5 * SCENE_DUR + END_DUR - 6 * TRANS;

const photos = [
  { src: "images/photo3.jpeg", captions: ["కేవలం ఒక ఉద్యోగం కాదు…", "ఒక బాధ్యతగా ప్రారంభమైన మార్గం"] }, // Beginning
  { src: "images/photo6.jpeg", captions: ["విద్యను మాత్రమే కాదు…", "విలువలను కూడా నేర్పిన గురువు"] }, // Teaching (with student/colleague)
  { src: "images/photo2.jpeg", captions: ["కృషి… అంకిత భావం…", "విజయాలకు మార్గం చూపాయి"] }, // Growth
  { src: "images/photo4.jpeg", captions: ["ఆమె బోధన… తరాలకు ప్రేరణ", "విద్యార్థుల హృదయాల్లో ఎప్పటికీ"] }, // Legacy
  { src: "images/photo5.jpeg", captions: ["గురువు కాదు… మార్గదర్శి", "వేలాది జీవితాల్లో వెలుగు"] }, // Impact
];

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Audio fade out at the end
  const audioVolume = interpolate(
    frame,
    [0, 30, durationInFrames - 60, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Background warm gradient (persistent) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, #4a2818 0%, #2b1810 50%, #120804 100%)",
        }}
      />

      {/* Music */}
      <Audio src={staticFile("audio/piano.mp3")} volume={audioVolume} />

      {/* Scene sequence with cross-dissolves */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={OPEN_DUR}>
          <OpeningScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANS })}
        />

        {photos.map((p, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
              <Scene
                imageSrc={p.src}
                captionLine1={p.captions[0]}
                captionLine2={p.captions[1]}
                kenBurnsDirection={i % 2 === 0 ? "in" : "out"}
                panX={i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : 0}
              />
            </TransitionSeries.Sequence>
            <TransitionSeries.Transition
              presentation={fade()}
              timing={linearTiming({ durationInFrames: TRANS })}
            />
          </React.Fragment>
        ))}

        <TransitionSeries.Sequence durationInFrames={END_DUR}>
          <EndingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Persistent overlays */}
      <Particles />
      <LightLeak />
      <Vignette />
    </AbsoluteFill>
  );
};
