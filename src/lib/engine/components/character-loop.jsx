import { useEffect, useState } from "react";
import useFramerate from "../lib/use-framerate";
import config from "../config/framerates";
const {sprites:Framerate} = config;

export default function CharacterLoop({ images = [], container = {}, img = {}, left = false,paused }) {

  const framerate = useFramerate(Framerate, paused);

  const [imageIndex, setImageIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  
  useEffect(() => {
    setImageIndex((oldIndex) => {
      if (reverse) {
        if (oldIndex <= 0) {
          setReverse(false);
          return oldIndex + 1;
        } else {
          return oldIndex - 1;
        }
      } else {
        if (oldIndex >= images.length - 1) {
          setReverse(true);
          return oldIndex - 1;
        } else {
          return oldIndex + 1;
        }
      }
    });
  }, [framerate]);
  
  
  return (
    <div style={{position:"relative",...container}}>
       {images[imageIndex] ? <img
          src={images[imageIndex]}
          style={{ ...img, position:"absolute",objectFit: "cover",transform:left ? "scaleX(-1)" : ""}}
        />:<></>} 
    </div>
  );
}
