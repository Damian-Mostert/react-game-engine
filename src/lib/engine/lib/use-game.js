"use client";

import useKeys from "./use-keys";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";
import useSprite from "./use-sprite";
import getAction from "./get-action";

import config from "../config/framerates";
const {game:Framerate} = config;


export default function useGame({ boundaries = [],character = "", characters = {}, paused = false ,updateBoundary,dead}) {
	//create a frame rate state to trigger rendering;
	const framerate = useFramerate(Framerate,paused ? paused :dead);
	//get control keys;
	const {keys,lastKeys} = useKeys();

	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate,
		updateBoundary,
		dead
	});

	const action = getAction(
		keys,
		physics.velocity,
		characters[character].attributes,
		lastKeys,
		physics.isJumping,
		dead);

	const sprite = useSprite(
		characters[character],
		action.result,
		action.left,
		paused,
		dead);

	return {
		sprite,
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
	};
}
