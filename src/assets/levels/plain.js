import { createSlope,createQuarterCircle } from "./tools/builders";

const boundaries = [
	{
		top: 10,
		left: -950,
		width: 1900,
		height: 100,
		texture: "Grass",
		inRange(){
			//console.log("Hit the floor")
		}
	},
];

export default {
	boundaries:boundaries.map((b,key)=>({...b,key})),
	bots : [
		{
			character:"Santa Clause",
			actions:[
				{
				},
			]
		},
		{
			character:"Aether",
			actions:[
				{
					
				}
			]
		},
	]
};
