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

      {/* PARIS: frames 95–155 */}
      <Sequence from={95} durationInFrames={60}>
        <ParisTransition />
      </Sequence>

      {/* SECOND CAROUSEL: frames 155–195 */}
      <Sequence from={155} durationInFrames={40}>
        <CityCarousel selectedIndex={3} fromIndex={6} />
      </Sequence>

      {/* REYKJAVÍK: frames 195–255 */}
      <Sequence from={195} durationInFrames={60}>
        <ReykjavikTransition />
      </Sequence>

      {/* THIRD CAROUSEL: frames 255–285 */}
      <Sequence from={255} durationInFrames={25}>
        <CityCarousel selectedIndex={7} fromIndex={3} />
      </Sequence>


      {/* NEW YORK: frames 285–355 */}
      <Sequence from={280} durationInFrames={140}>
        <NewYorkTransition />
      </Sequence>

      {/* OUTRO: frames 420–465 */}
      <Sequence from={420} durationInFrames={45}>
        <Outro />
      </Sequence>

      {/* Persistent website header */}
      <SearchBar />

    </AbsoluteFill>
  );
};