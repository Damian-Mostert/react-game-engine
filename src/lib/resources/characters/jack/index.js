"use client";

export default{
      name:"jack",
      width: 40,
      height: 65,
      container:{
        width: 100,
        height: 100,
        minHeight:100,
        minWidth:100
      },
      box:{
        width:"55px",
        height:"80px",
        left:"0px",
        top:"-10px",
        objectPosition:"0px",
        objectFit:"cover",
      },
      attributes:{
        weight:100,
        health:100,
        attack:10,
        jump:true,
        run:true,
        walk:true,
        slide:true,
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
