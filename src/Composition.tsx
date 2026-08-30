import {AbsoluteFill, Sequence} from "remotion";
import {Intro} from "./components/Intro";
import {CityCarousel} from "./components/CityCarousel";
import {ReykjavikTransition} from "./components/ReykjavikTransition";
import {NewYorkTransition} from "./components/NewYorkTransition";
import {ParisTransition} from "./components/ParisTransition";
import {Outro} from "./components/Outro";
import {SearchBar} from "./components/SearchBar";

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#f4efe7"}}>

      {/* INTRO: frames 0–55 */}
      <Sequence durationInFrames={55}>
        <Intro />
      </Sequence>

      {/* FIRST CAROUSEL: frames 45–105 */}
      <Sequence from={45} durationInFrames={60}>
        <CityCarousel selectedIndex={6} entersFromBack={false} />
      </Sequence>

      {/* PARIS: frames 105–180 */}
      <Sequence from={105} durationInFrames={75}>
        <ParisTransition durationInFrames={75} />
      </Sequence>

      {/* SECOND CAROUSEL: frames 180–220 */}
      <Sequence from={180} durationInFrames={45}>
        <CityCarousel selectedIndex={3} fromIndex={6} />
      </Sequence>

      {/* REYKJAVÍK: frames 225–315 */}
      <Sequence from={225} durationInFrames={90}>
        <ReykjavikTransition durationInFrames={90} />
      </Sequence>

      {/* THIRD CAROUSEL: frames 315–340 */}
      <Sequence from={315} durationInFrames={25}>
        <CityCarousel selectedIndex={7} fromIndex={3} />
      </Sequence>


      {/* NEW YORK: frames 340–480 */}
      <Sequence from={340} durationInFrames={140}>
        <NewYorkTransition />
      </Sequence>

      {/* OUTRO: frames 480–525 */}
      <Sequence from={480} durationInFrames={45}>
        <Outro />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};