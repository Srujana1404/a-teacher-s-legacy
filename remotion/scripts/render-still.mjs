import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition, openBrowser } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const frameArg = parseInt(process.argv[2] ?? "80", 10);
const outArg = process.argv[3] ?? `/tmp/frame_${frameArg}.png`;

const bundled = await bundle({
  entryPoint: path.resolve(__dirname, "../src/index.ts"),
  webpackOverride: (c) => c,
});

const browser = await openBrowser("chrome", {
  browserExecutable: "/bin/chromium",
  chromiumOptions: { args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"] },
  chromeMode: "chrome-for-testing",
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: "main",
  puppeteerInstance: browser,
});

await renderStill({
  composition,
  serveUrl: bundled,
  output: outArg,
  frame: frameArg,
  puppeteerInstance: browser,
});

console.log(`Rendered frame ${frameArg} -> ${outArg}`);
await browser.close({ silent: false });
