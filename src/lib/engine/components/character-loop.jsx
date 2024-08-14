import { useEffect, useState } from "react";
import useFramerate from "../lib/use-framerate";
import config from "../config/framerates";
const {sprites:Framerate} = config;

export default function CharacterLoop({ images = [], container = {}, img = {}, left = false }) {

  const framerate = useFramerate(Framerate);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setImageIndex((oldIndex) =>
        oldIndex >= images.length - 1 ? 0 : oldIndex + 1
    );
  }, [framerate]);

  return (
    <div style={{position:"relative",...container}}>
       {images[imageIndex] ? <img
          src={images[imageIndex]}
          alt={"Image not Found"}
          style={{ ...img, position:"absolute",objectFit: "cover",transform:left ? "scaleX(-1)" : ""}}
        />:<>Error !</>} 
    </div>
  );
}