import { createSlope,createQuarterCircle } from "./tools/builders";

const boundaries = [
	{
		top: 150,
		left: -50,
		width: 900,
		height: 1,
		texture: "Dirt",
		//passThrough:true,
		inRange(){
			console.log("Hit the floor")
		}
	},
];

export default boundaries;
