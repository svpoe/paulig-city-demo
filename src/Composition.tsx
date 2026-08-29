import {AbsoluteFill, Sequence} from "remotion";
import {Intro} from "./components/Intro";
import {CityCarousel} from "./components/CityCarousel";
import {ReykjavikTransition} from "./components/ReykjavikTransition";
import {NewYorkTransition} from "./components/NewYorkTransition";
import {ParisTransition} from "./components/ParisTransition";
import {SearchBar} from "./components/SearchBar";

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#f4efe7"}}>

      {/* INTRO: frames 0–45 */}
      <Sequence durationInFrames={45}>
        <Intro />
      </Sequence>

      {/* FIRST CAROUSEL: frames 35–135 */}
      <Sequence from={35} durationInFrames={100}>
        <CityCarousel selectedIndex={5} />
      </Sequence>

      {/* REYKJAVÍK: frames 135–195 */}
      <Sequence from={135} durationInFrames={60}>
        <ReykjavikTransition />
      </Sequence>

      {/* SECOND CAROUSEL: frames 195–235 */}
      <Sequence from={195} durationInFrames={40}>
        <CityCarousel selectedIndex={6} />
      </Sequence>

      {/* NEW YORK: frames 235–295 */}
      <Sequence from={235} durationInFrames={60}>
        <NewYorkTransition />
      </Sequence>

      {/* THIRD CAROUSEL: frames 295–335 */}
      <Sequence from={295} durationInFrames={40}>
        <CityCarousel selectedIndex={6} />
      </Sequence>


      {/* PARIS: frames 335–425 */}
      <Sequence from={335} durationInFrames={90}>
        <ParisTransition />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};