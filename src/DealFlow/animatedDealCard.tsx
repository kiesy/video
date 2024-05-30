// AnimatedDealCard.tsx
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';
import DealCard from './saleProduct';

interface AnimatedDealCardProps {
  deal: {
    name: string;
    packageSize: string;
    price: number;
    salePrice: number;
    productImage: string;
  };
  index: number;
  duration: number;
}

const AnimatedDealCard: React.FC<AnimatedDealCardProps> = ({ deal, index, duration }) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  
  const entrance = spring({
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

  const exit = spring({
    frame: frame - index * duration - (duration - fps)  -15,
    fps,
    from: 100,
    to: height + 20,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  });

  const translateY = frame >= index * duration + (duration - fps) ? exit : entrance;

  return (
    <div style={{ transform: `translateY(${translateY}px)`, position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center' }}>
      <DealCard deal={deal} frame={frame - index * duration} />
    </div>
  );
};

export default AnimatedDealCard;
