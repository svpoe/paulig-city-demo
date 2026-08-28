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

  const repeatedCities = [
    ...cities,
    ...cities,
    ...cities,
  ];

  // Selected city in the second copy of the array
  const targetIndex = cities.length + selectedIndex;

  // X position needed to center the FIRST card
  const startX =
    width / 2 - CARD_WIDTH / 2;

  // X position needed to center the selected card
  const targetX =
    width / 2 -
    CARD_WIDTH / 2 -
    targetIndex * STEP;

  const travelEnd = 90;

  // Move slightly too far, then spring backwards
  const overshoot = -120;

  const travelX = interpolate(
    frame,
    [0, travelEnd],
    [startX, targetX + overshoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const springFrame = Math.max(
    0,
    frame - travelEnd
  );

  const settle = spring({
    frame: springFrame,
    fps,
    config: {
      damping: 12,
      stiffness: 130,
      mass: 0.8,
    },
  });

  const translateX =
    frame < travelEnd
      ? travelX
      : interpolate(
          settle,
          [0, 1],
          [targetX + overshoot, targetX]
        );

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
        {repeatedCities.map((city, index) => {
            const cardCenterX =
            translateX +
            index * STEP +
            CARD_WIDTH / 2;

            const screenCenterX = width / 2;

            const distanceFromCenter = Math.abs(
            cardCenterX - screenCenterX
            );

            const scale = interpolate(
            distanceFromCenter,
            [0, STEP],
            [1, 0.82],
            {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            }
            );

            const opacity = interpolate(
            distanceFromCenter,
            [0, STEP * 1.3],
            [1, 0.45],
            {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
            }
            );

            return (
            <div
                key={`${city.id}-${index}`}
                style={{
                transform: `scale(${scale})`,
                opacity,
                flexShrink: 0,
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