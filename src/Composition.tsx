import {AbsoluteFill, Sequence} from "remotion";
import {Intro} from "./components/Intro";
import {CityCarousel} from "./components/CityCarousel";
import {ReykjavikTransition} from "./components/ReykjavikTransition";
import {SearchBar} from "./components/SearchBar";

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#f4efe7"}}>
      
      <Sequence durationInFrames={45}>
        <Intro />
      </Sequence>

      <Sequence from={35} durationInFrames={150}>
        <CityCarousel selectedIndex={5} />
      </Sequence>

      <Sequence from={185} durationInFrames={90}>
        <ReykjavikTransition />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};