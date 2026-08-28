import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
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

  // -------------------------
  // CARD POSITIONS
  // -------------------------

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

  // -------------------------
  // TIMING
  // -------------------------

  // Forward scroll ends here
  const forwardEnd = 75;

  // Return toward Barcelona ends here
  const reverseEnd = 125;

  const endOvershoot = -100;
  const targetOvershoot = -80;

  // -------------------------
  // PHASE 1:
  // SCROLL FORWARD
  // -------------------------

  const forwardX = interpolate(
    frame,
    [0, forwardEnd],
    [startX, endX + endOvershoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // -------------------------
  // PHASE 2:
  // RETURN LEFT
  // -------------------------

  const reverseX = interpolate(
    frame,
    [forwardEnd, reverseEnd],
    [endX + endOvershoot, targetX + targetOvershoot],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // -------------------------
  // PHASE 3:
  // SPRING ONTO BARCELONA
  // -------------------------

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

  // Choose current carousel position
  const translateX =
    frame <= forwardEnd
      ? forwardX
      : frame <= reverseEnd
        ? reverseX
        : settleX;

  // -------------------------
  // CURSOR MOVEMENT
  // -------------------------

  /*
   * During forward movement:
   * cursor moves toward the right.
   *
   * During reverse:
   * cursor travels toward the left.
   */
  const cursorX = interpolate(
    frame,
    [0, forwardEnd, reverseEnd],
    [180, 320, -320],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  /*
   * Fade cursor away after Barcelona
   * has been selected.
   */
  const cursorOpacity = interpolate(
    frame,
    [reverseEnd, reverseEnd + 20],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // -------------------------
  // RENDER
  // -------------------------

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
      }}
    >
      {/* CAROUSEL */}
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
          // Find card position relative to screen center
          const cardCenterX =
            translateX +
            index * STEP +
            CARD_WIDTH / 2;

          const screenCenterX = width / 2;

          const distanceFromCenter = Math.abs(
            cardCenterX - screenCenterX
          );

          // Center card gets larger
          const scale = interpolate(
            distanceFromCenter,
            [0, STEP],
            [1, 0.88],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          // Center card gets more visible
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

      {/* CURSOR */}
      <Img
        src={staticFile("icons/cursor.png")}
        style={{
          position: "absolute",

          width: 80,
          left: "80%",
          top: "68%",
          transform: "none",

        //   width: 80,
        //   // Start from horizontal center
        //   left: "50%",
        //   // Below the carousel
        //   top: "76%",

          opacity: cursorOpacity,

        //   transform: `
        //     translateX(${cursorX}px)
        //     rotate(-8deg)
        //   `,
        }}
      />
    </AbsoluteFill>
  );
};