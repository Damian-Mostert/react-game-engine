"use client";

export default{
      name:"zombie-male",
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
        left:"0px",
        top:"-12px",
        objectPosition:"-10px",
        objectFit:"cover",
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
            slug:"Attack",
            frames:8
        },
        {
            callback:"run",
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
