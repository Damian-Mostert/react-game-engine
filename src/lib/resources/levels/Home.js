import { createSlope, createQuarterCircle, createCoins, createLineOfCoins} from "./tools/builders";



const boundaries = [
	// Ground layer
	/* {
		top: 0,
		left: -450,
		width: 900,
		height: 150,
		texture: "CobbleStone",
		passThrough: true,
		}, */

		// Transition area
		{
			top: 150,
			left: -450,
			width: 900,
			height: 100,
			texture: "Grass",
			id: "Floor",
			inRange(data){
				window.gameDom.removeHp(1)
				return data;
			}
		},

		// Fun elements
		...createCoins(80, 40, 24), // Creates 25 coins down the slope starting from top 54 and left 15
		...createCoins(104, 30, 2), // Creates 25 coins down the slope starting from top 54 and left 15

		// Adding slopes and obstacles
		...createSlope(80, 0, 40, 40, false, "vertical", "Rock",{inRange(boundary){
			window.gameDom.updateBigMessage("Fucking rocks man")
			}}),

		// Adding quarter circles for fun transitions
		...createQuarterCircle(120, -40, 40, false, "horizontal", "Rock",{inRange(boundary){
			window.gameDom.updateBigMessage("Rock City")
			}}),
		...createQuarterCircle(120, -40, 40, true, "vertical", "Rock",{inRange(){
			window.gameDom.updateBigMessage("I am Dwain the rock Jhonson")
			}}),
		...createLineOfCoins(54, 30, 7, 3, 'vertical'), // Creates 7 vertical coins starting from top 54 and left 30
		...createLineOfCoins(70, 30, 10, 3, 'horizontal'),
		// Adding additional obstacles for challenge
		{
			top: 70,
			left: 100,
			width: 1,
			height: 10,
			texture: "Rock",
			id: "Obstacle1",
			passThrough: false,
		},
		{
			top: 90,
			left: 200,
			width: 1,
			height: 15,
			texture: "Rock",
			id: "Obstacle2",
			passThrough: false,
		},
		{
			top: 120,
			left: 300,
			width: 1,
			height: 20,
			texture: "Rock",
			id: "Obstacle3",
			passThrough: false,
		},

		// Adding a reward area
		{
			top: 150,
			left: 500,
			width: 1,
			height: 1,
			texture: "Treasure",
			id: "RewardArea",
			passThrough: true,
			inRange: (boundary) => {
				window.gameDom.updateBigMessage("You’ve reached the reward area!");
				window.gameDom.addCoins(500); // Larger reward
				boundary.destroy = true;
				setTimeout(() => {
					window.gameDom.updateBoundary("RewardArea", { ...boundary, destroy: false });
				}, 3000);
				return boundary;
			},
		}
];

export default boundaries;
