import { createLineOfCoins,createSlope,createArrayFromFPS } from "./tools/builders.js";
import { BoundaryProps,CoinsProps,Position, Size, boundaryActions, Orientation, keys, BoundaryPropsResult } from "./interfaces.ts";
import framerate from "../../../../game/assets/config/framerate.ts";
import physics from "../../../../game/assets/config/physics.ts";

export class Bot{
	constructor(character:string,...actions:Array<keys>){
		this.character = character;
		this.actions = actions.flat();
	}
  isBot= true;
	character:string = '';
	actions:Array<keys> = [];
};


export class Map {
    constructor(items:Array<Bot|BoundaryPropsResult>) {
      const boundaries:any = [];
      const bots:any = [];
    
      items.map((item:any)=>{
        if(item.isBot)
          bots.push(item)
        else
          boundaries.push(item)
      })

      const boundaries_result: any = [];
    
      for (let boundary of boundaries) {
        const boundaryArray = boundary.generateArray();
        boundaries_result.push(...boundaryArray);
      }
  
      this.boundaries = boundaries_result.map((b:any,key:number)=>({...b,key}));
      this.bots = bots.map((bot: Bot, index: number) => ({ ...bot, id: index + 1 }));
    }
  
    boundaries: Array<object> = [];
    bots: Array<Bot> = [];
}

export class Square {
  constructor({ texture = "", size, position, actions = {} }: BoundaryProps) {
    this.texture = texture;
    this.size = { ...this.size, ...size };
    this.position = { ...this.position, ...position };
    this.actions = { ...this.actions, ...actions };
  }
  
  generateArray() {
    const { width, height }:Size = this.size;
    const squares:any = [];
    for(let x = 0;x<width;x++){
      for(let y = 0;y<height;y++){      
        var top = y + this.position.top;
        var left = x + this.position.left;
        squares.push({
          top,
          left,
          width:1,
          height:1,
          texture: this.texture,
          ...this.actions,
          type: this.type,
        });
      }
    }
      return squares;
    }
  
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    type = "square";
  }
  
  export class Slope {
    constructor(
      { texture = "", size, position, actions = {} }: BoundaryProps,
      orientation: Orientation
    ) {
      this.texture = texture;
      this.size = { ...this.size, ...size };
      this.position = { ...this.position, ...position };
      this.actions = { ...this.actions, ...actions };
      this.orientation = orientation;
    }
  
    generateArray() {
      return createSlope(
        this.position.top,
        this.position.left,
        this.size.width,
        this.size.height,
        this.orientation.right ? "right" :
        this.orientation.left ? "left" :
        this.orientation.bottomRight ? "bottom-right" :
        this.orientation.bottomLeft ? "bottom-left" :
        "right",  // Default direction if none of the orientation conditions are true
        this.texture,
        this.actions
      );
      
    }
  
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    orientation: Orientation = { vertical: true };
    type = "slope";
  }
  
  
  export class Coins {
    constructor({ position, orientation = { vertical: true }, amount = 1 }: CoinsProps) {
      this.position = { ...this.position, ...position };
      this.orientation = orientation;
      this.amount = amount;
    }
  
    generateArray() {
      return createLineOfCoins(
        this.position.top,
        this.position.left,
        this.amount,
        3, // Spacing can be adjusted
        this.orientation.vertical ? "vertical" : "horizontal"
      );
    }
  
    amount: number = 0;
    orientation: orientation = { vertical: true };
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    type = "coins";
  }
  
  
export function For(time:number,keys:keys){
    const actions:any = createArrayFromFPS(framerate.game,time,keys);
    return actions;
}