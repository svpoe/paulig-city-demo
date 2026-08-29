import {
  AbsoluteFill,
  Sequence,
} from "remotion";

import {Intro} from "./components/Intro";
import {CityCarousel} from "./components/CityCarousel";
import {DestinationView} from "./components/DestinationView";



export const MyComposition = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#f4efe7"}}>
      
      <Sequence durationInFrames={45}>
        <Intro />
      </Sequence>

      <Sequence
        from={35}
        durationInFrames={170}
      >
        <CityCarousel selectedIndex={5} />
      </Sequence>

      <Sequence
        from={205}
        durationInFrames={60}
      >
        <DestinationView />
      </Sequence>

    </AbsoluteFill>
  );
};
// export const MyComposition = () => {
//   return (
//     <AbsoluteFill
//       style={{
//         backgroundColor: "#f4efe7",
//       }}
//     >
//       <Sequence
//         durationInFrames={45}
//       >
//         <Intro />
//       </Sequence>

//       <Sequence
//         from={35}
//         durationInFrames={170}
//       >
//         <CityCarousel selectedIndex={1} />
//       </Sequence>
//     </AbsoluteFill>
//   );
// };