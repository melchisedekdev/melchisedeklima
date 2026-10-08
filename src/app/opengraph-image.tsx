import { ImageResponse } from "next/og";
export const alt = "Melchisedek Lima — Engenharia de IA, software e segurança";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09070d",
          color: "#fbf9ff",
          display: "flex",
          fontFamily: "sans-serif",
          height: "100%",
          overflow: "hidden",
          padding: 72,
          position: "relative",
          width: "100%",
        }}
      >
        <div style={{ background: "#8f61ff", height: 8, left: 72, position: "absolute", top: 72, width: 112 }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 780 }}>
          <div style={{ color: "#c8acff", display: "flex", fontSize: 23, fontWeight: 700, letterSpacing: 4 }}>MELCHISEDEK LIMA · TERESINA, BRASIL</div>
          <div style={{ display: "flex", fontSize: 80, fontWeight: 800, letterSpacing: -4, lineHeight: 1.02, marginTop: 34 }}>Engenharia para ideias que merecem ganhar o mundo.</div>
          <div style={{ color: "#c8c0d5", display: "flex", fontSize: 27, lineHeight: 1.35, marginTop: 30 }}>Inteligência artificial aplicada, software, cibersegurança e produtos digitais.</div>
          <div style={{ display: "flex", gap: 14, marginTop: 38 }}>
            {['IA APLICADA', 'SOFTWARE', 'SEGURANÇA'].map((label) => <div key={label} style={{ border: "1px solid #7651ba", borderRadius: 99, color: "#e8ddff", display: "flex", fontSize: 18, fontWeight: 700, padding: "10px 16px" }}>{label}</div>)}
          </div>
        </div>
        <div style={{ border: "2px solid #7d53e0", borderRadius: "50%", display: "flex", height: 610, opacity: 0.72, position: "absolute", right: -122, top: -46, width: 610 }} />
        <div style={{ border: "1px solid #5f3e98", borderRadius: "50%", display: "flex", height: 450, opacity: 0.55, position: "absolute", right: -42, top: 34, width: 450 }} />
        <div style={{ alignItems: "center", background: "linear-gradient(135deg, #c5a0ff 0%, #8852ed 100%)", borderRadius: 42, color: "#160c22", display: "flex", fontSize: 64, fontWeight: 900, height: 126, justifyContent: "center", letterSpacing: -8, position: "absolute", right: 98, top: 252, width: 170 }}>ML</div>
      </div>
    ),
    size,
  );
}
