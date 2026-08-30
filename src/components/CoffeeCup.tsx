import {
  Img,
  staticFile,
} from "remotion";

export const CoffeeCup = () => {
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