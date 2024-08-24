import { createLineOfCoins,createSlope,createQuarterCircle,createArrayFromFPS } from "./tools/builders";
import { BoundaryProps,CoinsProps,Position, Size, boundaryActions, orientation, keys, BoundaryPropsResult } from "./interfaces";
import framerate from "../../../game/assets/config/framerate.ts";

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
        if(item?.isBot)
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
          squares.push({
            ...this.position,
            ...this.size,
            texture: this.texture,
            ...this.actions,
            type: this.type,
        });
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
      orientation: orientation
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
        false, // Adjust based on reverse flag if needed
        this.orientation.horizontal ? "horizontal" : "vertical",
        this.texture,
        this.actions
      );
    }
  
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    orientation: orientation = { vertical: true };
    type = "slope";
  }
  
  export class CurveIn {
    constructor(
      { texture = "", size, position, actions = {} }: BoundaryProps,
      orientation: orientation
    ) {
      this.texture = texture;
      this.size = { ...this.size, ...size };
      this.position = { ...this.position, ...position };
      this.actions = { ...this.actions, ...actions };
      this.orientation = orientation;
    }
  
    generateArray() {
      return createQuarterCircle(
        this.position.top,
        this.position.left,
        this.size.width, // Assuming radius is width
        false, // Adjust based on reverse flag if needed
        this.orientation.horizontal ? "horizontal" : "vertical",
        this.texture,
        this.actions
      );
    }
  
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    orientation: orientation = { vertical: true };
    type = "curve-in";
  }
  
  export class CurveOut {
    constructor(
      { texture = "", size, position, actions = {} }: BoundaryProps,
      orientation: orientation
    ) {
      this.texture = texture;
      this.size = { ...this.size, ...size };
      this.position = { ...this.position, ...position };
      this.actions = { ...this.actions, ...actions };
      this.orientation = orientation;
    }
  
    generateArray() {
      return createQuarterCircle(
        this.position.top,
        this.position.left,
        this.size.width, // Assuming radius is width
        true, // Adjust based on reverse flag if needed
        this.orientation.horizontal ? "horizontal" : "vertical",
        this.texture,
        this.actions
      );
    }
  
    texture: string = "";
    size: Size = { width: 0, height: 0 };
    position: Position = { top: 0, left: 0 };
    actions: boundaryActions = {};
    orientation: orientation = { vertical: true };
    type = "curve-out";
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