"use client";

import useKeys from "./use-keys";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";
import useSprite from "./use-sprite";




export default function useBot({keys, boundaries = [],character = "", characters = {}, paused = false ,updateBoundary , dead ,framerate}) {


	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate,
		updateBoundary,
		dead
	});

	const sprite = useSprite(characters[character],physics.action);

	return {
		sprite,
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
		...physics,
	};
}

