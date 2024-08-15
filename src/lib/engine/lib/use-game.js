"use client";

import useKeys from "./use-keys";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";
import useSprite from "./use-sprite";
import getAction from "./get-action";

import config from "../config/framerates";
const {game:Framerate} = config;


export default function useGame({ boundaries = [],character = "", characters = {}, paused = false ,updateBoundary}) {
	//create a frame rate state to trigger rendering;
	const framerate = useFramerate(Framerate,paused);
	//get control keys;
	const {keys,lastKeys} = useKeys();

	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate,
		updateBoundary
	});

	const action = getAction(keys,physics.velocity,characters[character].attributes,lastKeys,physics.isJumping);

	const sprite = useSprite(characters[character],action.result,action.left,paused);

	return {
		sprite,
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
	};
}
