import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  onComplete?: () => void;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, onComplete, speed = 35})=> {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);
  
  return <span>{displayedText.replace(/undefined$/, '')}</span>
};

export default TypewriterText;