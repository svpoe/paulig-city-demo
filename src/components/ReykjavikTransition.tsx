import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const ReykjavikTransition = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

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

  // Click pulse
  const clickScale = interpolate(
    frame,
    [18, 21, 24],
    [1, 0.8, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Expansion starts after click
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
    [620, width * 0.80]
  );

  const cardHeight = interpolate(
    progress,
    [0, 1],
    [840, height * 0.70]
  );

  const borderRadius = interpolate(
    progress,
    [0, 1],
    [40, 28]
  );

  const videoOpacity = interpolate(
    frame,
    [27, 42],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const packageOpacity = interpolate(
    frame,
    [24, 34],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cursorOpacity = interpolate(
    frame,
    [26, 35],
    [1, 0],
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
      {/* Expanding Reykjavík card */}
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

          backgroundColor: "#69C6E5",
        }}
      >
        {/* Lagoon video */}
        <OffthreadVideo
          src={staticFile("videos/reykjavik.mp4")}
          muted
          playbackRate={0.6}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoOpacity,
            filter: "brightness(0.82)",
            transform: "scale(1.25)",
            // clipPath: "inset(0 0 10% 0)",
          }}
        />

        {/* Reykjavík package - fades away */}
        <Img
          src={staticFile("packages/reykjavik.png")}
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

        <div
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            textAlign: "center",
            color: "#151515",
            opacity: packageOpacity,
          }}
        >
          <div
            style={{
              fontSize: 54,
              fontWeight: 800,
            }}
          >
            REYKJAVÍK
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

          opacity: cursorOpacity,

          transform: `
            translate(
              calc(-50% + ${cursorX}px),
              calc(-50% + ${cursorY}px)
            )
            scale(${clickScale})
          `,
        }}
      />

    </AbsoluteFill>
  );
};