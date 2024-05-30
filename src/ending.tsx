import { useCurrentFrame, Img } from 'remotion';
import React from 'react';
import logo from '../public/logo-food-basics.svg'; // Adjust the path as necessary
import { Animated, Move } from 'remotion-animated';
import MoreText from './MoreText';

export const EndingAnimation: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: 'green',
      position: 'relative'
    }}>
      <Animated in={0} animations={[Move({x: -200, start:20, duration: 10 })]} style={{width: '50%', backgroundColor:'green', zIndex: 3, position:'absolute'}}>
      <Img
        src={logo}
        style={{
          width:'100%',
          height: 'auto',
          zIndex:3
        }}
      />
      </Animated>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
      <Animated animations={[Move({x: 450, start: 20, initialY: -785, initialX:250, duration:10})]} style={{ position: 'relative', }}>
          <h1 style={{ fontSize: '5em', position: 'absolute', top:600, right: 325, fontFamily:'Arial', color:'white' }}>Always</h1>
          <div>
        <MoreText startFrame={frame} />
        <div style={{display: 'flex', position: 'absolute', top: 735, left: -600, zIndex: 0}}>
          <Animated animations={[Move({start:55, y:55, duration: 10})]}>
            <h2 style={{...styles.lessText, marginRight: 20 }}>
                  FOR
              </h2>
          </Animated>
        <Animated animations={[Move({start:60, y:55, duration: 10})]}>
          <h2 style={styles.lessText}>
            LESS
          </h2>
        </Animated> 

        </div>

      </div>
      </Animated>


      </div>
    </div>
  );
};

const styles = {
  lessText: {
    fontSize: '3em',
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 800
  }
}