import React, { useEffect, useRef, useState } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, random } from 'remotion';
import './opening/animatedText.css';
import { RadialGrow } from './opening/radialGrow';
import icon from '../public/dollar-circle.svg';
import { MovingIcons } from './DealFlow/movingIcons';
import { Animated, Move } from 'remotion-animated'

interface AnimatedTextProps {
  text: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [letterWidths, setLetterWidths] = useState<number[]>([]);
  const [isRadialGrown, setIsRadialGrown] = useState<boolean>(false);

  useEffect(() => {
    const widths = letterRefs.current.map((ref) => ref?.offsetWidth || 0);
    setLetterWidths(widths);
  }, [text]);

  const getRandomRotation = (index: number) => {
    return random(`rotation-${index}`) * 30 - 30;
  };

  useEffect(() => {
    const radialGrowDuration = durationInFrames / 8;
    if (frame >= radialGrowDuration + 15) {
      setIsRadialGrown(true);
    }
  }, [frame, durationInFrames]);

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
      <RadialGrow />
      {isRadialGrown && (
        <MovingIcons
          startFrame={Math.floor(durationInFrames / 8) + 15}
          icons={[icon, icon, icon, icon, icon]}
        />
      )}
      <Animated animations={[Move({y: 700, start: 55, duration: 10})]}>
      <div
        className="animated-text"
        style={{
          position: 'relative',
          zIndex: 1,
          transformStyle: 'preserve-3d',
        }}
      >
        {text.split(' ').map((word, wordIndex) => (
          <React.Fragment key={wordIndex}>
            {word.split('').map((letter, letterIndex) => {
              const letterFrame = Math.max(0, frame - (wordIndex * 10 + letterIndex));
              const opacity = interpolate(letterFrame, [0, 7], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              const scale = interpolate(
                letterFrame,
                [0, 7, durationInFrames - 43],
                [1, 3, 1],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }
              );

              const verticalOffset = wordIndex === 0 ? (letterIndex % 2 === 0 ? 1 : -1) * 10 :(letterIndex % 2 === 0 ? 1 : -1) * 10 +200 ;
              const rotation = getRandomRotation(letterIndex);
              const margin = letterWidths[wordIndex * 10 + letterIndex] ? letterWidths[wordIndex * 10 + letterIndex] * 0.1 : 0;

              return (
                <span
                  ref={(el) => {
                    letterRefs.current[wordIndex * 10 + letterIndex] = el;
                  }}
                  style={{
                    display: 'inline-block',
                    transform: `scale(${scale}) translateY(${verticalOffset}px) rotate(${rotation}deg)`,
                    opacity,
                    marginLeft: letterIndex === 0 ? '0' : `${margin}px`,
                  }}
                  className="letter-3d"
                >
                  {letter}
                </span>
              );
            })}
        {/* Add a space after each word */}
          </React.Fragment>
        ))}
      </div>
      </Animated>
    </div>
  );
};
