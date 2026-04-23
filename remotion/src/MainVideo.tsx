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
import { NarrativeScene } from "./scenes/NarrativeScene";
import { QuoteCard } from "./scenes/QuoteCard";
import { Particles } from "./components/Particles";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

const TRANS = 30;

// Durations — slowed down for a calm, dignified read
const OPEN_DUR = 360;       // 12s opening
const TITLE_DUR = 195;      // 6.5s chapter card
const SCENE_DUR = 360;      // 12s photo scene
const NARR_DUR = 300;       // 10s AI narrative scene
const QUOTE_DUR = 330;      // 11s quote card
const END_DUR = 540;        // 18s ending

// Story flow (15 segments) — same structure, more breathing room.
const NUM_TRANS = 14;
export const TOTAL_FRAMES =
  OPEN_DUR +
  QUOTE_DUR +
  TITLE_DUR + NARR_DUR + SCENE_DUR +
  TITLE_DUR + NARR_DUR + SCENE_DUR + SCENE_DUR + NARR_DUR +
  TITLE_DUR + SCENE_DUR + SCENE_DUR + NARR_DUR +
  END_DUR -
  NUM_TRANS * TRANS;

// = 360+330 + 195+300+360 + 195+300+360+360+300 + 195+360+360+300 + 540 - 420
// = 4815 - 420 = 4395 frames @ 30fps = ~146.5s (~2:26)

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const audioVolume = interpolate(
    frame,
    [0, 90, durationInFrames - 150, durationInFrames],
    [0, 0.78, 0.78, 0],
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

      {/* Uplifting hopeful piano — Kevin MacLeod "Inspired" (CC-BY) */}
      <Audio src={staticFile("audio/inspired.mp3")} volume={audioVolume} />

      <TransitionSeries>
        {/* 1. Opening */}
        <TransitionSeries.Sequence durationInFrames={OPEN_DUR}>
          <OpeningScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 2. Opening quote */}
        <TransitionSeries.Sequence durationInFrames={QUOTE_DUR}>
          <QuoteCard
            teluguQuote="ఒక ఉపాధ్యాయురాలు… వేలాది దీపాలను వెలిగిస్తారు"
            englishQuote="A teacher lights a thousand lamps that shine forever."
            attribution="A Tribute"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 3. Chapter 1 */}
        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter One"
            teluguTitle="ప్రయాణం మొదలవుతుంది"
            englishSub="The Journey Begins"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 4. AI: empty classroom */}
        <TransitionSeries.Sequence durationInFrames={NARR_DUR}>
          <NarrativeScene
            bgSrc="images/ai_classroom.jpeg"
            teluguLine="ఒక చిన్న తరగతి గది… ఒక పెద్ద కల"
            englishLine="A small classroom · a great dream"
            kenBurnsDirection="in"
            panX={-1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 5. Photo: young teacher */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo3.jpeg"
            bgSrc="images/bg_photo3.jpeg"
            chapterLabel="Beginning"
            captionLine1="కేవలం ఒక ఉద్యోగం కాదు…"
            captionLine2="ఒక బాధ్యతగా ప్రారంభమైన మార్గం"
            kenBurnsDirection="in"
            panX={-1}
            focusY={0.18}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 6. Chapter 2 */}
        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter Two"
            teluguTitle="బోధన… మార్గదర్శనం"
            englishSub="Teaching · Guiding · Inspiring"
            bgImage="images/ai_blackboard.jpeg"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 7. AI: blackboard */}
        <TransitionSeries.Sequence durationInFrames={NARR_DUR}>
          <NarrativeScene
            bgSrc="images/ai_blackboard.jpeg"
            teluguLine="ప్రతి అక్షరం… ఒక ఆశీర్వాదం"
            englishLine="Every word · a blessing"
            kenBurnsDirection="out"
            panX={1}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 8. Photo: teaching (with colleague) */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo6.jpeg"
            bgSrc="images/bg_photo6.jpeg"
            chapterLabel="Teaching"
            captionLine1="విద్యను మాత్రమే కాదు…"
            captionLine2="విలువలను కూడా నేర్పిన గురువు"
            kenBurnsDirection="out"
            panX={0}
            focusY={0.28}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 9. Photo: dedication */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo2.jpeg"
            bgSrc="images/bg_photo2.jpeg"
            chapterLabel="Dedication"
            captionLine1="కృషి… అంకిత భావం…"
            captionLine2="విజయాలకు మార్గం చూపాయి"
            kenBurnsDirection="in"
            panX={1}
            focusY={0.18}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 10. AI: students walking */}
        <TransitionSeries.Sequence durationInFrames={NARR_DUR}>
          <NarrativeScene
            bgSrc="images/ai_students.jpeg"
            teluguLine="ఆమె నేర్పిన పాఠాలు… వేలాది జీవితాలను మార్చాయి"
            englishLine="Her lessons shaped a thousand lives"
            kenBurnsDirection="in"
            panX={0}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 11. Chapter 3 */}
        <TransitionSeries.Sequence durationInFrames={TITLE_DUR}>
          <TitleCard
            eyebrow="Chapter Three"
            teluguTitle="తరాలకు ప్రేరణ"
            englishSub="A Legacy of Light"
            bgImage="images/ai_diya.jpeg"
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 12. Photo: inspiration */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo4.jpeg"
            bgSrc="images/bg_photo4.jpeg"
            chapterLabel="Inspiration"
            captionLine1="ఆమె బోధన… తరాలకు ప్రేరణ"
            captionLine2="విద్యార్థుల హృదయాల్లో ఎప్పటికీ"
            kenBurnsDirection="out"
            panX={-1}
            focusY={0.16}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 13. Photo: elegant */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DUR}>
          <Scene
            imageSrc="images/photo5.jpeg"
            bgSrc="images/bg_photo5.jpeg"
            chapterLabel="Legacy"
            captionLine1="గురువు కాదు… మార్గదర్శి"
            captionLine2="వేలాది జీవితాల్లో వెలుగు"
            kenBurnsDirection="in"
            panX={1}
            focusY={0.20}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 14. AI: diya */}
        <TransitionSeries.Sequence durationInFrames={NARR_DUR}>
          <NarrativeScene
            bgSrc="images/ai_diya.jpeg"
            teluguLine="ఒక దీపం… వేలాది దీపాలను వెలిగించింది"
            englishLine="One flame · a thousand lights"
            kenBurnsDirection="in"
            panX={0}
            bottomWash={0.4}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: TRANS })} />

        {/* 15. Ending tribute */}
        <TransitionSeries.Sequence durationInFrames={END_DUR}>
          <EndingScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Soft ambient particles */}
      <Particles />
    </AbsoluteFill>
  );
};
