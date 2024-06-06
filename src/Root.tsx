import { AbsoluteFill, Composition } from "remotion";
import { WowzaDealVideo } from "./wowzaDealVideo";
import { FullDealSchema } from "./schema";
// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
    <AbsoluteFill>
    <Composition 
        id="Opening"
        component={WowzaDealVideo}
        durationInFrames={1800}
        fps={60}
        width={1080}
        height={1350}
        schema={FullDealSchema}
        defaultProps={{
          dealsData: [
            {
              name: "Product 1",
              packageSize: "Large",
              price: 100,
              salePrice: 80,
              productImage: "https://assets.shop.loblaws.ca/products/21550066/b3/en/front/21550066_front_a06_@2.png",
              brand: null // Optional but can be specified
            },
            // Add more products as needed
          ],
          storeName: 'Zehrs'
        }}
      />
    </AbsoluteFill>


    </>
  );
};
