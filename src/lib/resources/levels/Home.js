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
      inRange(boundary,dom){
        boundary.texture = "Grass";
        return boundary;
      },
      outRange(boundary,dom){
        boundary.texture = "Dirt";
        return boundary;
      },
      
    },
    {
      top: 41,
      left:0,
      width: 1,
      height: 1,
      id:"Message",
      id:"Floor",
      inRange(boundary){
        window.gameDom.updateBigMessage("Hi there");
        boundary.message = "start"
        return boundary; 
      },
      outRange(boundary){
        window.gameDom.updateBigMessage(null);
        boundary.message = null
        return boundary;  
      },

      
    },
    {
      top: 50,
      left: 9,
      width: 1,
      height: 1,
      texture: "Dirt",
      id:"Message2",
      inRangeBlocks:()=>({
        range:150,
        action:(boundary)=>{
          window.gameDom.updateBigMessage("Welcome to the game");
          boundary.texture = "Grass";
          return boundary; 
        }}),
      outRangeBlocks:()=>({
        range:150,
        action:(boundary)=>{
          boundary.texture = "Dirt";
          return boundary;  
        }}),
    },
    ...createSlope(80, 0, 40, 40, false, "vertical", "Grass"),
    ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
    ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
  ];
  
  export default boundaries;