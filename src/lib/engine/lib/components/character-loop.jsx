import { useEffect, useState } from "react";
import useFramerate from "../use-framerate";

export default function CharacterLoop({ images, container, img }) {
  const framerate = useFramerate(6);

  const [imageIndex, setImageIndex] = useState(0);

  // Preload images and cache them
  useEffect(() => {
    images.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl; // This loads the image and caches it
    });
  }, [images]); // Only runs once when the component mounts or when `images` changes

  // Update the image index based on the framerate
  useEffect(() => {
    setImageIndex((oldIndex) =>
        oldIndex >= images.length - 1 ? 0 : oldIndex + 1
    );
  }, [framerate]);

  return (
    <div style={{position:"relative",...container}}>
       {images[imageIndex] ? <img
          src={images[imageIndex]}
          style={{ ...img, position:"absolute", objectFit: "cover" }}
        />:<></>} 
    </div>
  );
}
