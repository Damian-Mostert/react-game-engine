"use client";

export default{
      name:"santa",
      width: 40,
      height: 65,
      container:{
        width: 50,
        height: 65,
        minHeight:65,
        minWidth:50
      },
      box:{
        width:"20ad0px",
        height:"80px",
        left:"0px",
        top:"-6px",
        objectPosition:"-26px",
        objectFit:"cover",
      },
      attributes:{
        speed:2,
        weight:3,
        health:100,
        ap:10,
        jump:true,
        run:true,
        walk:true,
        slide:true,
        attack:false,
        jumpAttack:false,
        maxVelocity:40,
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
