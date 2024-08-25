import { useEffect, useState } from "react";

// Define day, dawn, and night periods
const dayNightCycle = {
    dawn: { start: 6, end: 8 },
    day: { start: 8, end: 18 },
    night: { start: 18, end: 24 } // Assuming the night wraps around to 0
};

// Constants for simulation
const FULL_DAY_MINUTES = 0.5; // Full day duration in minutes
const SECONDS_PER_DAY = FULL_DAY_MINUTES * 60; // Total seconds per day

export default function useDayNightCycle() {
    const [simulatedTime, setSimulatedTime] = useState(0); // Simulated time in seconds
    const [day, setDay] = useState(false);
    const [dawn, setDawn] = useState(false);
    const [night, setNight] = useState(false);

    useEffect(() => {
        // Update simulated time every second
        const intervalId = setInterval(() => {
            setSimulatedTime(prevTime => (prevTime + 1) % SECONDS_PER_DAY);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Calculate current hour based on simulated time
        const currentHour = (Math.floor((simulatedTime / SECONDS_PER_DAY) * 24) + 24) % 24;

        // Determine the current cycle
        const isDawn = currentHour >= dayNightCycle.dawn.start && currentHour < dayNightCycle.dawn.end;
        const isDay = currentHour >= dayNightCycle.day.start && currentHour < dayNightCycle.day.end;
        const isNight = !isDawn && !isDay;

        setDawn(isDawn);
        setDay(isDay);
        setNight(isNight);
    }, [simulatedTime]);

    return {
        day,
        dawn,
        night
    };
}
