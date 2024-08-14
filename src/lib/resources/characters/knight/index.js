"use client";

export default{
      name:"knight",
      width: 40,
      height: 65,
      container:{
        width: 48,
        height: 70,
        minHeight:70,
        minWidth:46
      },
      box:{
        width:"100%",
        height:"80px",
        left:"0px",
        top:"-9px",
        objectPosition:"-10px",
        objectFit:"cover",
      },
      attributes:{
        speed:1,
        weight:2,
        maxVelocity:40,
        health:100,
        ap:10,
        jump:true,
        run:false,
        walk:true,
        slide:false,
        attack:true,
        jumpAttack:true,
      },
      actions:[
        {
            callback:"dead",
            slug:"Dead",
            frames:10
        },
        {
          callback:"attack",
          slug:"Attack",
          frames:10
      },
        {
            callback:"hurt",
            slug:"Dead",
            frames:8
        },
        {
            callback:"idle",
            slug:"Idle",
            frames:10
        },
        {
            callback:"jump",
            slug:"Jump",
            frames:10
        },
        {
            callback:"walk",
            slug:"Walk",
            frames:10
        }
      ]
}
