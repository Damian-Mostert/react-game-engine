import { Bot, Map, Square, HealthBiggerThan, For, Coins } from "./classes.ts";

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
			inRange($this,bot){
                bot.setMessage("Hi there");
                $this.texture = "Dirt";
				return $this;
			},
			outRange($this,bot){
                bot.setMessage(null);
                $this.texture = "Grass";
				return $this;
			}

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
    })
],[
	new Bot("Santa Clause",[
		HealthBiggerThan(75, [
			For(20,{
                w:true
			}),
			For(20,{
                a:true
			}),
			For(20,{
                d:true                
			}),
		]),
        HealthBiggerThan(50, [
			For(20,{
                w:true    
			}),
			For(20,{
                a:true    
			}),
			For(20,{
                d:true        
			}),
		]),
        HealthBiggerThan(25, [
			For(20,{
                w:true    
			}),
			For(20,{
                a:true    
			}),
			For(20,{
                d:true        
			}),
		]),
        HealthBiggerThan(0, [
			For(20,{
                w:true    
			}),
			For(20,{
                a:true    
			}),
			For(20,{
                d:true        
			}),
		]),
    ])
]);
