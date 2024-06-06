import React from 'react';
import AnimatedDealCard from './DealFlow/animatedDealCard';

interface DealType {
  brand?: string | null; 
  name: string;
  packageSize: string;
  price: number;
  salePrice: number;
  productImage: string;
}

interface AnimatedDealListProps {
  deals: DealType[];
  duration: number; // Duration for each card to be shown
}

const AnimatedDealList: React.FC<AnimatedDealListProps> = ({ deals, duration }) => {

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {deals.map((deal, index) => {
        // Check if the current index is even to pair deals
        if (index % 2 === 0 && index + 1 < deals.length) { // Ensure there's a next item
          const nextDeal = deals[index + 1];
          return (
            <AnimatedDealCard
              key={index}
              deal1={deal}
              deal2={nextDeal}
              index={Math.floor(index / 2)}
              duration={duration}
            />
          );
        }
        return null; // Skip rendering for odd indices and last unpaired index, if any
      })}
    </div>
  );
};

export default AnimatedDealList;