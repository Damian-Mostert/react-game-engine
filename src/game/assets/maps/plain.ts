import { Map,Bot,Slope,Square,For,Coins,CurveIn,CurveOut } from "../../../lib/engine/helpers/map/classes.ts";

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
			top:0,
			left:-5
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
			top:-10,
			left:-10
		},
		actions:{

		}
	}),
	new Slope({
		texture:"Grass",
		size:{
			width:16,
			height:10
		},
		position:{
			top:-5,
			left:15
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
		horizontal:true,
	}),
	new Slope({
		texture:"Grass",
		size:{
			width:16,
			height:10
		},
		position:{
			top:-15,
			left:30
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
		horizontal:true,
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:10,
			left:10
		},
		actions:{

		}
	},{
		horizontal:true
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:15,
			left:15
		},
		actions:{

		}
	},{
		horizontal:true
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:20,
			left:20
		},
		actions:{

		}
	},{
		horizontal:true
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:-10,
			left:-10
		},
		actions:{

		}
	},{
		horizontal:true
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:-15,
			left:-15
		},
		actions:{

		}
	},{
		horizontal:true
	}),
	new CurveIn({
		texture:"Dirt",
		size:{
			width:10,
			height:10
		},
		position:{
			top:-20,
			left:-20
		},
		actions:{

		}
	},{
		horizontal:true
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
