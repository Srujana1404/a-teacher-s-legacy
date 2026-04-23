// Render a frame range to a separate MP4 (without audio).
// Usage: node scripts/render-chunk.mjs <startFrame> <endFrame> <outPath>
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const startFrame = parseInt(process.argv[2], 10);
const endFrame = parseInt(process.argv[3], 10);
const outputPath = process.argv[4];

if (Number.isNaN(startFrame) || Number.isNaN(endFrame) || !outputPath) {
  console.error("Usage: render-chunk.mjs <startFrame> <endFrame> <outPath>");
  process.exit(1);
}

console.log(`Bundling for chunk ${startFrame}-${endFrame}...`);
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

const browser = await openBrowser("chrome", {
  browserExecutable: "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: "main",
  puppeteerInstance: browser,
});

console.log(`Rendering frames ${startFrame}-${endFrame} -> ${outputPath}`);
let lastPct = -1;
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: "h264",
  outputLocation: outputPath,
  puppeteerInstance: browser,
  muted: true, // we'll mux audio separately at the end
  concurrency: 2,
  frameRange: [startFrame, endFrame],
  onProgress: ({ progress }) => {
    const pct = Math.floor(progress * 100);
    if (pct !== lastPct && pct % 10 === 0) {
      console.log(`  ${pct}%`);
      lastPct = pct;
    }
  },
});

console.log(`Done: ${outputPath}`);
await browser.close({ silent: false });
