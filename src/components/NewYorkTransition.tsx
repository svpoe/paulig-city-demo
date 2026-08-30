import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const NewYorkTransition = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();

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

//   const videoZoom = interpolate(
//     frame,
//     [42, 90],
//     [1.04, 1.10],
//     {
//         extrapolateLeft: "clamp",
//         extrapolateRight: "clamp",
//     }
//     );

const videoZoom = interpolate(
  frame,
  [42, 90],
  [1.35, 1.55],
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

  const backButtonOpacity = interpolate(
    frame,
    [45, 52],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Closing headline fades in once the New York view has settled
  const closingTextOpacity = interpolate(
    frame,
    [55, 65],
    [0, 1],
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
      {/* Expanding New York card */}
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

          backgroundColor: "#FFD51E",
        }}
      >
        {/* NYC video */}
        <OffthreadVideo
          src={staticFile("videos/new-york.mp4")}
          muted
          playbackRate={0.8}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: videoOpacity,
            transform: `scale(${videoZoom})`,
            transformOrigin: "75% 75%",
            filter: "brightness(0.72)",
          }}
        />

        {/* BACK BUTTON */}
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

        {/* New York package */}
        <Img
          src={staticFile("packages/new_york.png")}
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
            NEW YORK
          </div>

          <div
            style={{
              fontSize: 24,
              marginTop: 8,
            }}
          >
            New York Style Roast
          </div>
        </div>
      </div>

      {/* Closing headline, matching the Intro's font */}
      <div
        style={{
          position: "absolute",
          bottom: height * 0.52,
          width: "100%",
          textAlign: "center",
          color: "#e9e6e6",
          opacity: closingTextOpacity,
        }}
      >
        <div
          style={{
            fontSize: 70,
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          Sinä päätät.
        </div>
      </div>
    </AbsoluteFill>
  );
};