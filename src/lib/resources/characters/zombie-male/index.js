"use client";

export default{
      name:"zombie-male",
      width: 40,
      height: 65,
      container:{
        minHeight:79,
        minWidth:50
      },
      box:{
        width:"100%",
        height:"100%",
        left:"-4px",
        top:"-12px",
        objectPosition:"-4px",
      },
      attributes:{
        speed:0.5,
        weight:0.5,
        health:100,
        attack:10,
        jump:false,
        run:false,
        walk:true,
        slide:false,
        attack:true,
        jumpAttack:false,
        maxVelocity:10,
      },
      actions:[
        {
            callback:"dead",
            slug:"Dead",
            frames:10
        },
        {
            callback:"hurt",
            slug:"Hurt",
            frames:8
        },
        {
            callback:"idle",
            slug:"Idle",
            frames:10
        },
        {
            callback:"attack",
            slug:"Attack",
            frames:8
        },
        
        {
            callback:"walk",
            slug:"Walk",
            frames:10
        },
        {
            callback:"slide",
            slug:"Dead",
            frames:10
        }
      ]
}
