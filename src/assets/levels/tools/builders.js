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
const vulgarMessages = [
  "DAMN RIGHT, GET THAT MONEY!",
  "FUCK YEAH, CASH!",
  "HELL YEAH, COLLECT THAT SHIT!",
  "YOU DESERVE THIS SHIT!",
  "GRAB THAT FUCKING CASH!",
  "MORE FUCKING COINS!",
  "FUCKING RICH NOW!",
  "STACK THAT FUCKING CASH!",
  "BASK IN THE SHITLOAD OF COINS!",
  "LOAD UP ON THAT SWEET CASH!",
  "FUCKING SCORE BIG TIME!",
  "GOLD MINE BITCH!",
  "RACK UP THOSE FUCKING COINS!",
  "CASH IN, MOTHERFUCKER!",
  "CHA-CHING, MOTHERFUCKER!",
  "MONEY FUCKING FALLING FROM THE SKY!",
  "YOU’RE ROLLING IN THIS SHIT!",
  "CASH RAIN, FUCKER!",
  "COLLECT THAT BILLS, BITCH!",
  "FILL YOUR FUCKING POCKETS!",
  "YOU’RE BALLING NOW, BITCH!",
  "CASH STACKS FOR DAYS, FUCKER!",
  "GOLDEN FUCKING TROVE!",
  "TIME TO GET FUCKING RICH!",
  "FUCKING SCORE, YOU WINNER!",
  "THIS IS YOUR SHITLOAD OF COINS!",
  "FUCKING WINNING, BITCH!",
  "MONEY MADNESS, LET’S GO!",
  "YOU’RE SWIMMING IN COINS, BITCH!",
  "FUCKING UNSTOPPABLE!",
  "HIT THE JACKPOT, ASSHOLE!"
];


function getRandomMessage() {
  return vulgarMessages[Math.floor(Math.random() * vulgarMessages.length)];
}

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
        console.log(message)
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