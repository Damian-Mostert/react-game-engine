"use client";

import { Character } from "../../../lib/engine/helpers/character/classes.ts";

const zombieFemale = new Character({
  name:"zombie-female",
  width: 40,
  height: 65,
  container:{
    minHeight:79,
    minWidth:50
  },
  box:{
    width:"100%",
    height:"100%",
    left:"-0px",
    top:"-12px",
    objectPosition:"-16px",
    objectFit:"cover",
  },
  attributes:{
    speed:0.5,
    weight:0.5,
    strength:10,
    health:100,
    ap:10,
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
});

export default zombieFemale;
