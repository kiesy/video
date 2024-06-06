import React, { useEffect, useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';



export const RadialGrow: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  // Delay the start by 15 frames

  const size = interpolate(
    frame,
    [0, durationInFrames / 8],
    [0, Math.sqrt(width ** 2 + height ** 2)], // Expand to cover the entire screen
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );



  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: '#124559',
        
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: -2
      }}
    />
  );
};
