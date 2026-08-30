import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import {getBackButtonOffset} from "../data/motion";

type Props = {
  durationInFrames: number;
};

export const ParisTransition = ({durationInFrames}: Props) => {
  const frame = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();

  // Cursor moves onto card
  const cursorX = interpolate(
    frame,
    [0, 18],
    [-280, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorY = interpolate(
    frame,
    [0, 18],
    [220, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Card expansion
  const progress = interpolate(
    frame,
    [24, 48],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cardWidth = interpolate(
    progress,
    [0, 1],
    [620, width * 0.8]
  );

  const cardHeight = interpolate(
    progress,
    [0, 1],
    [840, height * 0.7]
  );

  const borderRadius = interpolate(
    progress,
    [0, 1],
    [40, 28]
  );

  // Fade in Paris video
  const videoOpacity = interpolate(
    frame,
    [27, 42],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Fade out package
  const packageOpacity = interpolate(
    frame,
    [24, 34],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Cursor disappears after click
  const cursorOpacity = interpolate(
    frame,
    [26, 35],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Back button fades in
  const backButtonOpacity = interpolate(
    frame,
    [45, 52],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Cursor returns to click the back button before the scene cuts,
  // ending exactly where the next carousel's cursor begins
  const backButtonOffset = getBackButtonOffset(width, height);
  const exitStart = durationInFrames - 22;

  const exitCursorX = interpolate(
    frame,
    [exitStart, exitStart + 10],
    [0, backButtonOffset.x],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exitCursorY = interpolate(
    frame,
    [exitStart, exitStart + 10],
    [0, backButtonOffset.y],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const exitCursorOpacity = interpolate(
    frame,
    [exitStart, exitStart + 6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const displayCursorX = frame < exitStart ? cursorX : exitCursorX;
  const displayCursorY = frame < exitStart ? cursorY : exitCursorY;
  const displayCursorOpacity =
    frame < exitStart ? cursorOpacity : exitCursorOpacity;

  // Gentle zoom toward coffee area
  const videoZoom = interpolate(
    frame,
    [42, 90],
    [1.32, 1.44],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Expanding Parisien card */}
      <div
        style={{
          position: "absolute",

          top: interpolate(
            progress,
            [0, 1],
            [540, height * 0.205]
          ),

          left: "50%",

          width: cardWidth,
          height: cardHeight,

          transform: "translateX(-50%)",

          borderRadius,
          overflow: "hidden",

          backgroundColor: "#08649B",
        }}
      >
        {/* Paris video */}
        <OffthreadVideo
          src={staticFile("videos/paris.mp4")}
          muted
          playbackRate={0.8}
          trimBefore={fps * 4 - 8}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoOpacity,
            transform: `scale(${videoZoom})`,
            transformOrigin: "70% 70%",
            filter: "brightness(0.72)",
          }}
        />

        {/* Back button */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            width: 72,
            height: 72,
            borderRadius: "50%",
            backgroundColor: "rgba(70, 70, 70, 0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: backButtonOpacity,
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderLeft: "7px solid white",
              borderBottom: "7px solid white",
              transform: "rotate(45deg)",
              marginLeft: 8,
            }}
          />
        </div>

        {/* Parisien package */}
        <Img
          src={staticFile("packages/paris.png")}
          style={{
            position: "absolute",
            height: "68%",
            left: "50%",
            top: "44%",
            transform: "translate(-50%, -50%)",
            objectFit: "contain",
            opacity: packageOpacity,
          }}
        />

        {/* Parisien title */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            textAlign: "center",
            color: "white",
            opacity: packageOpacity,
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
            }}
          >
            PARIS
          </div>

          <div
            style={{
              fontSize: 24,
              marginTop: 8,
            }}
          >
            French Style Roast
          </div>
        </div>
      </div>

      {/* Mouse */}
      <Img
        src={staticFile("icons/cursor.png")}
        style={{
          position: "absolute",
          width: 80,

          left: "50%",
          top: "50%",

          opacity: displayCursorOpacity,

          transform: `
            translate(
              calc(-50% + ${displayCursorX}px),
              calc(-50% + ${displayCursorY}px)
            )
          `,
        }}
      />
    </AbsoluteFill>
  );
};