import { Sequence } from "remotion";
import AnimatedDealList from "./DealFlow";
import { ParentObjectType } from './schema';
import { LogoAnimation } from "./Opening";
import { AnimatedText } from "./wowzaText";
import WowzaCard from "./DealFlow/wowzaCard";
import { FallingIcons } from "./DealFlow/fallingIcons";
import icon from '../public/dollar-circle.svg'
import { WowzaVerticalText } from "./wowzaVerticalText";
import { EndingAnimation } from "./ending";
const dealsData: ParentObjectType = {
  deals: [
      {
        name: 'Organic Apples',
        packageSize: '1 kg',
        price: 5.99,
        salePrice: 4.99,
        productImage: 'https://assets.shop.loblaws.ca/products/20049778001/b2/en/front/20049778001_front_a06_@2.png',
      },
      {
        name: 'Whole Grain Bread',
        packageSize: '500 g',
        price: 3.49,
        salePrice: 2.99,
        productImage: 'https://assets.shop.loblaws.ca/products/20175355001/b2/en/front/20175355001_front_a06_@2.png',
      },
      {
        name: 'Almond Milk',
        packageSize: '1 L',
        price: 2.99,
        salePrice: 2.49,
        productImage: 'https://assets.shop.loblaws.ca/products/20070132001/b2/en/front/20070132001_front_a06_@2.png',
      },
      {
        name: 'Organic Spinach',
        packageSize: '300 g',
        price: 4.99,
        salePrice: 3.99,
        productImage: 'https://assets.shop.loblaws.ca/products/20080137001/b2/en/front/20080137001_front_a06_@2.png',
      },
      {
        name: 'Free Range Eggs',
        packageSize: '12 pcs',
        price: 6.49,
        salePrice: 5.49,
        productImage: 'https://assets.shop.loblaws.ca/products/20425775001/b2/en/front/20425775001_front_a06_@2.png',
      },
  ],
};

const cardDuration = 90;
const openingDuration = 45;
const cardSectLength = dealsData.deals.length * cardDuration

export const WowzaDealVideo: React.FC = () => {
  return (
    <>
      <Sequence durationInFrames={openingDuration}>
        <LogoAnimation />
      </Sequence>
      <Sequence from={openingDuration-20} durationInFrames={65}> {/* Adjust duration as needed */}
        <AnimatedText text="WOWZA!" duration={50} />
      </Sequence>
      {
        dealsData.deals.map((deal, index) => (
          <Sequence key={index} from={openingDuration + 45 + index * cardDuration} durationInFrames={cardDuration} name="wowzaCard">
            <WowzaCard price={deal.price} index={index} duration={cardDuration}/>
          </Sequence>
        ))
      }
      <Sequence from={openingDuration + 45} durationInFrames={cardSectLength +60} name="icons">
        <FallingIcons icons={[icon, icon, icon, icon, icon,icon, icon, icon, icon, icon,  icon, icon]} startFrame={openingDuration + 60} />
      </Sequence>
      <Sequence from={openingDuration + 45} durationInFrames={cardSectLength} name="dealList">
        <AnimatedDealList deals={dealsData.deals} duration={cardDuration} />
      </Sequence>
      <Sequence from={openingDuration + 45 + cardSectLength} durationInFrames={60} name='WowzaVertical'>
        <WowzaVerticalText text="WOWZA!" duration={60}/>
      </Sequence>
      <Sequence from={openingDuration + 45 + cardSectLength + 60} durationInFrames={110} name='Ending'>
        <EndingAnimation />
      </Sequence>
    </>
  );
};