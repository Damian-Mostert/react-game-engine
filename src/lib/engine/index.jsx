import styles from "./styles/engine.module.css";

import { useEffect, useState } from "react";
import useStorage from "./hooks/use-storage";
import useFramerate from "./hooks/use-framerate";
import config_fr from "../../assets/config/framerates";
import config_physics from "../../assets/config/physics";
import Sprite from "./components/sprite";
import Boundary from "./components/boundary";
import Bot from "./components/bot";
import useKeys from "./hooks/use-keys";
import computePhysics from "./computations/compute-physics";
import useCharacter from "./hooks/use-character";

const { game:Framerate,sprites:FramerateSprites } = config_fr;

const { 
	blockSize,
	gravityForce,
	initialPosition,
	initialVelocity,
	checkDistance,
	airDensity,
	} = config_physics;

export default function Engine({
	characters,
	textures,
	character,
	boundaries,
	paused,
	bots =[]
}) {
	
	const updateBoundaryById = (id, rules) => {
		return
		if (!rules) return;
		setGame((game) =>({...game,boundaries:boundaries.map((__bound) =>__bound?.id === id ? rules : __bound)}));
	};
	const updateBoundaryByKey = (id, rules) => {
		return
		if (!rules) return;
		setGame((game) =>({...game,boundaries:boundaries.map((__bound) =>__bound?.key === id ? rules : __bound)}));
	};

	const framerate = useFramerate(Framerate, paused);
	const framerateSprites = useFramerate(FramerateSprites, paused);
	const [ storage, store ] = useStorage(["coins"]);
	const { keys } = useKeys();
	
	const {
		message,
		health,
		maxHealth,
		game,
		setGame,
	} = useCharacter({
		gravityForce,
		initialPosition,
		initialVelocity,
		checkDistance,
		airDensity,
		store,
		character: characters[character],
		keys,
		updateBoundaryById,
		updateBoundaryByKey,
		boundaries,
		blockSize,
		addCoins(amount = 1){
			store("coins",storage.coins + amount)
		},
		removeCoins(amount = 1){
			store("coins",(storage.coins - amount) >= 0 ? storage.coins : 0);
		}
	});

	useEffect(()=>{
		if(game.dead)return;
		setGame(game=>computePhysics({...game,keys}));
	},[framerate]);

	return (
		<div className={styles.container}>
			<div className={styles["container-sub"]}>
				<div
					className={styles.object}
					style={{
						top: `${(game.position.top - 80) * -1}px`,
						left: `${(game.position.left + 40) * -1}px`,
					}}
				>
					{game.boundaries.filter(b=>!b.hide).map((boundary, index) => (<Boundary
						{...boundary}
						blockSize={blockSize}
						textures={textures}
						key={index}
					/>))}
					{bots.map((bot,index)=>(<Bot 
						key={index}
						id={index}
						framerate={framerateSprites}
						character={bot.character}
						characters={characters}
						paused={paused}
						boundaries={boundaries}
						updateBoundaryById={updateBoundaryById}
						updateBoundaryByKey={updateBoundaryByKey}
						actions={bot.actions}
					/>))}
				</div>
				<div
					className={styles.object}
					style={{ position: "absolute", top: "80px", left: "-40px" }}
				>
					<div
						className={styles.character}
						style={{
							width: `${characters[character]?.width}px`,
							height: `${characters[character]?.height}px`,
						}}
					>
						{message && (
							<div className={styles.bigMessage}>
								{message}
							</div>
						)}
						<Sprite framerate={framerate} character={characters[character]} action={game.action}/>
					</div>
				</div>
			</div>
			<div className={styles.coins}>
				<div className="text-sm text-left pl-1 -mb-4">coins:</div>
				{storage.coins ? storage.coins : 0}
			</div>
			{characters[character] && (
				<div className={styles.healthBar}>
					<div className={styles.healthStats}>hp: {health}</div>
					<div
						className={styles.healthProgress}
						style={{ width: `${100 - (health / maxHealth) * 100}%` }}
					/>
				</div>
			)}
		</div>
	);
}
