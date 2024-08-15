import { createSlope,createQuarterCircle } from "./tools/builders";

const boundaries = [
  {
    top: 0,
    left: -450,
    width: 900,
    height: 150,
    texture: "Dirt",
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
  ];
  
  export default boundaries;