import { ImageResponse } from "next/og";

export const alt = "Minchan Kim: AI, software, and engineering projects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", flexDirection: "column", justifyContent: "center", padding: 80, background: "#eef5f9", color: "#0b2239", borderLeft: "20px solid #086da6" }}>
      <div style={{ display: "flex", fontSize: 25, color: "#086da6", marginBottom: 26 }}>Qingdao Daewon School | Class of 2027</div>
      <div style={{ display: "flex", fontSize: 88, fontWeight: 700 }}>Minchan Kim</div>
      <div style={{ display: "flex", fontSize: 39, marginTop: 24 }}>Artificial intelligence, in software and hardware.</div>
      <div style={{ display: "flex", fontSize: 25, marginTop: 48, color: "#475569" }}>Projects · Internships · School activities</div>
    </div>,
    size
  );
}
