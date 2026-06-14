import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt =
  "FPS Error Code Reference — decode Faster Payments rejection and return codes";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#818cf8",
          }}
        >
          FPS Error Code Reference
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 960,
          }}
        >
          Decode Faster Payments rejection &amp; return codes
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "#a1a1aa",
            maxWidth: 920,
          }}
        >
          Plain English explanations, common causes, and remediation steps for
          UK FPS error codes.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 8,
            width: 160,
            background: "#6366f1",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
