import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** App / favicon icon — solid ICH accent-green tile with dark mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          background: "#3dd68c",
          color: "#0a0a0b",
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -0.5,
        }}
      >
        IC
      </div>
    ),
    { ...size },
  );
}
