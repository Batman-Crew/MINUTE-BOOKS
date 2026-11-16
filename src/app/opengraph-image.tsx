import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Minute Books — Run your business. Not your paperwork.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/minutebooks-lockup-white.png"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 90, color: "white", background: "linear-gradient(135deg,#6527d0,#2e1065 60%,#170636)" }}>
      <img src={`data:image/png;base64,${logo.toString("base64")}`} width={260} height={180} alt="" />
      <div style={{ marginTop: 50, fontSize: 68, fontWeight: 700, lineHeight: 1.05, display: "flex", flexDirection: "column" }}>
        <span>Run your business.</span><span>Not your paperwork.</span>
      </div>
    </div>,
    size,
  );
}
