import React from 'react';
import { Img, useCurrentFrame, useVideoConfig, random } from 'remotion';

interface MovingIconsProps {
  startFrame: number;
  icons: string[];
}

export const MovingIcons: React.FC<MovingIconsProps> = ({ startFrame, icons }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const easeOutQuad = (t: number) => t * (2 - t); // Quadratic easing out

  return (
    <>
      {icons.map((icon, index) => {
        const dropStartFrame = startFrame + index * 10; // Stagger the start of each icon drop
        const dropProgress = Math.max(0, frame - dropStartFrame);
        const fallSpeed =random(`speed-${index}`); // Different fall speeds
        const progress = dropProgress / (100 / fallSpeed);
        const easedProgress = Math.min(easeOutQuad(progress), 1); 
        const top = Math.min(easedProgress * height, height * 0.8) - 150; // Stop at 60% of the page
        const left = random(`left-${index}`)*2 * width;
        const scale = random(`scale-${index}`) * 4 + 0.5; // Different scales

        return (
          <Img
            key={index}
            src={icon}
            style={{
              position: 'absolute',
              top: `${top}px`,
              left: `${left}px`,
              transform: `scale(${scale})`,
              width: '50px', // Adjust the base size of the icons as needed
              height: '50px',
              transition: 'top 0.5s linear',
            }}
          />
        );
      })}
    </>
  );
};
