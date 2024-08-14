"use client";

import useKeys from "./use-keys";
import usePhysics from "./use-physics";
import useFramerate from "./use-framerate";
import useSwipe from "./use-swipe";
import useSprite from "./use-sprite";
import getAction from "./get-action";

import config from "../config/framerates";
import { useEffect, useState } from "react";
const {game:Framerate} = config;


export default function useGame({ boundaries = [],character = "", characters = {} }) {
	//create a frame rate state to trigger rendering;
	const framerate = useFramerate(Framerate);
	//get control keys;
	const {keys,lastKeys} = useKeys();

	const physics = usePhysics({
		boundaries,
		keys,
		character:characters?.[character],
		framerate
	});

	const action = getAction(keys,physics.velocity,character.attributes,lastKeys);

	const sprite = useSprite(characters[character],action.result,action.left);

	return {
		sprite,
		keys,
		boundaries: physics.position,
		closeBoundaries: physics.closeBoundaries,
	};
}
