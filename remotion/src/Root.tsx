import { Composition } from "remotion";
import { MainVideo, FPS, WIDTH, HEIGHT, TOTAL_FRAMES } from "./MainVideo";
import "./fonts";

export const RemotionRoot = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
