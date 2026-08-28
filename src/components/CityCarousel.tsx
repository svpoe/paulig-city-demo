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

  // Center the first city
  const startX =
    width / 2 -
    CARD_WIDTH / 2 -
    startIndex * STEP;

  // Center the final city
  const endX =
    width / 2 -
    CARD_WIDTH / 2 -
    endIndex * STEP;

  // Center the selected city
  const targetX =
    width / 2 -
    CARD_WIDTH / 2 -
    selectedIndex * STEP;

  /*
   * TIMING
   *
   * 0–75:
   * Scan through all cities
   *
   * 75–125:
   * Travel back toward Barcelona
   *
   * 125+:
   * Small spring settle
   */

  const forwardEnd = 75;
  const reverseEnd = 125;

  // Slight movement past Los Angeles
  const endOvershoot = -100;

  // Slight movement past Barcelona before settling
  const targetOvershoot = -80;

  /*
   * PHASE 1:
   * Forward scan
   */
  const forwardX = interpolate(
    frame,
    [0, forwardEnd],
    [startX, endX + endOvershoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  /*
   * PHASE 2:
   * Controlled reverse movement
   *
   * This is intentionally interpolate(),
   * not spring(), so we control how long
   * the return journey takes.
   */
  const reverseX = interpolate(
    frame,
    [forwardEnd, reverseEnd],
    [endX + endOvershoot, targetX + targetOvershoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  /*
   * PHASE 3:
   * Small spring into final Barcelona position
   */
  const settleFrame = Math.max(
    0,
    frame - reverseEnd
  );

  const settle = spring({
    frame: settleFrame,
    fps,
    config: {
      damping: 16,
      stiffness: 85,
      mass: 0.9,
    },
  });

  const settleX = interpolate(
    settle,
    [0, 1],
    [targetX + targetOvershoot, targetX]
  );

  /*
   * Choose which phase controls the carousel
   */
  const translateX =
    frame <= forwardEnd
      ? forwardX
      : frame <= reverseEnd
        ? reverseX
        : settleX;

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
          /*
           * Find each card's center position
           */
          const cardCenterX =
            translateX +
            index * STEP +
            CARD_WIDTH / 2;

          const screenCenterX = width / 2;

          const distanceFromCenter = Math.abs(
            cardCenterX - screenCenterX
          );

          /*
           * Cards grow as they approach
           * the center.
           */
          const scale = interpolate(
            distanceFromCenter,
            [0, STEP],
            [1, 0.88],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          /*
           * Cards also become more opaque
           * near the center.
           */
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