import { createSlope, createQuarterCircle } from "./tools/builders";

function createVulgarCoins(startTop, startLeft, count, slopeXOffset = 1) {
  const vulgarMessages = [
    "DAMN RIGHT, GET THAT MONEY!",
    "FUCK YEAH, CASH!",
    "HELL YEAH, COLLECT THAT SHIT!",
    "YOU DESERVE THIS SHIT!",
    "GRAB THAT FUCKING CASH!",
    "MORE FUCKING COINS!",
    "FUCKING RICH NOW!"
  ];

  const coins = [];

  for (let i = 0; i < count; i++) {
    coins.push({
      top: startTop + i,
      left: startLeft + i * slopeXOffset,
      width: 1,
      height: 1,
      texture: "Coin",
      id: `VulgarCoin${i + 1}`,
      passThrough: true,
      inRange: (boundary) => {
        window.gameDom.updateBigMessage(vulgarMessages[i % vulgarMessages.length]);
        window.gameDom.addCoins(100);
        boundary.destroy = true;
        setTimeout(() => {
          window.gameDom.updateBoundary(`VulgarCoin${i + 1}`, { ...boundary, destroy: false });
        }, 3000);
        return boundary;
      },
    });
  }

  return coins;
}

const boundaries = [
  {
    top: 0,
    left: -450,
    width: 900,
    height: 150,
    texture: "CobbleStone",
    passThrough: true,
  },
  {
    top: 150,
    left: -450,
    width: 900,
    height: 1,
    texture: "Dirt",
    id: "Floor",
    inRange(boundary, dom) {
      boundary.texture = "Grass";
      return boundary;
    },
    outRange(boundary, dom) {
      boundary.texture = "Dirt";
      return boundary;
    },
  },
  ...createVulgarCoins(54, 15, 25), // Creates 7 coins down the slope starting from top 54 and left 15
  ...createSlope(80, 0, 40, 40, false, "vertical", "Grass"),
  ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
  ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
];

export default boundaries;
