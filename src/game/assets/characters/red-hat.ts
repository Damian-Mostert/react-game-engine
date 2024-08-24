"use client";

import { Character } from "../../../lib/helpers/character/classes.ts";

const redHat = new Character({
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
						minWidth:55,
					objectPosition:"-36px",
					objectFit:"cover",
				},
			}
		},
		{
			callback:"fall",
			slug:"Fall",
			frames:2,
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
			callback:"run",
			slug:"Run",
			frames:8
		},
		{
			callback:"slide",
			slug:"Slide",
			frames:5,
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
          			minWidth:50,
					objectPosition:"-25px",
					objectFit:"cover",
				},
			}
		}
	]
})

export default redHat;
