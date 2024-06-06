import { useCurrentFrame, interpolate, Img } from 'remotion';
import React from 'react';
import logo from '../public/cleaned_icon.png'; // Adjust the path as necessary
import { Animated, Fade, Move } from 'remotion-animated';
import MoreText from './MoreText';

export const LogoAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
      }}>
        <Animated animations={[Move({ initialX: 0, x: -250, start: 5, duration: 10 })]} style={{ margin: 'auto', width: '50%' }}>
          <Img
            src={logo}
            style={{
              width: '100%',
              height: 'auto',
              zIndex: 3,
              background: 'white'
            }}
          />
        </Animated>
        <MoreText />
      </div>
      {frame > 30 && (
          <Animated animations={[Move({ initialX: -80, y: 90, start: 30, duration: 10 }), Fade({ to: 1, initial: 0, start: 10, duration: 1 })]} >
          <h1 style={{ position: 'absolute', bottom: 550, fontSize: '48px', background: 'white'}}>
            DEALS
          </h1>
        </Animated>
      )}
      {frame > 20 && (
        <>
          <Animated animations={[Move({ initialX: -80, y: 60, start: 20, duration: 10 }), Fade({ to: 1, initial: 0, start: 10, duration: 1 })]} >
            <h1 style={{ position: 'absolute', bottom: 580, fontSize: '48px', background:'white', paddingTop: '10px'}}>
              WEEKLY
            </h1>
          </Animated>
          <Animated animations={[Move({ initialX: 145, y: 60, start: 20, duration: 10 }), Fade({ to: 1, initial: 0, start: 10, duration: 1 })]} >
            <h1 style={{ position: 'absolute', bottom: 580, fontSize: '48px', background: 'white' }}>
              GROCERY
            </h1>
          </Animated>
        </>
      )}

    </div>
  );
};