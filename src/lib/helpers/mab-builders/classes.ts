import { ActionsProps,BoundaryProps,BotProps,CoinsProps,Position, Size, boundaryActions, orientation } from "./interfaces";

export class Bot{
	constructor(character:string,actions:ActionsProps){
		this.character = character;
		this.actions = actions
	}
	character:string = '';
	actions:ActionsProps = [];

};


export class Map{
	constructor(boundaries:Array<BoundaryProps>,bots:Array<BotProps>){
		this.boundaries = boundaries;
		this.bots = bots.map((bot:BotProps,id:number)=>({...bot,id}));
	}
	boundaries:Array<BoundaryProps> = [];
	bots:Array<BotProps> = [];
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
    actions:boundaryActions = {}
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