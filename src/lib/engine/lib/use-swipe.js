import { useEffect, useState } from "react";

export default function useSwipe() {
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const handleTouchStart = (ev) => {
    const touch = ev.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setTouchEnd({ x: touch.clientX, y: touch.clientY }); // Reset touchEnd to initial touch position
  };

  const handleTouchMove = (ev) => {
    const touch = ev.touches[0];
    setTouchEnd({ x: touch.clientX, y: touch.clientY });
    handleTouchEnd()
  };

  const handleTouchEnd = () => {
    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        setSwipeDirection("right");
      } else if (deltaX < -50) {
        setSwipeDirection("left");
      }
    } else {
      if (deltaY > 50) {
        setSwipeDirection("down");
      } else if (deltaY < -50) {
        setSwipeDirection("up");
      }
    }
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

  return swipeDirection;
}
