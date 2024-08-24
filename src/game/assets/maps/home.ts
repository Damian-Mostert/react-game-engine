import { Map,Bot,Slope,Square,For,Coins,CurveIn,CurveOut } from "../../../lib/helpers/map/classes.ts";

export default new Map([
	new Square({
		texture:"Grass",
		size:{
			width:1000,
			height:100
		},
		position:{
			top:-5,
			left:-500
		},
		actions:{


			/*			outRange($this,bot){
				bot.setMessage(null);
				$this.texture = "Grass";
				return $this;
			} */
		}
	}),
	new Coins({
		position:{
			top:0,
			left:0
		},
		orientation:{
			vertical:true
		},
		amount:10
	}),
	new Bot("SantaClause",
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
