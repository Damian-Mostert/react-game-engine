import { Map,Bot,Slope,Square,For,Coins} from "../../../lib/engine/helpers/map/classes.ts";

export default new Map([
	new Square({
		texture:"Grass",
		size:{
			width:100,
			height:30
		},
		position:{
			top:5,
			left:-50
		},
		actions:{

		}
	}),
	/* new Bot("SantaClause",
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
	), */
]);