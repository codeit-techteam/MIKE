import { ImageResponse } from "next/og";

export const socialSize = {
  width: 1200,
  height: 630,
};

export const socialContentType = "image/png";

export function socialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#050505",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 4,
            color: "#a0a0a0",
          }}
        >
          MIKE AI
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 92,
            color: "#f5f5f2",
          }}
        >
          Mike
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 12,
            fontSize: 36,
            color: "#e8e4d9",
          }}
        >
          Personal AI memory assistant
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 28,
            color: "#a0a0a0",
          }}
        >
          Text it and forget it. Mike won’t.
        </div>
      </div>
    ),
    { ...socialSize }
  );
}

export function iconImage(width: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          color: "#e8e4d9",
          fontSize: Math.round(width * 0.5),
        }}
      >
        M
      </div>
    ),
    { width, height: width }
  );
}
