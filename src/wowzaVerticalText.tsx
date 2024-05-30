import React, { useEffect, useRef, useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import './opening/animatedText.css';
import icon from '../public/dollar-circle.svg';
import { MovingIcons } from './DealFlow/movingIcons';

interface AnimatedTextProps {
  text: string;
}

export const WowzaVerticalText: React.FC<AnimatedTextProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [letterWidths, setLetterWidths] = useState<number[]>([]);
  const topPosition: Record<number, number> = {
    0: 100,
    1: 20,
    2: -20,
    3: 0,
    4: -20,
    5: -200,
    // Add more positions as needed
  };
  const leftPosition: Record<number, number> = {
    0: -140,
    1: 30,
    2: -70,
    3: -90,
    4: -20,
    5: 90,
    // Add more positions as needed
  };
  const rotation: Record<number, number> = {
    0: -8,
    1: 0,
    2: 0,
    3: -12,
    4: 11,
    5: 0,
    // Add more positions as needed
  };

  useEffect(() => {
    const widths = letterRefs.current.map((ref) => ref?.offsetWidth || 0);
    setLetterWidths(widths);
  }, [text]);

  const getTransformStyles = (index: number) => {
    const letterFrame = Math.max(0, frame - index * 2);
    const opacity = interpolate(letterFrame, [0, 10], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Adjust the scale incrementally based on the index
    const scaleIncrement = 1 + index * 0.1;

    const scale = interpolate(letterFrame, [0, 5, 10], [0, 3, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }) * scaleIncrement;

    const verticalOffset = (index % 2 === 0 ? 1 : -1) * 10;
    const rotationValue = rotation[index] || 0;
    const margin = letterWidths[index] ? letterWidths[index] * 0.1 : 0;

    const top = topPosition[index] || 0;
    const left = leftPosition[index] || 0;

    return {
      transform: `scale(${scale}) rotate(${rotationValue}deg) translate(${left}px, ${top}px) translateY(${verticalOffset}px)`,
      opacity,
      marginLeft: index === 0 ? '0' : `${margin}px`,
    };
  };

  return (
    <div
      className="animated-text-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        perspective: '1000px',
      }}
    >

      <div
        className="animated-text"
        style={{
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {text.split('').map((letter, index) => (
          <span
            key={index}
            ref={(el) => {
              letterRefs.current[index] = el;
            }}
            style={getTransformStyles(index)}
            className="letter-3d"
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};
