"use client";

export default{
      name:"knight",
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
            callback:"run",
            slug:"Run",
            frames:10
        },
        {
            callback:"slide",
            slug:"Walk",
            frames:10
        }
      ]
}
