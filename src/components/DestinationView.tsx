import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
} from "remotion";

export const DestinationView = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
      }}
    >
      <OffthreadVideo
        src={staticFile("videos/reykjavik.mp4")}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </AbsoluteFill>
  );
};