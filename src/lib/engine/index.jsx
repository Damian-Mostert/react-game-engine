import styles from "./styles/engine.module.css";

import { useEffect, useState } from "react";
import useStorage from "./hooks/use-storage";
import useMusic from "./hooks/use-music";
import useFramerate from "./hooks/use-framerate";
import config_fr from "../../assets/config/framerates";
import config_physics from "../../assets/config/physics";
import Sprite from "./components/sprite";
import Boundary from "./components/boundary";
import Bot from "./components/bot";
import useKeys from "./hooks/use-keys";
import computePhysics from "./computations/compute-physics";

const { game:Framerate } = config_fr;
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

	const { controls: musicControls } = useMusic([]);

	const [dead, setDead] = useState(false);
	const [health, setHp] = useState(characters[character]?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(characters[character]?.attributes?.health);

	const [storage, store] = useStorage(["coins"]);
	const [message, setMessage] = useState(null);

	const updateBoundary = (id, rules) => {
		if (!rules) return;
		/* setBounds((boundaries) =>
			boundaries.map((__bound) =>
				__bound?.id === id ? rules : __bound
			)
		); */
	};


	useEffect(() => {
		if (characters[character]) {
			setHp(characters[character]?.attributes?.health);
			setMaxHp(characters[character]?.attributes?.health);
		}
	}, [character]);

	useEffect(() => {
		if (health === 0) setDead(true);
	}, [health]);


	useEffect(() => {
		window.gameDom = {
			...window.gameDom,
			updateMessage(message) {
				setMessage(message);
			},
			addCoins(amount = 1) {
				store("coins", storage.coins ? storage.coins + amount : amount);
			},
			addHp(amount = 1) {
				setHp((health) => Math.min(health + amount, maxHealth));
			},
			removeHp(amount = 1) {
				setHp((health) => Math.max(health - amount, 0));
			},
			playSound(audioFile) {
				musicControls.playTrack(`/sounds/${audioFile}`);
			},
			setDead,
			setMessage,
			setHp,
			updateBoundary,
		};
	}, [storage]);

	useEffect(() => {
		const t = setTimeout(() => {
			if (message) setMessage(null);
		}, 3000);
		return () => clearTimeout(t);
	}, [message]);

	//MAIN ENGINE
	
	useKeys();

	const framerate = useFramerate(Framerate, paused ? paused : dead);

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
		setGame(game=>computePhysics({...game,keys:window.keys,dead}));
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
						framerate={framerate}
						character={bot.character}
						characters={characters}
						paused={paused}
						boundaries={boundaries}
						updateBoundary={updateBoundary}
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
