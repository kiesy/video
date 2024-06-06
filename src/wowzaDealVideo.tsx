import { Sequence } from "remotion";
import AnimatedDealList from "./DealFlow";
import { DealDataIndividualType } from './schema';
import { LogoAnimation } from "./Opening";
import { AnimatedText } from "./wowzaText";
import WowzaCard from "./DealFlow/wowzaCard";
import { FallingIcons } from "./DealFlow/fallingIcons";
import { WowzaVerticalText } from "./wowzaVerticalText";
import { EndingAnimation } from "./ending";
import icon from '../public/dollar-circle.svg'




/*
const dealsData =  [
  {
    brand: 'Quakers',
    name: "Product 1",
    packageSize: "Large",
    price: 1.99,
    salePrice: 1.50,
    productImage: "https://assets.shop.loblaws.ca/products/21550066/b3/en/front/21550066_front_a06_@2.png",
  },
  {
    brand: 'Quakers',
    name: "Product 2",
    packageSize: "Small",
    price: 5.25,
    salePrice: 4.23,
    productImage: "https://assets.shop.loblaws.ca/products/21550066/b3/en/front/21550066_front_a06_@2.png",
  },
  {
    brand: 'Quakers',
    name: "Product 1",
    packageSize: "Large",
    price: 1.24,
    salePrice: 0.99,
    productImage: "https://assets.shop.loblaws.ca/products/21550066/b3/en/front/21550066_front_a06_@2.png",
  },
  {
    brand: 'Quakers',
    name: "Product 2",
    packageSize: "Small",
    price: 5.43,
    salePrice: 3.50,
    productImage: "https://assets.shop.loblaws.ca/products/21550066/b3/en/front/21550066_front_a06_@2.png",
  },

]
*/

interface Props {
  dealsData: DealDataIndividualType;
  storeName: string;
  [key: string]: unknown;  // Allow any other props of unknown type.
}
export const WowzaDealVideo: React.FC<Props> = ({ dealsData, storeName }) => {

  console.log(dealsData)
  const cardDuration = 300;
  const openingDuration = 180;
  const cardSectLength = dealsData.length * cardDuration/2;

  return (
    <>
      <Sequence durationInFrames={openingDuration}>
        <LogoAnimation />
      </Sequence>
      <Sequence from={openingDuration - 40} durationInFrames={220}>
        <AnimatedText text={storeName.toUpperCase()} />
      </Sequence>

      <Sequence
        from={openingDuration + 180}
        durationInFrames={cardSectLength + 120}
        name="icons"
      >
        <FallingIcons
          icons={[icon, icon, icon, icon, icon, icon, icon, icon, icon, icon, icon]}
          startFrame={openingDuration + 60}
        />
      </Sequence>
      <Sequence
        from={openingDuration + 180}
        durationInFrames={cardSectLength}
        name="dealList"
      >
        <AnimatedDealList deals={dealsData} duration={cardDuration} />
      </Sequence>
      <Sequence
        from={openingDuration + 90 + cardSectLength+ 120}
        durationInFrames={220}
        name="Ending"
      >
        <EndingAnimation />
      </Sequence>
    </>
  );
};

/*

    */