import { createSlope,createQuarterCircle } from "./tools/builders";

const boundaries = [
  {
    top: 0,
    left: -450,
    width: 900,
    height: 150,
    texture: "CobbleStone",
    passThrough:true,

  },
  {
      top: 150,
      left: -450,
      width: 900,
      height: 1,
      texture: "Dirt",
      id:"Floor",
      inRange(boundary){
        console.log("On the floor")
        boundary.texture = "Grass";
        return boundary;
      },
      outRange(boundary){
        console.log("Off the floor")

        boundary.texture = "Dirt";
        return boundary;
      }
    },
    ...createSlope(80, 0, 40, 40, false, "vertical", "Dirt"),
    ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
    ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
  ];
  
  export default boundaries;