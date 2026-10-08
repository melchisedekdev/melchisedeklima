import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #211333 0%, #0d0914 100%)",
          border: "6px solid #38244e",
          borderRadius: 42,
          color: "#f7f3ff",
          display: "flex",
          fontFamily: "sans-serif",
          fontSize: 72,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -8,
          width: "100%",
        }}
      >
        ML
      </div>
    ),
    size,
  );
}
