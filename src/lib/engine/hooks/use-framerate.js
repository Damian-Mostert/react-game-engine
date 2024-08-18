"use client";

import { useEffect, useState } from "react";

export default function useFramerate(fps, paused) {
  const [state, setState] = useState(0);

  useEffect(() => {
    if (paused) return;
    const intervalId = setInterval(() => {
      setState((prevState) => prevState + 1);
    }, 1000 / fps);

    return () => clearInterval(intervalId);
  }, [fps, paused]);

  return state;
}
