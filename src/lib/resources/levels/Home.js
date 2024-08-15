import { createSlope, createQuarterCircle } from "./tools/builders";
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

function createCoins(startTop, startLeft, count, slopeXOffset = 1) {
  const coins = [];

  for (let i = 0; i < count; i++) {
    coins.push({
      top: startTop + i * 3, // Increased spacing for more visibility
      left: startLeft + i * slopeXOffset,
      width: 1,
      height: 1,
      texture: "Coin",
      id: `VulgarCoin${i + 1}`,
      passThrough: true,
      inRange: (boundary) => {
        window.gameDom.updateBigMessage(getRandomMessage());
        window.gameDom.addCoins(100);
        boundary.destroy = true;
        window.gameDom.playSound("coin.mp3");
        setTimeout(() => {
          window.gameDom.updateBoundary(`VulgarCoin${i + 1}`, { ...boundary, destroy: false });
        }, 3000);
        return boundary;
      },
    });
  }

  return coins;
}

function createLineOfCoins(startTop, startLeft, count, spacing = 3, direction = 'vertical') {
  const coins = [];

  for (let i = 0; i < count; i++) {
    coins.push({
      top: direction === 'vertical' ? startTop + i * spacing : startTop,
      left: direction === 'horizontal' ? startLeft + i * spacing : startLeft,
      width: 1,
      height: 1,
      texture: "Coin",
      id: `VulgarCoin${direction === 'vertical' ? `Vertical${i + 1}` : `Horizontal${i + 1}`}`,
      passThrough: true,
      inRange: (boundary) => {
        window.gameDom.playSound("coin.mp3");
        window.gameDom.updateBigMessage(getRandomMessage());
        window.gameDom.addCoins(100);
        boundary.destroy = true;
        setTimeout(() => {
          window.gameDom.updateBoundary(`VulgarCoin${direction === 'vertical' ? `Vertical${i + 1}` : `Horizontal${i + 1}`}`, { ...boundary, destroy: false });
        }, 3000);
        return boundary;
      },
    });
  }

  return coins;
}


const boundaries = [
  // Ground layer
 /*  {
    top: 0,
    left: -450,
    width: 900,
    height: 150,
    texture: "CobbleStone",
    passThrough: true,
  }, */
  
  // Transition area
  {
    top: 150,
    left: -450,
    width: 900,
    height: 100,
    texture: "Grass",
    id: "Floor"
  },
  
  // Fun elements
  ...createCoins(80, 40, 24), // Creates 25 coins down the slope starting from top 54 and left 15
  ...createCoins(104, 30, 2), // Creates 25 coins down the slope starting from top 54 and left 15
  
  // Adding slopes and obstacles
  ...createSlope(80, 0, 40, 40, false, "vertical", "Rock"),
  
  // Adding quarter circles for fun transitions
  ...createQuarterCircle(120, -40, 40, false, "horizontal", "Rock"),
  ...createQuarterCircle(120, -40, 40, true, "vertical", "Rock"),
  ...createLineOfCoins(54, 30, 7, 3, 'vertical'),  // Creates 7 vertical coins starting from top 54 and left 30
  ...createLineOfCoins(70, 30, 10, 3, 'horizontal'),
  // Adding additional obstacles for challenge
  {
    top: 70,
    left: 100,
    width: 1,
    height: 10,
    texture: "Rock",
    id: "Obstacle1",
    passThrough: false,
  },
  {
    top: 90,
    left: 200,
    width: 1,
    height: 15,
    texture: "Rock",
    id: "Obstacle2",
    passThrough: false,
  },
  {
    top: 120,
    left: 300,
    width: 1,
    height: 20,
    texture: "Rock",
    id: "Obstacle3",
    passThrough: false,
  },
  
  // Adding a reward area
  {
    top: 150,
    left: 500,
    width: 1,
    height: 1,
    texture: "Treasure",
    id: "RewardArea",
    passThrough: true,
    inRange: (boundary) => {
      window.gameDom.updateBigMessage("You’ve reached the reward area!");
      window.gameDom.addCoins(500); // Larger reward
      boundary.destroy = true;
      setTimeout(() => {
        window.gameDom.updateBoundary("RewardArea", { ...boundary, destroy: false });
      }, 3000);
      return boundary;
    },
  }
];

export default boundaries;
