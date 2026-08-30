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

      {/* INTRO: frames 0–45 */}
      <Sequence durationInFrames={45}>
        <Intro />
      </Sequence>

      {/* FIRST CAROUSEL: frames 35–95 */}
      <Sequence from={35} durationInFrames={60}>
        <CityCarousel selectedIndex={6} />
      </Sequence>

      {/* PARIS: frames 95–170 */}
      <Sequence from={95} durationInFrames={75}>
        <ParisTransition />
      </Sequence>

      {/* SECOND CAROUSEL: frames 170–210 */}
      <Sequence from={170} durationInFrames={45}>
        <CityCarousel selectedIndex={3} fromIndex={6} />
      </Sequence>

      {/* REYKJAVÍK: frames 215–305 */}
      <Sequence from={215} durationInFrames={90}>
        <ReykjavikTransition />
      </Sequence>

      {/* THIRD CAROUSEL: frames 305–330 */}
      <Sequence from={305} durationInFrames={25}>
        <CityCarousel selectedIndex={7} fromIndex={3} />
      </Sequence>


      {/* NEW YORK: frames 330–470 */}
      <Sequence from={330} durationInFrames={140}>
        <NewYorkTransition />
      </Sequence>

      {/* OUTRO: frames 470–515 */}
      <Sequence from={470} durationInFrames={45}>
        <Outro />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};