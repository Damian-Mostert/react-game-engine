"use client";

export default{
      name:"ninja",
      width: 40,
      height: 80,
      container:{
        height: 80,
        minWidth:40
      },
      box:{
        minWidth:45,
        left:"0px",
        scale:"0.9",
        top:"0px",
        objectPosition:"0px",
        objectFit:"cover",
      },
      attributes:{
        strength:10,
        speed:1,
        weight:2,
        maxVelocity:40,
        health:100,
        ap:10,
        jump:true,
        run:true,
        walk:false,
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
            frames:10
        },
        {
            callback:"run",
            slug:"Run",
            frames:8,
            override:{
              container:{
                width: 50,
                height: 70,
                minHeight:70,
                minWidth:55,
              },
              box:{
                width:"150px",
                height:"80px",
                left:"-0px",
                top:"-12px",
                objectPosition:"0px",
              },
            }
        },
        {
            callback:"slide",
            slug:"Slide",
            frames:10,
            override:{
              container:{
                width: 45,
                height: 70,
                minHeight:70,
                minWidth:45
              },
              box:{
                minWidth:72,
                scale:"0.8",
                height:"80px",
                left:"-0px",
                top:"-6px",
                objectFit:"contain",
              },
            }
        }
      ]
}
