"use client";

export default{
      name:"jack",
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
        top:"-10px",
        objectPosition:"-8px",
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
