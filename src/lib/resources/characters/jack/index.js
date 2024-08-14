"use client";

export default{
      name:"jack",
      width: 45,
      height: 65,
      container:{
        width: 45,
        height: 70,
        minHeight:70,
        minWidth:45
      },
      box:{
        width:"150px",
        height:"80px",
        left:"-0px",
        top:"-12px",
        objectPosition:"-5px",
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
        slide:true,
        attack:false,
        jumpAttack:true,
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
