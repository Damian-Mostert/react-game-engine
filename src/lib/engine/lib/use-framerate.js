"use client";

import { useEffect, useState } from "react";

export default function useFramerate(fps) {
  var [state, setState] = useState(0);
  
  useEffect(() => {
    const i = setInterval(() => {
      setState(state++);
    }, 1000 / fps);

    return ()=>{clearInterval(i)};
  }, []);

  return state;
}
