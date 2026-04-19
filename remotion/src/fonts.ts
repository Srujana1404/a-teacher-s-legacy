import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Telugu serif
loadFont({
  family: "NotoSerifTelugu",
  url: staticFile("fonts/NotoSerifTelugu-Regular.ttf"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "NotoSerifTelugu",
  url: staticFile("fonts/NotoSerifTelugu-SemiBold.ttf"),
  weight: "600",
}).catch(() => {});

loadFont({
  family: "NotoSerifTelugu",
  url: staticFile("fonts/NotoSerifTelugu-Bold.ttf"),
  weight: "700",
}).catch(() => {});

// English serif
loadFont({
  family: "Cormorant",
  url: staticFile("fonts/CormorantGaramond-Regular.ttf"),
  weight: "400",
}).catch(() => {});

loadFont({
  family: "Cormorant",
  url: staticFile("fonts/CormorantGaramond-SemiBold.ttf"),
  weight: "600",
}).catch(() => {});

export const TELUGU = "NotoSerifTelugu, serif";
export const SERIF = "Cormorant, NotoSerifTelugu, serif";
