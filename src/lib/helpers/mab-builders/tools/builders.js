export const createSlope = (
    top,
    left,
    length,
    height,
    reverse,
    orientation,
    texture,
    data = {}
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
            ...data
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
          ...data
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
            ...data
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
          ...data
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
    texture,
    data = {}
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
          ...data
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
          ...data
        });
      }
    }
  
    return segments;
};

export function createCoins(startTop, startLeft, count, slopeXOffset = 1) {
  const coins = [];

  for (let i = 0; i < count; i++) {
    coins.push({
      top: startTop + i * 3, // Increased spacing for more visibility
      left: startLeft + i * slopeXOffset,
      width: 1,
      height: 1,
      texture: "Coin",
      passThrough: true,
      inRange: (boundary,bot) => {
        boundary.destroy = true;
        boundary.hide=true;
        bot.setMessage(getRandomMessage());
        setTimeout(() => {
          bot.setMessage(null);
          bot.updateBoundaryByKey(boundary.key, { ...boundary, destroy: false,hide:false });
        }, 3000);
        return boundary;
      },
    });
  }

  return coins;
}

export function createLineOfCoins(startTop, startLeft, count, spacing = 3, direction = 'vertical') {
  const coins = [];

  for (let i = 0; i < count; i++) {
    coins.push({
      top: direction === 'vertical' ? startTop + i * spacing : startTop,
      left: direction === 'horizontal' ? startLeft + i * spacing : startLeft,
      width: 1,
      height: 1,
      texture: "Coin",
      passThrough: true,
      inRange: (boundary,bot) => {
        boundary.destroy = true;
        boundary.hide=true;
        const message = getRandomMessage();
        //console.log(message)
        bot.setMessage(message);
        setTimeout(() => {
          bot.setMessage(null);
          bot.updateBoundaryByKey(boundary.key, { ...boundary, destroy: false,hide:false });
        }, 3000);
        return boundary;
      },
    });
  }

  return coins;
}

/**
 * Creates an array of a specific length determined by the framerate and time duration,
 * with each element in the array set to the provided data.
 *
 * @param {number} framerate - The number of frames per second.
 * @param {number} timeInSeconds - The total duration in seconds.
 * @param {*} data - The data to fill each element of the array.
 * @returns {Array} An array with the length of numFrames, each element containing the data.
 */
export function createArrayFromFPS(framerate, timeInSeconds, data) {
  // Calculate the total number of frames
  const numFrames = Math.round(framerate * timeInSeconds);

  // Create an array with numFrames length, each element set to data
  return Array.from({ length: numFrames }, () => data);
}
