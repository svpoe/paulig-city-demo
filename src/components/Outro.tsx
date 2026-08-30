import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const Outro = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
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
      <Img
        src={staticFile("icons/paulig.png")}
        style={{
          width: 560,
        }}
      />
    </AbsoluteFill>
  );
};
