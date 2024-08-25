function getRandomMessage(){}

export const createSlope = (
  top,
  left,
  length,
  height,
  orientation,
  texture,
  data = {}
) => {
  const blocks = [];
  if (orientation === "right") {
    for (let i = 0; i < height; i++) {
      const currentLength = length - i; // Adjust length based on the slope
      
      for (let j = 0; j < currentLength; j++) {
          blocks.push({
            top: top - i,
            left: left - j,
            width: 1,
            height: 1,
            texture,
            ...data
          });
        }
      }
  }else if (orientation === "left") {
    for (let i = 0; i < height; i++) {
      const currentLength = length - i; // Adjust length based on the slope
      
      for (let j = 0; j < currentLength; j++) {
          blocks.push({
            top: top - i,
            left: left - j,
            width: 1,
            height: 1,
            texture,
            ...data
          });
        }
      }
  }else if (orientation === "bottom-left") {
    for (let i = 0; i < height; i++) {
      const currentLength = length - i; // Adjust length based on the slope
      
      for (let j = 1; j < currentLength+1; j++) {
          blocks.push({
            top: (top - height * 2) + i + 1,
            left: left + j,
            width: 1,
            height: 1,
            texture,
            ...data
          });
        }
      }
  }else if (orientation === "bottom-right") {
    for (let i = 0; i < height; i++) {
      const currentLength = length - i; // Adjust length based on the slope
      
      for (let j = 0; j < currentLength; j--) {
          blocks.push({
            top: (top - height * 2) + i + 1,
            left: left + j,
            width: 1,
            height: 1,
            texture,
            ...data
          });
        }
      }
  }
  return blocks;
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
