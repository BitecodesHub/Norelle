import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Norelle — Luxury Perfumes & Attar | Ahmedabad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FAFAF7 0%, #F5EDE0 40%, #EDE3D5 100%)",
          fontFamily: "serif",
        }}
      >
        {/* Gold line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 72,
            letterSpacing: "0.35em",
            color: "#1C1008",
            fontWeight: 300,
            marginBottom: 16,
          }}
        >
          NORELLE
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background: "#D4AF37",
            marginBottom: 24,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#7A5E47",
            letterSpacing: "0.15em",
            fontWeight: 400,
          }}
        >
          Luxury Perfumes & Attar
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 16,
            color: "#B09278",
            letterSpacing: "0.2em",
            marginTop: 12,
          }}
        >
          AHMEDABAD
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            fontSize: 13,
            color: "#B09278",
            letterSpacing: "0.15em",
          }}
        >
          <span>norelle.in</span>
          <span>·</span>
          <span>100% Natural</span>
          <span>·</span>
          <span>Free Delivery</span>
        </div>

        {/* Gold line bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
