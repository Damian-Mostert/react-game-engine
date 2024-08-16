import { useEffect, useState } from "react";
import useFramerate from "../lib/use-framerate";
import config from "../config/framerates";
const {sprites:Framerate} = config;

export default function CharacterLoop({ images = [], container = {}, img = {}, left = false,paused,dead }) {
  const framerate = useFramerate(Framerate, paused);

  const [imageIndex, setImageIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    if (completed) return; // If the animation is completed, do nothing
  
    setImageIndex((oldIndex) => {
      if (reverse) {
        if (oldIndex <= 0) {
          setReverse(false);
          if (dead) {
            setCompleted(true); // Mark the animation as completed if dead
            return 0; // Reset index or keep the last frame, based on preference
          }
          return oldIndex + 1;
        } else {
          return oldIndex - 1;
        }
      } else {
        if (oldIndex >= images.length - 1) {
          if (dead) {
            setReverse(true);
            setCompleted(true); // Mark the animation as completed if dead
            return images.length - 1; // Hold on the last frame
          }
          setReverse(true);
          return oldIndex - 1;
        } else {
          return oldIndex + 1;
        }
      }
    });
  }, [framerate, dead, reverse, completed]);

  
  
  return (
    <div style={{position:"relative",...container}}>
       {images[imageIndex] ? <img
          src={images[imageIndex]}
          style={{ ...img, position:"absolute",objectFit: "cover",transform:left ? "scaleX(-1)" : ""}}
        />:<></>} 
    </div>
  );
}
