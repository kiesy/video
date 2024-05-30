import { useCurrentFrame, interpolate, Img } from 'remotion';
import React from 'react';
import logo from '../public/logo-food-basics.svg'; // Adjust the path as necessary

export const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  
  const scale = interpolate(
    frame,
    [0, 15, 25, 40],
    [1, 1 , 1.3, 0.0],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'green'
    }}>
      <Img
        src={logo}
        style={{
          transform: `scale(${scale})`,
          width:'50%',
          height: 'auto',
          zIndex:3
        }}
      />
    </div>
  );
};
