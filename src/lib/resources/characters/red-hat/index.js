"use client";

export default{
      name:"red-hat",
      width: 40,
      height: 65,
      container:{
        width: 40,
        height: 65,
        minHeight:65,
        minWidth:40
      },
      box:{
        width:"150px",
        height:"80px",
        left:"0px",
        top:"-6px",
        objectPosition:"-36px",
        objectFit:"cover",
      },
      attributes:{
        speed:2,
        weight:2,
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
