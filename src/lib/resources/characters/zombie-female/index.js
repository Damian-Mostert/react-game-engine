"use client";

export default{
      name:"zombie-female",
      width: 40,
      height: 65,
      container:{
        width: 40,
        height: 70,
        minHeight:70,
        minWidth:40
      },
      box:{
        width:"150px",
        height:"80px",
        left:"-0px",
        top:"-12px",
        objectPosition:"-20px",
        objectFit:"cover",
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
      ]
}
