export const createSlope = (
    top,
    left,
    length,
    height,
    reverse,
    orientation,
    texture
  ) => {
    if (orientation === "horizontal") {
      if (reverse) {
        return Array.from({ length: length }).map((_, i) => {
          return {
            top: top,
            left: left - i,
            width: 1,
            height: height - i,
            texture,
          };
        });
      }
      return Array.from({ length: length }).map((_, i) => {
        return {
          top: top,
          left: left + i,
          width: 1,
          height: height - i,
          texture,
        };
      });
    } else if (orientation === "vertical") {
      if (reverse) {
        return Array.from({ length: height }).map((_, i) => {
          return {
            top: top + i,
            left: left,
            width: length - i,
            height: 1,
            texture,
          };
        });
      }
      return Array.from({ length: height }).map((_, i) => {
        return {
          top: top - i,
          left: left,
          width: length - i,
          height: 1,
          texture,
        };
      });
    }
};
export const createQuarterCircle = (
    top,
    left,
    radius,
    reverse,
    orientation,
    texture
  ) => {
    const segments = [];
    const step = 1; // Step size for iteration
  
    if (orientation === "horizontal") {
      for (let i = 0; i <= radius; i += step) {
        const height = Math.sqrt(radius * radius - i * i);
        segments.push({
          top: reverse ? top + Math.floor(height) : top - Math.floor(height),
          left: left + i,
          width: 1,
          height: Math.floor(height),
          texture,
        });
      }
    } else if (orientation === "vertical") {
      for (let i = 0; i <= radius; i += step) {
        const width = Math.sqrt(radius * radius - i * i);
        segments.push({
          top: top + i,
          left: reverse ? left + Math.floor(width) : left - Math.floor(width),
          width: Math.floor(width),
          height: 1,
          texture,
        });
      }
    }
  
    return segments;
};
  