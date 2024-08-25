import { Map,Bot,Slope,Square,For,Coins } from "../../../lib/engine/helpers/map/classes.ts";

export default new Map([
	new Square({
		texture:"Grass",
		size:{
			width:500,
			height:100
		},
		position:{
			top:20,
			left:-150
		},
		actions:{

		}
	}),
	new Square({
		texture:"Dirt",
		size:{
			width:16,
			height:10
		},
		position:{
			top:10,
			left:30
		},
		actions:{

		}
	}),
	new Slope({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:19,
			left:30
		},
		actions:{

		},
		
	},{
		horizontal:true,
	}),
	new Slope({
		texture:"Grass",
		size:{
			width:10,
			height:10
		},
		position:{
			top:9,
			left:40
		},
		actions:{
			inRange($this,bot){
				bot.setMessage("Hi there");
				$this.texture = "Dirt";
				return $this;
			},
			outRange($this,bot){
				bot.setMessage(null);
				$this.texture = "Grass";
				return $this;
			},
		},
		
	},{
		bottomleft:true,
	}),
	new Slope({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:9,
			left:40
		},
		actions:{

		},
		
	},{
		left:true
	}),
/* 	new Bot("SantaClause",
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
