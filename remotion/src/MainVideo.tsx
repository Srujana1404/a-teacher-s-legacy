import React from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene } from "./scenes/Scene";
import { OpeningScene } from "./scenes/OpeningScene";
import { EndingScene } from "./scenes/EndingScene";
import { TitleCard } from "./scenes/TitleCard";
import { Particles } from "./components/Particles";
import { Vignette } from "./components/Vignette";
import { LightLeak } from "./components/LightLeak";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const TRANS = 22; // crossfade frames

// Scene durations
const OPEN_DUR = 195;       // 6.5s
const TITLE_DUR = 110;      // 3.7s chapter cards
const SCENE_DUR = 195;      // 6.5s per photo
const END_DUR = 380;        // 12.7s tribute card

// Story:
// 1. Opening (portrait)            195
// 2. Chapter 1: Beginning          110
// 3. Photo - young teacher         195
// 4. Chapter 2: Teaching Journey   110
// 5. Photo - teaching/colleague    195
// 6. Photo - leadership/promotions 195
// 7. Chapter 3: Legacy             110
// 8. Photo - festive/recognition   195
// 9. Photo - elegant portrait      195
// 10. Ending tribute               380

const NUM_TRANS = 9;
export const TOTAL_FRAMES =
  OPEN_DUR +
  TITLE_DUR + SCENE_DUR +
  TITLE_DUR + SCENE_DUR + SCENE_DUR +
  TITLE_DUR + SCENE_DUR + SCENE_DUR +
  END_DUR -
  NUM_TRANS * TRANS;

// total = 195 + 110+195 + 110+195+195 + 110+195+195 + 380 - 9*22
//       = 195 + 305 + 500 + 500 + 380 - 198
//       = 1880 - 198 = 1682 frames @ 30fps = 56.07s

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const audioVolume = interpolate(
    frame,
    [0, 45, durationInFrames - 90, durationInFrames],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#1a0f08" }}>
      {/* Persistent warm ambient bg */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, #4a2818 0%, #2b1810 50%, #120804 100%)",
        }}
      />

      <Audio src={staticFile("audio/piano.mp3")} volume={audioVolume} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={OPEN_DUR}>
          <OpeningScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter One"
            teluguTitle="ప్రయాణం మొదలవుతుంది"
            englishSub="The Journey Begins"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo3.jpeg"
            bgSrc="images/bg_photo3.jpeg"
            chapterLabel="Beginning"
            captionLine1="కేవలం ఒక ఉద్యోగం కాదు…"
            captionLine2="ఒక బాధ్యతగా ప్రారంభమైన మార్గం"
            kenBurnsDirection="in"
            panX={-1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter Two"
            teluguTitle="బోధన… మార్గదర్శనం"
            englishSub="Teaching · Guiding · Inspiring"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo6.jpeg"
            bgSrc="images/bg_photo6.jpeg"
            chapterLabel="Teaching"
            captionLine1="విద్యను మాత్రమే కాదు…"
            captionLine2="విలువలను కూడా నేర్పిన గురువు"
            kenBurnsDirection="out"
            panX={0}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo2.jpeg"
            bgSrc="images/bg_photo2.jpeg"
            chapterLabel="Growth"
            captionLine1="కృషి… అంకిత భావం…"
            captionLine2="విజయాలకు మార్గం చూపాయి"
            kenBurnsDirection="in"
            panX={1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter Three"
            teluguTitle="తరాలకు ప్రేరణ"
            englishSub="A Legacy of Light"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo4.jpeg"
            bgSrc="images/bg_photo4.jpeg"
            chapterLabel="Inspiration"
            captionLine1="ఆమె బోధన… తరాలకు ప్రేరణ"
            captionLine2="విద్యార్థుల హృదయాల్లో ఎప్పటికీ"
            kenBurnsDirection="out"
            panX={-1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo5.jpeg"
            bgSrc="images/bg_photo5.jpeg"
            chapterLabel="Legacy"
            captionLine1="గురువు కాదు… మార్గదర్శి"
            captionLine2="వేలాది జీవితాల్లో వెలుగు"
            kenBurnsDirection="in"
            panX={1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

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
