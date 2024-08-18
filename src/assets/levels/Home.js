import { createSlope, createQuarterCircle, createCoins, createLineOfCoins} from "./tools/builders";

const boundaries = [
	{
		top: 150,
		left: -450,
		width: 900,
		height: 100,
		texture: "Lava",
		inRange(data,bot){
			bot.setMessage("oh no");
			bot.removeHp(1)
			return data;
		}
	},
	...createCoins(80, 40, 24),
	...createCoins(104, 30, 2),
	...createSlope(80, 0, 40, 40, false, "vertical", "Rock",{
		inRange(boundary,bot){
			var message = null;
			switch(bot.id){
				case "main":
					message = "Main character";
				break;
				case 0:
					message = "Character 1";
				break;
				case 1:
					message = "Character 2";
				break;

			}
			bot.setMessage(message);
			return boundary
		}
	}),
	...createQuarterCircle(120, -40, 40, false, "horizontal", "Rock",{}),
	...createQuarterCircle(120, -40, 40, true, "vertical", "Rock",{
		inRange(boundary,bot){
			var message = null;
			switch(bot.id){
				case "main":
					message = "Main character";
				break;
				case 0:
					message = "Character 1";
				break;
				case 1:
					message = "Character 2";
				break;

			}
			bot.setMessage(message);
			return boundary
		}
	}),
	...createLineOfCoins(54, 30, 7, 3, 'vertical'),
	...createLineOfCoins(70, 30, 10, 3, 'horizontal'),
];

const bots = [
	{
		character:"Santa Clause",
		actions:[
			{
				w:true,
			},
			{
				w:true,
			},
			{
				w:true,
			},
			{
				a:true,
			},
			{
				a:true,
			},
			{
				d:true
			},
			{
				d:true
			}
		]
	},
	{
		character:"Aether",
		actions:[
			{
				w:true,
			},
			{
				w:true,
			},
			{
				w:true,
			},
			{
				a:true,
			},
			{
				d:true,
			},
			{
				d:true
			},
			{
				d:true
			}
		]
	},
];

export default {
	boundaries:boundaries.map((b,key)=>({...b,key})),
	bots
};