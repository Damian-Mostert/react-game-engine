"use client";

export default{
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
		slide:true,
		attack:false,
		jumpAttack:false,
		maxVelocity:20,
	},
	actions:[
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
			callback:"fall",
			slug:"Fall",
			frames:8
		},
		{
			callback:"dead",
			slug:"Dead",
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
			frames:10
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
}
