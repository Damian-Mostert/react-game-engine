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
	new Bot("Santa Clause",
		For(1,{
			w:true
		}),
		For(2,{
			a:true
		}),
		For(2,{
			d:true,
			s:true
		}),
	),
	new Bot("Aether",
		For(3,{
			w:true,
			e:true,
			d:true,
		}),
		For(6,{
			a:true
		}),
	),
]);
