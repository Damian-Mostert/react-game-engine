import React, { useState, useEffect } from 'react';

const dayNightCycle = {
  dawn: { start: 6, end: 8 },
  day: { start: 8, end: 18 },
  night: { start: 18, end: 6 }
};

// Constants for simulation
const FULL_DAY_MINUTES = 10; // Full day duration in minutes
const SECONDS_PER_DAY = FULL_DAY_MINUTES * 60; // Total seconds per day
const NUM_STARS = 100; // Number of stars in the sky
const CLOUD_SPEED = 20; // Speed at which clouds move across the screen in seconds
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
  backgroundColor: getRandomHexColor(),
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

const calculatePosition = (time, duration) => {
  const percentage = (time % duration) / duration;
  return percentage * 100; // Position as a percentage
};

export default function Sky() {
  const [simulatedTime, setSimulatedTime] = useState(0); // Simulated time in seconds
  const [clouds, setClouds] = useState(generateClouds(10)); // Generate 5 clouds
  const [stars, setStars] = useState(generateStars(NUM_STARS)); // Generate stars
  const [startOfDay, setStartOfDay] = useState(true); // Track start of the day

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setSimulatedTime((prevTime) => {
        const newTime = (prevTime + 1) % SECONDS_PER_DAY;
        if (newTime === 0) {
          setStartOfDay(true); // Indicate the start of a new day
          setClouds(generateClouds(10)); // Regenerate clouds
          setStars(generateStars(NUM_STARS)); // Regenerate stars
        } else {
          setStartOfDay(false); // Not the start of the day
        }
        return newTime;
      });
    }, 1000); // Update every second

    return () => clearInterval(updateInterval);
  }, []);

  const hours = Math.floor((simulatedTime / SECONDS_PER_DAY) * 24); // Convert simulated time to hours

  let backgroundColor = '#000';
  let cloudStyle = { opacity: 0.3 };
  let sunStyle = { display: 'none' }; // Default sun style
  let moonStyle = { display: 'none' }; // Default moon style
  let sunPosition = `${calculatePosition(simulatedTime, SECONDS_PER_DAY)}%`; // Sun moves across the full sky
  let moonPosition = `${calculatePosition(simulatedTime, SECONDS_PER_DAY)}%`; // Moon moves across the full sky

  if (hours >= dayNightCycle.dawn.start && hours < dayNightCycle.dawn.end) {
    backgroundColor = 'linear-gradient(180deg, #8c6623,#6A0D91)'; // Purple gradient for dawn
    cloudStyle = { opacity: 0.5 };
    sunStyle = {
      position: 'absolute',
      top: '10%',
      left: sunPosition,
      width: '100px',
      height: '100px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
      transform: 'translate(-50%, -50%)',
      display: 'block',
    };
  } else if (hours >= dayNightCycle.day.start && hours < dayNightCycle.day.end) {
    backgroundColor = 'linear-gradient(180deg, black, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB, #87CEEB)'; // Day colors
    cloudStyle = { opacity: 0.5 };
    sunStyle = {
      position: 'absolute',
      top: '10%',
      left: sunPosition,
      width: '100px',
      height: '100px',
      backgroundColor: '#FFD700',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
      transform: 'translate(-50%, -50%)',
      display: 'block',
    };
  } else if (hours >= dayNightCycle.night.start || hours < dayNightCycle.night.end) {
    backgroundColor = 'black'; // Night colors
    cloudStyle = { opacity: 0.8 };
    moonStyle = {
      position: 'absolute',
      top: '10%',
      left: moonPosition,
      width: '80px',
      height: '80px',
      backgroundColor: '#FFF',
      borderRadius: '50%',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
      transform: 'translate(-50%, -50%)',
      display: 'block',
    };
  }

  return (
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      background: backgroundColor,
      transition: "all 60s",
      overflow: 'hidden',
      zIndex: 0
    }}>

      {hours >= dayNightCycle.night.start || hours < dayNightCycle.night.end ? (
        stars.map(star => (
          <div
            key={star.id}
            style={{
              ...star.style,
              opacity: 0.8, // Stars should always be visible at night
              animation: 'twinkle 0.5s infinite', // Add twinkling effect
            }}
          />
        ))
      ) : null}
      <div style={sunStyle} />
      <div style={moonStyle} />
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          style={{
            position: 'absolute',
            width: '100px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            ...cloud.style,
            opacity: cloudStyle.opacity,
            animation: `moveClouds ${CLOUD_SPEED}s linear infinite`, // Cloud animation
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
      `}</style>
    </div>
  );
}
