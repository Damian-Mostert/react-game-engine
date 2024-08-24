import { Position } from "../map/interfaces";

interface Velocity{  x:number, y: number }

export interface Physics{
	blockSize:number,
	gravityForce:number,
	airDensity: number,
	initialPosition : Position,
	initialVelocity : Velocity,
	checkDistance:5,
	botsSpeed:200
}


export interface Framerate{
    game:number,
    sprites:number
}

export interface Music extends Array<string> {}