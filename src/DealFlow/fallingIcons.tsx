import React from 'react';
import { Img, useCurrentFrame, useVideoConfig, random } from 'remotion';

interface FallingIconsProps {
  startFrame: number;
  icons: string[];
}

export const FallingIcons: React.FC<FallingIconsProps> = ({ startFrame, icons }) => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  return (
    <div style={style.container}>
      {icons.map((icon, index) => {
        const speed = random(`speed-${index%3}`) * 20 + 5; // Increased speed for faster falling
        const initialLeft = random(`left-${index}`) * (width - 50); // Random initial left position
        const delay = random(`delay-${index}`) * 200; // Random delay for starting
        const scale = random(`scale-${index}`)  + 1.5; // Random scale between 0.5 and 1

        // Calculate the top position, and loop back to the top if the icon goes off the bottom
        const top = ((frame + 90 - startFrame - delay) * speed);
        const left = initialLeft;

        return (
          <Img
            key={index}
            src={icon}
            style={{
              position: 'absolute',
              top: `${top}px`,
              left: `${left}px`,
              width: `${50 * scale}px`, // Adjust the size based on the scale
              height: `${50 * scale}px`,
              transform: `scale(${scale})`,
              transition: 'top 0.5s linear',

            }}
          />
        );
      })}
    </div>
  );
};

const style = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#EE2E35'
  },
}
