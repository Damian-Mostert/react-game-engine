import { Bot, Map, Square } from "./classes";

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
                return $this;
            },
            outRange($this,bot){
                return $this;
            }

        }
    }),
],[
    new Bot("Santa Clause",{
        1:[
            {

            }
        ],
        0.5:[
            {

            }
        ],
        0.25:[
            {

            }
        ]
    })
]);