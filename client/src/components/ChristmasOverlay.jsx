import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import bellSound from '../assets/christmas-bells.mp3'

const fall = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); }
  100% { transform: translateY(100vh) rotate(360deg); }
`;

const swing = keyframes`
  0%, 100% { transform: rotate(-10deg); }
  50% { transform: rotate(10deg); }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
`;

const Snowflake = styled.div`
  position: absolute;
  color: white;
  font-size: ${props => props.size}px;
  animation: ${fall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
`;

const ChristmasBells = styled.div`
  position: fixed;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  font-size: 24px;
  animation: ${swing} 2s ease-in-out infinite;
  cursor: ${props => props.isDragging ? 'grabbing' : 'grab'};
  pointer-events: auto;
  z-index: 1001;
  user-select: none;
  white-space: nowrap;
`;

const ChristmasOverlay = () => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [position, setPosition] = useState({ x: window.innerWidth - 60, y: 10 });
  const [isDragging, setIsDragging] = useState(false);
  const [audio] = useState(new Audio(bellSound));

  const playBellSound = () => {
    if (!audio.paused) return;
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play().catch(console.log);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    
    let lastX = e.clientX;
    let lastY = e.clientY;
    let rapidMoves = 0;
    let lastMoveTime = Date.now();

    const handleMouseMove = (e) => {
      const x = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - 50));
      const y = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - 30));
      setPosition({ x, y });

      const currentTime = Date.now();
      const deltaX = Math.abs(e.clientX - lastX);
      const deltaY = Math.abs(e.clientY - lastY);
      const timeDiff = currentTime - lastMoveTime;
      
      if (timeDiff < 50 && (deltaX > 15 || deltaY > 15)) {
        rapidMoves++;
        if (rapidMoves >= 5) {
          playBellSound();
          rapidMoves = 0;
        }
      } else if (timeDiff > 200) {
        rapidMoves = 0;
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveTime = currentTime;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 10 + 10,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    symbol: ['❄️', '⭐', '🎄', ][Math.floor(Math.random() * 3)]
  }));

  return (
    <OverlayContainer>
      <ChristmasBells 
        x={position.x} 
        y={position.y} 
        isDragging={isDragging}
        onMouseDown={handleMouseDown}
      >
        🔔🎄
      </ChristmasBells>

      {showAnimation && snowflakes.map(flake => (
        <Snowflake
          key={flake.id}
          left={flake.left}
          size={flake.size}
          duration={flake.duration}
          delay={flake.delay}
        >
          {flake.symbol}
        </Snowflake>
      ))}
    </OverlayContainer>
  );
};


export default ChristmasOverlay;
