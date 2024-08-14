"use client";

export default{
      name:"ninja",
      width: 40,
      height: 80,
      container:{
        width: 40,
        height: 80,
        minHeight:80,
        minWidth:40
      },
      box:{
        width:45,
        minWidth:45,
        height:"80px",
        left:"0px",
        top:"0px",
        objectPosition:"0px",
        objectFit:"cover",
      },
      attributes:{
        speed:4,
        weight:2,
        maxVelocity:40,
        health:100,
        ap:10,
        jump:true,
        run:true,
        walk:false,
        slide:true,
        attack:false,
        jumpAttack:false,
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
            callback:"jump",
            slug:"Jump",
            frames:12
        },
        {
            callback:"run",
            slug:"Run",
            frames:8
        },
        {
            callback:"slide",
            slug:"Slide",
            frames:5
        }
      ]
}
