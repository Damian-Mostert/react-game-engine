import { ActionsProps,BoundaryProps,CoinsProps,Position, Size, boundaryActions, orientation, keys, Timer } from "./interfaces";

export class Bot{
	constructor(character:string,actions:ActionsProps){
		this.character = character;
		this.actions = actions
	}
	character:string = '';
	actions:ActionsProps = [];

};


export class Map{
	constructor(boundaries:Array<BoundaryProps|CoinsProps>,bots:Array<Bot>){
		this.boundaries = boundaries;
		this.bots = bots.map((bot:Bot,index:number)=>({...bot,id:index+1}));
	}
	boundaries:Array<BoundaryProps|CoinsProps> = [];
	bots:Array<Bot> = [];
};

export class Square{
	constructor({texture = "",size,position,actions={}}:BoundaryProps){
        this.texture = texture;
        this.size = {...this.size,...size};
        this.position = {...this.position,...position};
        this.actions = {...this.actions,...actions};        
	}
    texture:string = "";
    size:Size = {width:0,height:0};
    position:Position = {top:0,left:0};
    actions:boundaryActions = {};
    type="square";
};

export class Slope{
	constructor({texture = "",size,position,actions={}}:BoundaryProps,orientation:orientation){
        this.texture = texture;
        this.size = {...this.size,...size};
        this.position = {...this.position,...position};
        this.actions = {...this.actions,...actions};        
        this.orientation = orientation;
    }
    texture:string = "";
    size:Size = {width:0,height:0};
    position:Position = {top:0,left:0};
    actions:boundaryActions = {}
    orientation:orientation = {vertical:true};
    type="slope";
};

export class CurveIn{
	constructor({texture = "",size,position,actions={}}:BoundaryProps,orientation:orientation){
        this.texture = texture;
        this.size = {...this.size,...size};
        this.position = {...this.position,...position};
        this.actions = {...this.actions,...actions};        
        this.orientation = orientation;
	}
    texture:string = "";
    size:Size = {width:0,height:0};
    position:Position = {top:0,left:0};
    actions:boundaryActions = {}
    orientation:orientation = {vertical:true};
};

export class CurveOut{
	constructor({texture = "",size,position,actions={}}:BoundaryProps,orientation:orientation){
        this.texture = texture;
        this.size = {...this.size,...size};
        this.position = {...this.position,...position};
        this.actions = {...this.actions,...actions};     
        this.orientation = orientation;   
	}
    texture:string = "";
    size:Size = {width:0,height:0};
    position:Position = {top:0,left:0};
    actions:boundaryActions = {}
    orientation:orientation = {vertical:true};
};

export class Coins{
	constructor({position,orientation={vertical:true},amount = 1}:CoinsProps){
        this.position = {...this.position,...position};
        this.orientation = orientation;
        this.amount = amount;
	}
    position:Position = {top:0,left:0};∂
    orientation:orientation = {vertical:true};
    amount = 1;
};

export function HealthBiggerThan(health:number,actions:Timer){
    const result:object = {};
    return result;
}

export function For(time:number,keys:keys){
    const actions:Timer = {};
    return actions;
}