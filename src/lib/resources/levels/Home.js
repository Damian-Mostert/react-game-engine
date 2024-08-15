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
        boundary.message = null
        return boundary;  
      },

      
    },
    {
      top: 48,
      left: 9,
      width: 1,
      height: 1,
      texture: "Coin",
      id:"Message2",
      passThrough:true,
      inRange:(boundary)=>{
          window.gameDom.updateBigMessage("Welcome to the gam, heres some money");
          window.gameDom.addCoins(100)
          boundary.destroy = true;
          setTimeout(()=>{
            window.gameDom.updateBoundary("Message2",{...boundary,destroy:false})
          },3000)
          return boundary; 
        },
      /* outRangeBlocks:()=>({
        range:100,
        action:(boundary)=>{
          boundary.texture = "Dirt";
          return boundary;  
        }}), */
    },
    {
      top: 49,
      left: 10,
      width: 1,
      height: 1,
      texture: "Coin",
      id:"Message3",
      passThrough:true,
      inRange:(boundary)=>{
          window.gameDom.updateBigMessage("COINS !!!");
          window.gameDom.addCoins(100)
          boundary.destroy = true;
          setTimeout(()=>{
            window.gameDom.updateBoundary("Message3",{...boundary,destroy:false})
          },3000)
          return boundary; 
        },
      /* outRangeBlocks:()=>({
        range:100,
        action:(boundary)=>{
          boundary.texture = "Dirt";
          return boundary;  
        }}), */
    },
    {
      top: 50,
      left: 11,
      width: 1,
      height: 1,
      texture: "Coin",
      id:"Message4",
      passThrough:true,
      inRange:(boundary)=>{
          window.gameDom.updateBigMessage("FUCK YEAH MHAN!!!");
          window.gameDom.addCoins(100)
          boundary.destroy = true;
          setTimeout(()=>{
            window.gameDom.updateBoundary("Message4",{...boundary,destroy:false})
          },3000)
          return boundary; 
        },
      /* outRangeBlocks:()=>({
        range:100,
        action:(boundary)=>{
          boundary.texture = "Dirt";
          return boundary;  
        }}), */
    },
    ...createSlope(80, 0, 40, 40, false, "vertical", "Grass"),
    ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
    ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
  ];
  
  export default boundaries;