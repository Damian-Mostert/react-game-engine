"use client";

import { Character } from "../../../lib/engine/helpers/character/classes.ts";

const knight = new Character({
	name:"knight",
	width: 40,
	height: 65,
	container:{
		width: 48,
		height: 70,
		minHeight:70,
		minWidth:46
	},
	box:{
		width:"100%",
		height:"80px",
		left:"0px",
		top:"-9px",
		objectPosition:"-10px",
		objectFit:"cover",
	},
	attributes:{
		strength:10,
		speed:2.5,
		weight:2,
		health:10,
		ap:10,
		jump:true,
		run:true,
		walk:true,
		slide:false,
		attack:true,
		jumpAttack:true,
		maxVelocity:20,
	},
	actions:[
		{
			callback:"dead",
			slug:"Dead",
			frames:10,
			override:{
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
					minWidth:70,
					objectPosition:"-6px",
					objectFit:"cover",
				},
			}
		},
		{
			callback:"attack",
			slug:"Attack",
			frames:10
		},
		{
			callback:"fall",
			slug:"Fall",
			frames:8,
			override:{
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
					minWidth:55,
					objectPosition:"-36px",
					objectFit:"cover",
				},
			}
		},
		{
			callback:"dead",
			slug:"Dead",
			frames:10
		},
		{
			callback:"attack",
			slug:"Attack",
			frames:10
		},
		{
			callback:"jump-attack",
			slug:"JumpAttack",
			frames:10
		},
		{
			callback:"idle",
			slug:"Idle",
			frames:10
		},
		{
			callback:"jump",
			slug:"Jump",
			frames:10,

		},
		{
			callback:"walk",
			slug:"Walk",
			frames:10
		},
		{
			callback:"run",
			slug:"Run",
			frames:10
		}
	]
})

export default knight;
