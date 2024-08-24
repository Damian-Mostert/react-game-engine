import { Map,Bot,Slope,Square,For,Coins,CurveIn,CurveOut} from "../../../lib/helpers/mab-builders/classes.ts";

export default new Map([
	new Square({
		texture:"Grass",
		size:{
			width:1000,
			height:100
		},
		position:{
			top:105,
			left:-500
		},
		actions:{
			/* inRange($this,bot){
				bot.setMessage("Hi there");
				$this.texture = "Dirt";
				return $this;
			},
			outRange($this,bot){
				bot.setMessage(null);
				$this.texture = "Grass";
				return $this;
			} */

		}
	})
],[
	new Bot("Santa Clause",[
		...For(20,{
			w:true
		}),
	])
]);
console.log(

	new Bot("Santa Clause",[
		...For(20,{
			w:true
		}),
	])
)