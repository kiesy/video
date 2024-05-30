import React from 'react';
import { useCurrentFrame } from 'remotion';

const MoreText: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  let text = 'M';
  let textENding = '';
  const startAdding = 30;
 // Start adding zeros
  const endAdding = startAdding + 12;
  const StartREAdding = startAdding + 16; 
  const startRemoving = startAdding + 16;
  const endRemoving = startRemoving + 12;

  if (frame >= startAdding && frame < endAdding) {
    const zerosToAdd = Math.floor(((frame - startAdding) / (endAdding - startAdding)) * 5);
    text += 'O'.repeat(zerosToAdd);
  
  }else if (frame >= endAdding && frame <= StartREAdding) {
    if (frame-endAdding <= 2) {
      text += 'O'.repeat(5);
      textENding += 'R'
    } else {
      text += 'O'.repeat(5);
      textENding += 'RE'
    }

  } else if (frame >= startRemoving && frame < endRemoving) {
    textENding += 'RE'
    const zerosToRemove = 5 - Math.floor(((frame - startRemoving) / (endRemoving - startRemoving)) * 5);
    text += 'O'.repeat(zerosToRemove);
  } else if (frame >= endRemoving) {
    text += 'ORE'
  }

  return <div style={{position: 'absolute', top: 750, left:-600,  fontSize: '56px', fontFamily: 'Arial', fontWeight:'800', color:'yellow', paddingRight:400, backgroundColor: 'green', zIndex: 3, }}>{text+textENding}</div>;
};

export default MoreText;
