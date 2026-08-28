import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {cities} from "../data/cities";
import {CityCard} from "./CityCard";

const CARD_WIDTH = 620;
const GAP = 50;
const STEP = CARD_WIDTH + GAP;

type Props = {
  selectedIndex: number;
};

export const CityCarousel = ({selectedIndex}: Props) => {
  const frame = useCurrentFrame();
  const {fps, width} = useVideoConfig();

  const startIndex = 0;
  const endIndex = cities.length - 1;

  const startX =
    width / 2 -
    CARD_WIDTH / 2 -
    startIndex * STEP;

  const endX =
    width / 2 -
    CARD_WIDTH / 2 -
    endIndex * STEP;

  const targetX =
    width / 2 -
    CARD_WIDTH / 2 -
    selectedIndex * STEP;

  // Forward scan through all cities
  const forwardEnd = 75;

  // Slight overshoot beyond the last city
  const endOvershoot = -100;

  const forwardX = interpolate(
    frame,
    [0, forwardEnd],
    [startX, endX + endOvershoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Reverse back to selected city
  const reverseFrame = Math.max(
    0,
    frame - forwardEnd
  );

  const reverseSpring = spring({
    frame: reverseFrame,
    fps,
    config: {
    damping: 18,
    stiffness: 25,
    mass: 1.2,
    },
    // config: {
    //   damping: 14,
    //   stiffness: 110,
    //   mass: 0.8,
    // },
  });

  const reverseX = interpolate(
    reverseSpring,
    [0, 1],
    [endX + endOvershoot, targetX]
  );

  const translateX =
    frame <= forwardEnd
      ? forwardX
      : reverseX;

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: "50%",
          display: "flex",
          gap: GAP,
          alignItems: "center",

          transform: `
            translateX(${translateX}px)
            translateY(-50%)
          `,
        }}
      >
        {cities.map((city, index) => {
          // Calculate this card's center position
          const cardCenterX =
            translateX +
            index * STEP +
            CARD_WIDTH / 2;

          const screenCenterX = width / 2;

          const distanceFromCenter = Math.abs(
            cardCenterX - screenCenterX
          );

          // Center card becomes larger
          const scale = interpolate(
            distanceFromCenter,
            [0, STEP],
            [1, 0.88],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Center card becomes more visible
          const opacity = interpolate(
            distanceFromCenter,
            [0, STEP * 1.3],
            [1, 0.6],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={city.id}
              style={{
                flexShrink: 0,
                transform: `scale(${scale})`,
                opacity,
              }}
            >
              <CityCard city={city} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};