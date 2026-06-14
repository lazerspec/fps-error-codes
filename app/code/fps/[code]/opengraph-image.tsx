import { ImageResponse } from "next/og";
import { getCodeBySlug, getCodesByScheme } from "@/data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Mirror the page's generateStaticParams so each code's OG image prerenders.
export function generateStaticParams() {
  const codes = getCodesByScheme("fps");
  return codes.map((code) => ({
    code: code.code,
  }));
}

export const alt = "FPS Error Code Reference";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code: codeParam } = await params;
  const code = getCodeBySlug("fps", codeParam);

  const typeLabel = code?.type === "RET" ? "RET" : "REJ";
  const severityLabel =
    code?.severity === "fatal" ? "Fatal" : "Retryable";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "#818cf8",
          }}
        >
          FPS Error Code Reference
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 120,
                fontWeight: 700,
                fontFamily: "monospace",
                color: "#fafafa",
              }}
            >
              {code ? code.code : codeParam}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 44,
              fontWeight: 600,
              lineHeight: 1.15,
              maxWidth: 1000,
              color: "#e4e4e7",
            }}
          >
            {code ? code.shortDescription : "FPS error code"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: 8,
              background: "#1e1b4b",
              color: "#a5b4fc",
              border: "1px solid #4338ca",
            }}
          >
            {typeLabel}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              padding: "8px 20px",
              borderRadius: 8,
              background: "#18181b",
              color: "#a1a1aa",
              border: "1px solid #3f3f46",
            }}
          >
            {severityLabel}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
