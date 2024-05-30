import { AbsoluteFill, Composition } from "remotion";
import { ParentObjectType } from './schema';
import { WowzaDealVideo } from "./wowzaDealVideo";
// Each <Composition> is an entry in the sidebar!

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

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <AbsoluteFill>
    <Composition 
        id="Opening"
        component={WowzaDealVideo}
        durationInFrames={50 + dealsData.deals.length * 90 + 150+90}
        fps={30}
        width={1080}
        height={1350}
      />
    </AbsoluteFill>


    </>
  );
};
