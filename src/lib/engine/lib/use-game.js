"use client";

import useKeys from "./use-keys";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";
import useSwipe from "./use-swipe";
import useSprite from "./use-sprite";
import getAction from "./get-action";

import config from "../config/framerates";
const {game:Framerate} = config;


export default function useGame({ boundaries = [],character = "", characters = {} }) {
	//create a frame rate state to trigger rendering;
	const framerate = useFramerate(Framerate);
	//get control keys;
	const keys = useKeys();

	const swipe = useSwipe();

	const physics = usePhysics({
		boundaries,
		keys,
		swipe,
		character:characters?.[character],
		framerate
	});

	const sprite = useSprite(characters[character],getAction(keys,swipe));

	return {
		sprite,
		swipe,
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
	};
}
