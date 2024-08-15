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
  /* {
    bot:true,
    character:"Aether",
    top:0,
    left:1,
    action:(input)=>{
      if(input.inRange){
        input.character.left= input.left;
        input.character.action = "attack"
      }
      return input
    }
  }, */
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
      left: 1,
      width: 4,
      height: 1,
      texture: "Dirt",
      id:"Message",
      inRangeBlocks:()=>({
        range:250,
        action:(boundary)=>{
          window.gameDom.updateBigMessage("Hi there");
          boundary.message = "Checkpoint"
          return boundary; 
        }}),
      outRangeBlocks:()=>({
        range:250,
        action:(boundary)=>{
          window.gameDom.updateBigMessage(null);
          boundary.message = null
          return boundary;  
        }}),

      
    },
    {
      top: 50,
      left: 10,
      width: 1,
      height: 1,
      texture: "Dirt",
      id:"Message2",
      inRangeBlocks:()=>({
        range:250,
        action:(boundary)=>{
          window.gameDom.updateBigMessage("Welcome to the game");
          boundary.texture = "Grass";
          return boundary; 
        }}),
      outRangeBlocks:()=>({
        range:250,
        action:(boundary)=>{
          window.gameDom.updateBigMessage(null);
          boundary.texture = "Dirt";
          boundary.message = null
          return boundary;  
        }}),

      
    },

    ...createSlope(80, 0, 40, 40, false, "vertical", "Grass"),
    ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
    ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
  ];
  
  export default boundaries;