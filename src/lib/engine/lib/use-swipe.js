import { useEffect, useState } from "react";

export default function useSwipe() {

  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchDiff, setTouchDiff] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (ev) => {
    const touch = ev.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY }); // Reset touchEnd to initial touch position
  };

  const handleTouchMove = (ev) => {
    const touch = ev.touches[0];
    setTouchDiff({
      x: touch.clientX - touchStart.x,
      y: touch.clientY - touchStart.y,
    });
  };

  const handleTouchEnd = () => {
    setTouchEnd({ x: 0, y: 0 });
    setTouchDiff({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [touchStart, touchEnd]); // Only run the effect when touchStart or touchEnd change

  return touchDiff;
}
