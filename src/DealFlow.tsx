// AnimatedDealList.tsx
import React from 'react';
import AnimatedDealCard from './DealFlow/animatedDealCard';

interface AnimatedDealListProps {
  deals: Array<{
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  }>;
  duration: number;
// Duration for each card to be shown
}

const AnimatedDealList: React.FC<AnimatedDealListProps> = ({ deals, duration }) => {
  return (
    <div style={{...styles.container}}>
      {deals.map((deal, index) => (
        <>
          <AnimatedDealCard key={index} deal={deal} index={index} duration={duration}  />
        </>

      ))}

    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',

  },
};

export default AnimatedDealList;
