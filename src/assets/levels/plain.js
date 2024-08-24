import { createSlope,createQuarterCircle,createArrayFromFPS } from "./tools/builders";

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
				...createArrayFromFPS(30,1,{w:true}),
				...createArrayFromFPS(30,1,{d:true,w:false}),
				...createArrayFromFPS(30,1,{d:false,s:true,a:true}),

			]
		},
		{
			character:"Aether",
			actions:[
				...createArrayFromFPS(30,1,{e:true}),
				...createArrayFromFPS(30,1,{d:true,w:false}),
				...createArrayFromFPS(30,1,{d:false,s:true,a:true}),
			]
		},
	]
};
