"use client";
import styles from "../styles/engine.module.css";

import { useEffect, useState } from "react";
import Sprite from "./sprite";

import config_physics from "../../../assets/config/physics";
import computePhysics from "../computations/compute-physics";

const { 
	blockSize,
	gravityForce,
	initialPosition,
	initialVelocity,
	checkDistance,
	airDensity,
 } = config_physics;

export default function Bot({id,actions,framerate,character,characters,updateBoundary,boundaries}){

	const [message, setMessage] = useState("Fuck yeah");
	const [dead, setDead] = useState(false);
	const [health, setHp] = useState(characters[character]?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(characters[character]?.attributes?.health);
	const [keys, setKeys] = useState({});
	const [speed,setSpeed] = useState(1000);

	const [game,setGame] = useState(computePhysics({
		action:"idle",
		blockSize,
		gravityForce,
		initialPosition,
		initialVelocity,
		checkDistance,
		airDensity,
		boundaries,
		character:characters[character],
		updateBoundary, 
		attributes:characters[character].attributes,
		dead,
		actions:{
			updateBoundary,
			setDead,
			setHp,
			health,
			setSpeed,
			speed,
			setMessage,
			updateMessage(message) {
				setMessage(message);
			},
			addHp(amount = 1) {
				console.info(`bot ${id} +hp${amount}`)
				setHp((health) => Math.min(health + amount, maxHealth));
			},
			removeHp(amount = 1) {
				console.info(`bot ${id} -hp${amount}`)
				setHp((health) => Math.min(health - amount, 0));
			},
		},
		position:{
			top:0,
			left:0
		},
		velocity:{
			x:0,
			y:0
		},
		keys:{},
	}));

	useEffect(()=>{
		setGame(game=>computePhysics({...game,keys,dead,bot:game?.actions}));
	},[framerate]);


	useEffect(() => {
		if (characters[character]) {
			setHp(characters[character]?.attributes?.health);
			setMaxHp(characters[character]?.attributes?.health);
		}
	}, [character]);

	useEffect(() => {
		const t = setTimeout(() => {
			if (message) setMessage(null);
		}, 3000);
		return () => clearTimeout(t);
	}, [message]);


	useEffect(() => {
		if (health === 0) setDead(true);
	}, [health]);

	const [_,setIndex] = useState(0);

	useEffect(()=>{
		if(dead)return setKeys({});
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
		},1000);
		return ()=>{
			clearTimeout(t);
		}
	},[keys,speed,dead]);

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