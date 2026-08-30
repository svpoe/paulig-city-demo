import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

import {SearchBar} from "./SearchBar";
import {CoffeeCup} from "./CoffeeCup";

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

  const questionOpacity = interpolate(frame, [20, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questionTranslateY = interpolate(frame, [20, 26], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      <CoffeeCup />

      {/* Headline */}
      <div
        style={{
          textAlign: "center",
          // transform: `translateY(${translateY}px)`,
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
          <div
            style={{
              opacity: questionOpacity,
              transform: `translateY(${questionTranslateY}px)`,
            }}
          >
            mutta minne?
          </div>
        </div>
      </div>


    </AbsoluteFill>
  );
};