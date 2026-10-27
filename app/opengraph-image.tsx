import { ImageResponse } from "next/og";

export const alt = "Gustavo Borges | Desenvolvedor Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "linear-gradient(135deg,#0f172a,#1e3a8a)", color: "#fff" }}>
        <div style={{ fontSize: 28, color: "#93c5fd", marginBottom: 24 }}>Portfólio</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.1 }}>Gustavo Borges</div>
        <div style={{ fontSize: 44, marginTop: 20, color: "#e2e8f0" }}>Desenvolvedor Full Stack</div>
        <div style={{ fontSize: 30, marginTop: 40, color: "#93c5fd" }}>Next.js · React · TypeScript · Node.js</div>
      </div>
    ),
    { ...size }
  );
}
