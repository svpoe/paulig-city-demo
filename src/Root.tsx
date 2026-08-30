import {Composition} from "remotion";
import {MyComposition} from "./Composition";

export const RemotionRoot = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComposition}
      durationInFrames={465}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};