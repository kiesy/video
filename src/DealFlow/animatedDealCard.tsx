import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import DealCard from './saleProduct';

interface AnimatedDealCardProps {
  deal1: {
    brand?: string | null; 
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  };
  deal2: {
    brand?: string | null; 
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  };
  index: number;
  duration: number;
}

const AnimatedDealCard: React.FC<AnimatedDealCardProps> = ({ deal1, deal2, index, duration }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  
  const entrance1 = spring({
    frame: frame - index * duration,
    fps,
    from: -height,
    to: 100,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  const entrance2 = spring({
    frame: frame - index * duration,
    fps,
    from: -height,
    to: 700, // Adjust this value to change the vertical offset of the second deal
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  const exit1 = spring({
    frame: frame - index * duration - (duration - fps) - 15,
    fps,
    from: 100,
    to: height + 20,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  const exit2 = spring({
    frame: frame - index * duration - (duration - fps) - 15,
    fps,
    from: 700,
    to: height + 300, // Adjust this value to maintain the vertical offset during exit
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  const translateY1 = frame >= index * duration + (duration - fps) ? exit1 : entrance1;
  const translateY2 = frame >= index * duration + (duration - fps) ? exit2 : entrance2;

  return (
    <>
      <div style={{ transform: `translateY(${translateY1}px)`, position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <DealCard deal={deal1} frame={frame - index * duration} />
      </div>
      <div style={{ transform: `translateY(${translateY2}px)`, position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <DealCard deal={deal2} frame={frame - index * duration} />
      </div>
    </>
  );
};

export default AnimatedDealCard;
