import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";

export const CoffeeCup = () => {
  const frame = useCurrentFrame();

  const steamY = interpolate(
    frame % 40,
    [0, 40],
    [0, -45]
  );

  const steamOpacity = interpolate(
    frame % 40,
    [0, 10, 30, 40],
    [0, 0.6, 0.4, 0]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "55%",
        transform: "translateX(-50%)",
        width: 320,
        height: 400,
      }}
    >
      {/* STEAM */}
      <div
        style={{
          position: "absolute",
          left: "42%",
          top: -30,
          width: 18,
          height: 100,
          borderRadius: "50%",
          borderLeft: "5px solid rgba(90, 70, 55, 0.45)",
          transform: `
            translateY(${steamY}px)
            rotate(-8deg)
          `,
          opacity: steamOpacity,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "55%",
          top: -15,
          width: 18,
          height: 90,
          borderRadius: "50%",
          borderLeft: "5px solid rgba(90, 70, 55, 0.35)",
          transform: `
            translateY(${steamY * 0.8}px)
            rotate(10deg)
          `,
          opacity: steamOpacity,
        }}
      />

      {/* CUP */}
      <Img
        src={staticFile("icons/aamukahvi.png")}
        style={{
          width: "380%",
          position: "absolute",
          bottom: 0,
          objectFit: "contain",
          translate: "-320px 519.2px",
        }}
      />
    </div>
  );
};