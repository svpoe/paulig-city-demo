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

      {/* FIRST CAROUSEL: frames 35–185 */}
      <Sequence from={35} durationInFrames={150}>
        <CityCarousel selectedIndex={5} />
      </Sequence>

      {/* REYKJAVÍK: frames 185–275 */}
      <Sequence from={185} durationInFrames={90}>
        <ReykjavikTransition />
      </Sequence>

      {/* SECOND CAROUSEL: frames 275–335 */}
      <Sequence from={275} durationInFrames={60}>
        <CityCarousel selectedIndex={6} />
      </Sequence>

      {/* NEW YORK: frames 335–425 */}
      <Sequence from={335} durationInFrames={90}>
        <NewYorkTransition />
      </Sequence>

      {/* THIRD CAROUSEL: frames 425–485 */}
      <Sequence from={425} durationInFrames={60}>
        <CityCarousel selectedIndex={6} />
      </Sequence>


      {/* PARIS: frames 485–575 */}
      <Sequence from={485} durationInFrames={90}>
        <ParisTransition />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};