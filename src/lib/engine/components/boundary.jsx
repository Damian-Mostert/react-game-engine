import React from 'react';

export default function Boundary({
  top,
  left,
  width,
  height,
  texture,
  align,
  textures,
  blockSize,
  message,
  darkness = 50
}) {
  // Ensure darkness is a value between 0 and 1
  const shadowIntensity = Math.min(Math.max(darkness / 100, 0), 1);

  // Calculate shadow offset and blur
  const shadowOffsetY = height * blockSize * shadowIntensity;
  const shadowBlur = height * blockSize * shadowIntensity;

  return (
    <div
      style={{
        transform: align === "right" ? "scaleX(-1)" : "",
        position: "absolute",
        width: `${width * blockSize}px`,
        height: `${height * blockSize}px`,
        top: `${top * blockSize}px`,
        left: `${left * blockSize}px`,
        backgroundImage: `url(${textures[texture]})`,
        backgroundSize: `${blockSize}px ${blockSize}px`,
        backgroundRepeat: "repeat",
        boxShadow: `0px ${shadowOffsetY}px ${shadowBlur}px rgba(0, 0, 0, ${shadowIntensity})`,
        zIndex: 1 // Ensure it is above other elements
      }}
    >
      {message && (
        <div style={{ position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)", color: "#FFA500" }}>
          {message}
        </div>
      )}
    </div>
  );
}
