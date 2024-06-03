import { Sequence } from "remotion";
import AnimatedDealList from "./DealFlow";
import { ParentObjectType } from './schema';
import { LogoAnimation } from "./Opening";
import { AnimatedText } from "./wowzaText";
import WowzaCard from "./DealFlow/wowzaCard";
import { FallingIcons } from "./DealFlow/fallingIcons";
import { WowzaVerticalText } from "./wowzaVerticalText";
import { EndingAnimation } from "./ending";
import icon from '../public/dollar-circle.svg'

interface Props {
  dealsData: ParentObjectType;
}

export const WowzaDealVideo: React.FC<Props> = ({ dealsData }) => {
  const cardDuration = 90;
  const openingDuration = 45;
  const cardSectLength = dealsData.length * cardDuration;

  return (
    <>
      <Sequence durationInFrames={openingDuration}>
        <LogoAnimation />
      </Sequence>
      <Sequence from={openingDuration - 20} durationInFrames={65}>
        <AnimatedText text="WOWZA!" />
      </Sequence>
      {dealsData.map((deal, index) => (
        <Sequence
          key={index}
          from={openingDuration + 45 + index * cardDuration}
          durationInFrames={cardDuration}
          name="wowzaCard"
        >
          <WowzaCard price={deal.price} index={index} duration={cardDuration} />
        </Sequence>
      ))}
      <Sequence
        from={openingDuration + 45}
        durationInFrames={cardSectLength + 60}
        name="icons"
      >
        <FallingIcons
          icons={[icon, icon, icon, icon, icon, icon, icon, icon, icon, icon, icon]}
          startFrame={openingDuration + 60}
        />
      </Sequence>
      <Sequence
        from={openingDuration + 45}
        durationInFrames={cardSectLength}
        name="dealList"
      >
        <AnimatedDealList deals={dealsData} duration={cardDuration} />
      </Sequence>
      <Sequence
        from={openingDuration + 45 + cardSectLength}
        durationInFrames={60}
        name="WowzaVertical"
      >
        <WowzaVerticalText text="WOWZA!" />
      </Sequence>
      <Sequence
        from={openingDuration + 45 + cardSectLength + 60}
        durationInFrames={110}
        name="Ending"
      >
        <EndingAnimation />
      </Sequence>
    </>
  );
};