import { createSlope, createQuarterCircle, createCoins, createLineOfCoins} from "./tools/builders";

const boundaries = [
	{
		top: 150,
		left: -450,
		width: 900,
		height: 100,
		texture: "Lava",
		inRange(data,bot){
			if(bot)return bot.removeHp(1)
			return data;
		}
	},
	...createCoins(80, 40, 24),
	...createCoins(104, 30, 2),
	...createSlope(80, 0, 40, 40, false, "vertical", "Rock",{
		inRange(boundary,bot){
			if(bot)return bot.id === "Santa Clause" ? bot.updateMessage("Ho Ho Ho, oh shit!"):bot.updateMessage("Cheers!");
		}
	}),
	...createQuarterCircle(120, -40, 40, false, "horizontal", "Rock",{
		inRange(boundary,bot){
		}
	}),
	...createQuarterCircle(120, -40, 40, true, "vertical", "Rock",{
		inRange(_,bot){
			if(bot)return bot.id === 0 ? bot.updateMessage("Ho Ho Ho, oh shit!"):bot.updateMessage("Cheers!");
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
	boundaries,
	bots
};
