import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

import {SearchBar} from "./SearchBar";

export const Intro = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 12, 30, 38],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const translateY = interpolate(
    frame,
    [0, 18],
    [30, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorX = interpolate(
    frame,
    [12, 30],
    [0, 35],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4efe7",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <SearchBar />

      {/* Headline */}
      <div
        style={{
          textAlign: "center",
          transform: `translateY(${translateY}px)`,
          color: "#171717",
        }}
      >
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Kahvi kutsuu,
          <br />
          mutta minne?
        </div>
      </div>

      {/* Cursor */}
      <Img
        src={staticFile("icons/cursor.png")}
        style={{
          position: "absolute",
          width: 90,
          left: "61%",
          top: "62%",
          transform: `translateX(${cursorX}px) rotate(-8deg)`,
        }}
      />
    </AbsoluteFill>
  );
};