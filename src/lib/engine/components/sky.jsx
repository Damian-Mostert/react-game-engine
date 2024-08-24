import React, { useState, useEffect } from 'react';

const dayNightCycle = {
  dawn: { start: 6, end: 8 },
  day: { start: 8, end: 18 },
  night: { start: 18, end: 6 }
};

// Constants for simulation
const FULL_DAY_MINUTES = 0.1; // Full day duration in minutes
const SECONDS_PER_DAY = FULL_DAY_MINUTES * 60; // Total seconds per day

const getRandomPosition = () => ({
  top: `${Math.random() * 100}vh`,
  left: `${Math.random() * 100}vw`,
  transform: `translate(-50%, -50%)`,
});

const generateClouds = (numClouds) => {
  return Array.from({ length: numClouds }, (_, index) => ({
    id: index,
    style: getRandomPosition()
  }));
};

const calculatePosition = (time, duration) => {
  const percentage = (time % duration) / duration;
  return percentage * 100; // Position as a percentage
};

export default function Sky() {
  const [simulatedTime, setSimulatedTime] = useState(0); // Simulated time in seconds
  const [clouds, setClouds] = useState(generateClouds(5)); // Generate 5 clouds

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setSimulatedTime((prevTime) => (prevTime + 1) % SECONDS_PER_DAY); // Increment simulated time and loop back to 0 after a full day
      setClouds(generateClouds(5)); // Regenerate clouds every interval
    }, 1000); // Update every second

    return () => clearInterval(updateInterval);
  }, []);

  const hours = Math.floor((simulatedTime / SECONDS_PER_DAY) * 24); // Convert simulated time to hours

  let backgroundColor = '#000';
  let cloudStyle = { opacity: 0.3 };
  let sunPosition = '100%'; // Default to the end of the sky
  let moonPosition = '100%'; // Default to the end of the sky

  if (hours >= dayNightCycle.dawn.start && hours < dayNightCycle.dawn.end) {
    backgroundColor = '#FFDDC1'; // Dawn colors
    cloudStyle = { opacity: 0.5 };
    sunPosition = `${calculatePosition(simulatedTime, SECONDS_PER_DAY / 2)}%`; // Move sun across half the sky
  } else if (hours >= dayNightCycle.day.start && hours < dayNightCycle.day.end) {
    backgroundColor = '#87CEEB'; // Day colors
    cloudStyle = { opacity: 0.5 };
    sunPosition = `${calculatePosition(simulatedTime, SECONDS_PER_DAY)}%`; // Move sun across the full sky
  } else if (hours >= dayNightCycle.night.start || hours < dayNightCycle.night.end) {
    backgroundColor = '#2C3E50'; // Night colors
    cloudStyle = { opacity: 0.8 };
    moonPosition = `${calculatePosition(simulatedTime, SECONDS_PER_DAY)}%`; // Move moon across the full sky
  }

  return (
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh',
      backgroundColor,
      overflow: 'hidden',
    }}>
      {clouds.map(cloud => (
        <div
          key={cloud.id}
          style={{
            position: 'absolute',
            width: '100px',
            height: '60px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 5s',
            ...cloud.style,
            opacity: cloudStyle.opacity
          }}
        >
          {/* Additional cloud shapes */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '70px',
            backgroundColor: 'inherit',
            transition: 'all 5s',
            top: '-30%',
            left: '-20%',
          }} />
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '60px',
            backgroundColor: 'inherit',
            transition: 'all 5s',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
          }} />
        </div>
      ))}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: sunPosition,
        width: '100px',
        height: '100px',
        backgroundColor: '#FFD700',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(255, 215, 0, 0.7)',
        transform: 'translate(-50%, -50%)',
        display: hours >= dayNightCycle.day.start && hours < dayNightCycle.day.end ? 'block' : 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '10%',
        left: moonPosition,
        width: '80px',
        height: '80px',
        backgroundColor: '#FFF',
        borderRadius: '50%',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.7)',
        transform: 'translate(-50%, -50%)',
        display: hours >= dayNightCycle.night.start || hours < dayNightCycle.night.end ? 'block' : 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#FFF'
      }}>
        {hours >= dayNightCycle.dawn.start && hours < dayNightCycle.dawn.end && 'Dawn'}
        {hours >= dayNightCycle.day.start && hours < dayNightCycle.day.end && 'Day'}
        {(hours >= dayNightCycle.night.start || hours < dayNightCycle.night.end) && 'Night'}
      </div>
    </div>
  );
}
