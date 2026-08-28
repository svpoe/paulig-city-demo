import {AbsoluteFill} from "remotion";
import {CityCarousel} from "./components/CityCarousel";

export const MyComposition = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f4efe7",
      }}
    >
      <CityCarousel selectedIndex={1} />
    </AbsoluteFill>
  );
};