import React from 'react';
import { useCurrentFrame } from 'remotion';

const MoreText: React.FC = () => {
  const frame = useCurrentFrame();
  let text = '';
  let textENding = '';
  const startFrameForTyping = 10;
  const startFrameForDeleting = startFrameForTyping + 10;


  if (frame >= startFrameForTyping && frame < startFrameForDeleting) {
    const typingProgress = Math.floor(((frame - startFrameForTyping) / (startFrameForDeleting - startFrameForTyping)) * 7);
    text = 'Leveled'.slice(0, typingProgress);
  } else if (frame >= startFrameForDeleting) {
    text = 'Leveled'
  } else {
    text = ''
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 550,
        left: 450,
        fontSize: '128px',
        fontFamily: 'Arial',
        fontWeight: '800',
        color: '#124559',
        paddingRight: 400,
        backgroundColor: 'white',

        paddingBottom: '15px',
 
      }}
    >
      {text}
    </div>
  );
};

export default MoreText;