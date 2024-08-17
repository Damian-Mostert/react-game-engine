"use client";

import { useEffect, useState } from "react";

export default function useFramerate(fps, paused) {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (paused) return;

    // Using a functional update to ensure state is updated correctly
    const intervalId = setInterval(() => {
      setState((prevState) => prevState + 1);
    }, 1000 / fps);

    // Clear the interval on cleanup
    return () => clearInterval(intervalId);
  }, [fps, paused]); // Adding fps as a dependency

  return state;
}
