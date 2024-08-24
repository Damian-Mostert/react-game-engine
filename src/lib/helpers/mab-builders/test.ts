import { Bot, Map, Square, HealthBiggerThan, For, Coins } from "./classes";

export default new Map([
	new Square({
		texture:"test",
		size:{
			width:10,
			height:10
		},
		position:{
			top:0,
			left:0
		},
		actions:{
			inRange($this,bot){
                if(bot.id == 0){
                    bot.setMessage("Hi there");
                }
                if(bot.id == 1){
                    bot.setMessage("Hi there");
                }
				return $this;
			},
			outRange($this,bot){
                bot.setMessage(null);
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

			}),
			For(20,{

			}),
			For(20,{
                
			}),
		]),
        HealthBiggerThan(50, [
			For(20,{

			}),
			For(20,{

			}),
			For(20,{
                
			}),
		]),
        HealthBiggerThan(25, [
			For(20,{

			}),
			For(20,{

			}),
			For(20,{
                
			}),
		]),
        HealthBiggerThan(0, [
			For(20,{

			}),
			For(20,{

			}),
			For(20,{
                
			}),
		]),
    ])
]);
