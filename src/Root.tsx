import { AbsoluteFill, Composition } from "remotion";
import { WowzaDealVideo } from "./wowzaDealVideo";
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <AbsoluteFill>
    <Composition 
        id="Opening"
        component={WowzaDealVideo}
        durationInFrames={710}
        fps={30}
        width={1080}
        height={1350}
      />
    </AbsoluteFill>


    </>
  );
};
