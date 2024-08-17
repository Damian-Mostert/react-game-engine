"use client";

import usePhysics from "./use-physics";

export default function useBot({id,actions,keys, boundaries = [],character = "", characters = {}, paused = false ,updateBoundary , dead ,framerate}) {
	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate,
		updateBoundary,
		dead,
        bot:{...actions,id}
	});

	return {
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
		...physics,
	};
}

