"use client";

import { useEffect, useState } from "react";

export default function useFramerate(fps,paused) {
  var [state, setState] = useState(0);
  
  useEffect(() => {
    if(paused)return;
    const i = setInterval(() => {
      setState(state++);
    }, 1000 / fps);
    return ()=>{clearInterval(i)};
  }, [paused]);

  return state;
}
