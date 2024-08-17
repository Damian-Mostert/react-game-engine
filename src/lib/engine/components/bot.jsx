"use client";
import styles from "./engine.module.css";

import useBot from "../use-bot";
import { useEffect, useState } from "react";
import Sprite from "./sprite";

export default function Bot({id,actions,framerate,character,characters,paused,updateBoundary,Bounds,musicControls}){

	const [message, setMessage] = useState("Fuck yeah");
	const [dead, setDead] = useState(false);
	const [health, setHp] = useState(characters[character]?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(characters[character]?.attributes?.health);
	const [keys, setKeys] = useState({});
	const [speed,setSpeed] = useState(1000);
	
    const bot = useBot({
		id,
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
		playSound(audioFile) {
			musicControls.playTrack(`/sounds/${audioFile}`);
		},
	}, keys, boundaries: Bounds, character:"Santa Clause", characters, paused, updateBoundary, dead,framerate });


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
			transition: "left 0.1s, top 0.1s",
			position: "absolute",
			width: "0px",
			height: "0px",
			bottom: bot.boundaries.top * -1 + "px",
			left: bot.boundaries.left + "px",
		}}
			>
		{message && (
			<div className={styles.bigMessage}>
				{message}
			</div>
			)}
		<div className={styles.character}>
			<Sprite character={characters[character]} action={bot.action}/>
		</div>
	</div>
}