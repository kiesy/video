import React from 'react';
import { Img, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import icon from '../../public/red-dollar-circle.svg'

interface CardProps {
  price: number;
  index: number;
  duration: number;
}


const WowzaCard: React.FC<CardProps> = ({ price, index, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const splitNumbers = price.toString().split('.');

  const startFrame = 0;
  const endFrame = startFrame + duration;

  const text = 'WOWZA!'
  const flipEnd = endFrame; // End the flip at the duration

  const getRotation = (index: number) => {
     // Random rotation between -30 and 30 degrees
     const mapRotationKey: { [key: number]: number } = {
      0: -7,
      1: 0,
      2: 0,
      3: -5,
      4: 6,
      5: 0,
    };
    return mapRotationKey[index];

  };
  

 // End the flip-in at the beginning

  const progress = interpolate(
    frame,
    [startFrame, 10, flipEnd-10, flipEnd],
    [180, 0, 0, 180]
  );

  const opacity = interpolate(
    frame,
    [startFrame, 10, flipEnd-10, flipEnd],
    [0, 1, 1, 0]
  );

  const transform = `rotateY(${progress}deg)`;
  const transformStyle = {
    transform,
    opacity,
  };

  return (
    <div style={{ ...styles.container, ...transformStyle }}>
      <div style={styles.card}>
        <Img
          src={icon}
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%) scale(2)',
            zIndex: 1, // Ensure image has lower z-index
          }}
        />
        <div
          style={{
            backgroundColor: 'red',
            top: '20px',
            color: 'yellow',
            position: 'absolute', // Position absolute to overlay
            left: '50%',
            paddingLeft: 10,
            paddingRight: 10,
            transform: 'translateX(-50%)',
            zIndex: 5, // Ensure this div has higher z-index
          }}
        >
          <div
            style={{
              display: 'flex',

              padding: 0,

            }}
          >
              {text.split('').map((char: string, index: number) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                transform: `rotate(${getRotation(index)}deg)`,
                fontWeight: 800,
                fontFamily: 'Arial',
                fontSize: '4em'
              }}
            >
              {char}
            </span>
          ))}
          </div>
        </div>
        <div style={styles.priceContainer}>
          
            <h1
              style={{
                fontSize: '14em',
                fontWeight: 800,
                fontFamily: 'Arial',
                paddingBottom: '0',
                margin: 0,
                lineHeight: 0.9
   // Ensure there's no extra margin at the bottom
              }}
            >{splitNumbers[0]}</h1>

          <div style={styles.priceSection}>
            <h1 style={{ margin: 0, fontSize: '7em',   fontWeight: 800, lineHeight: 1.1,
                fontFamily: 'Arial', }}>
              {splitNumbers[1]}
            </h1>
            <h3
              style={{
                fontSize: '1.5em',
                marginTop: -29,
                margin: 0,
                fontWeight: 800,
                fontFamily: 'Arial',
              }}
            >
              EACH
            </h3>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    bottom: 50, 
    right:50,
    display: 'flex',
    width: '500px',
    height: '500px',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    zIndex: 5
  },
  card: {
    padding: '20px',
    background: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',  // Justify content to the end
    alignItems: 'center',  // Center align all content horizontally
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8)',
    width: '375px',
    height: '375px',
    position: 'relative',
    border: '8px solid red'  // Add a red border
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'center',  // Center the container horizontally
    alignItems: 'flex-start',  // Align items to the end
    width: '100%',
    height: '60%', // Ensure container takes full height
    position: 'absolute',
    bottom: '20px', // Push the container to the very bottom with some padding
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'column',
    positon: 'relative',
    alignItems: 'start',
    justifyContent: 'flex-end',
    top: -10,
    left: 20,
    margin: 0,

  }
};

export default WowzaCard;
