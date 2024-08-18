"use client";
import styles from "../styles/engine.module.css";

import { useEffect, useState } from "react";
import Sprite from "./sprite";

import config_physics from "../../../assets/config/physics";
import computePhysics from "../computations/compute-physics";
import useCharacter from "../hooks/use-character";

const { 
	blockSize,
	gravityForce,
	initialPosition,
	initialVelocity,
	checkDistance,
	airDensity,
 } = config_physics;

 var speed = 1000;
 
export default function Bot({id,actions,framerate,character,characters,updateBoundaryById,updateBoundaryByKey,boundaries}){
	
	const [keys,setKeys] = useState({});
	const [index,setIndex] = useState(0);

	const {
		message,
		game,
		setGame,
	} = useCharacter({
		gravityForce,
		initialPosition,
		initialVelocity,
		checkDistance,
		airDensity,
		character: characters[character],
		keys,
		updateBoundaryById,
		updateBoundaryByKey,
		boundaries,
		blockSize,
		id,
		addCoins(amount = 1){},
		removeCoins(amount = 1){}
	});

	useEffect(()=>{
		if(game.dead)return;
		setGame(game=>computePhysics({...game,keys}));
	},[framerate]);

	useEffect(()=>{
		if(game.dead)return setKeys({});
		var t = setTimeout(()=>{
			setIndex(index=>{
				if(actions[index+1]){
					setKeys(actions[index+1]);
					return index +1;
				}else{
					setKeys(0);
					return 0;
				}
			})
		},speed);
		return ()=>{
			clearTimeout(t);
		}
	},[keys,actions,game.dead]);	

	return <div
		style={{
			position: "absolute",
			width: "0px",
			height: "0px",
			bottom: game.position.top * -1 + "px",
			left: game.position.left + "px",
		}}
			>
		{message && (
			<div className={styles.bigMessage}>
				{message}
			</div>
			)}
		<div className={styles.character}>
			<Sprite framerate={framerate} character={characters[character]} action={game.action}/>
		</div>
	</div>
}