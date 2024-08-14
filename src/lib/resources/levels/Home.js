import { createSlope,createQuarterCircle } from "./tools/builders";

const boundaries = [
    {
      top: 150,
      left: -450,
      width: 900,
      height: 1,
      texture: "Dirt",
    },
    ...createSlope(80, 0, 40, 40, false, "vertical", "Dirt"),
    ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
    ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
  ];
  
  export default boundaries;