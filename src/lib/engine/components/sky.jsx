import React, { useState, useEffect } from 'react';

const NUM_STARS = 100; // Number of stars in the sky
const CLOUD_SPEED = 20; // Speed at which clouds move across the screen in seconds
const SUN_ANIMATION_DURATION = 10; // Duration of sun animation in seconds
const MOON_ANIMATION_DURATION = 10; // Duration of moon animation in seconds

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

const getRandomPosition = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
  transform: `translate(-50%, -50%)`,
});

const getRandomStarStyle = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
  width: `${Math.random() * 3 + 1}px`, // Random width between 1px and 4px
  height: `${Math.random() * 3 + 1}px`, // Random height between 1px and 4px
  backgroundColor: 'white',
  borderRadius: '50%',
  position: 'absolute',
  opacity: Math.random() * 0.8 + 0.2, // Random opacity between 0.2 and 1
});

const generateClouds = (numClouds) => {
  return Array.from({ length: numClouds }, (_, index) => ({
    id: index,
    style: getRandomPosition()
  }));
};

const generateStars = (numStars) => {
  return Array.from({ length: numStars }, (_, index) => ({
    id: index,
    style: getRandomStarStyle()
  }));
};

export default function Sky({ day, night, dawn }) {
  const [clouds, setClouds] = useState(generateClouds(10)); // Generate 10 clouds
  const [stars, setStars] = useState(generateStars(NUM_STARS)); // Generate stars

  useEffect(() => {
    // Regenerate clouds and stars at the start of the day
    setClouds(generateClouds(10));
    setStars(generateStars(NUM_STARS));
  }, [day, night, dawn]);

  let backgroundColor = '#000';
  let cloudStyle = { opacity: 0.3 };
  let sunStyle = { display: 'none' }; // Default sun style
  let moonStyle = { display: 'none', opacity: 0.3 }; // Default moon style

  if (dawn) {
    backgroundColor = '#6A0D91';
    sunStyle = {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '100px',
      height: '100px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
      transform: 'translate(-50%, -50%)',
      animation: `moveSun ${SUN_ANIMATION_DURATION}s linear infinite`,
      display: 'block',
    };
  } else if (day) {
    backgroundColor = '#87CEEB'; // Day colors
    sunStyle = {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '100px',
      height: '100px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
      transform: 'translate(-50%, -50%)',
      animation: `moveSun ${SUN_ANIMATION_DURATION}s linear infinite`,
      display: 'block',
    };
    moonStyle = {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80px',
      height: '80px',
      backgroundColor: '#FFF',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
      transform: 'translate(-50%, -50%)',
      animation: `moveMoon ${MOON_ANIMATION_DURATION}s linear infinite`,
      display: 'block',
      opacity: 0.3, // Darker moon during the day
    };
  } else if (night) {
    backgroundColor = 'black';
    moonStyle = {
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80px',
      height: '80px',
      backgroundColor: '#FFF',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
      transform: 'translate(-50%, -50%)',
      animation: `moveMoon ${MOON_ANIMATION_DURATION}s linear infinite`,
      display: 'block',
    };
  }

  return (
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      background: backgroundColor,
      transition: "all 1s",
      overflow: 'hidden',
      zIndex: 0
    }}>

      {dawn || night ? (
        <div style={{opacity: dawn ? 0.5 : 1}}>
          {stars.map(star => (
            <div
              key={star.id}
              style={{
                ...star.style,
                opacity: dawn ? 0.2 : 0.5, // Stars should always be visible at night
                animation: 'twinkle 0.5s infinite', // Add twinkling effect
              }}
            />
          ))}
        </div>
      ) : null}
      <div style={sunStyle} />
      <div style={moonStyle} />
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          style={{
            animation: `moveClouds ${CLOUD_SPEED}s linear infinite`, // Cloud animation
            position: 'absolute',
            width: '300px',
            height: '40px',
            backgroundColor: '#fff',
            ...cloud.style,
            opacity: cloudStyle.opacity,
          }}
        >
          {/* Additional cloud shapes */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '70px',
            backgroundColor: 'inherit',
            top: '-30%',
            left: '-20%',
          }} />
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '60px',
            backgroundColor: 'inherit',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }} />
        </div>
      ))}
      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes moveClouds {
          0% { left: -100px; }
          100% { left: 100vw; }
        }
        @keyframes moveSun {
          0% { top: 10%; left: 10%; }
          50% { top: 10%; left: 50%; }
          100% { top: 10%; left: 90%; }
        }
        @keyframes moveMoon {
          0% { top: 20%; left: 10%; }
          50% { top: 10%; left: 50%; }
          100% { top: 20%; left: 90%; }
        }
      `}</style>
    </div>
  );
}
