"use client";

import { useEffect, useState } from "react";

import useKeys from "./use-keys";
import useSocket from "./use-socket";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";

export default function useGame({ boundaries = [], character = "", characters = {} }) {
	//create a frame rate state to trigger rendering;
	const framerate = useFramerate(25);
	//get control keys;
	const keys = useKeys();
	//get socket;
	const { emit , data:players ,id } = useSocket();
	//use game physics, insert control keys, boundaries and character;
	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate
	});
	//when physics change tell server;
	useEffect(()=>{
		emit("server",{
			...physics,
			keys,
			character:characters[character]
		})
	},[physics,keys]);
	//return players and boundaries;
	return {
		keys,
		players:Object.fromEntries(
			Object.entries(players).filter(([key, player]) => player.id !== id)
		),
		boundaries: physics,
	};
}
