import styles from "./engine.module.css";
import useGame from "../use-game";
import { useEffect, useState } from "react";
import useStorage from "../use-storage";
import useMusic from "../use-music";
import useFramerate from "../use-framerate";
import config_fr from "../config/framerates";
import config_physics from "../config/framerates";
import Sprite from "./sprite";
import Boundary from "./boundary";
import Bot from "./bot";

const { game:Framerate } = config_fr;
const { blocksize } = config_physics;


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

	useEffect(() => {
		if (characters[character]) {
			setHp(characters[character]?.attributes?.health);
			setMaxHp(characters[character]?.attributes?.health);
		}
	}, [character]);

	useEffect(() => {
		if (health === 0) setDead(true);
	}, [health]);

	const updateBoundary = (id, rules) => {
		if (!rules) return;
		setBounds((boundaries) =>
			boundaries.map((__bound) =>
				__bound?.id === id ? rules : __bound
			)
		);
	};

	const [storage, store] = useStorage(["coins"]);
	const [message, setMessage] = useState(null);
	const [Bounds, setBounds] = useState(boundaries);

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
			updateBoundary,
		};
	}, [storage]);

	useEffect(() => {
		const t = setTimeout(() => {
			if (message) setMessage(null);
		}, 3000);
		return () => clearTimeout(t);
	}, [message]);

	const framerate = useFramerate(Framerate, paused ? paused : dead);

	const game = useGame({ boundaries: Bounds, character, characters, paused, updateBoundary, dead ,framerate});

	return (
		<div className={styles.container}>
			<div className={styles["container-sub"]}>
				<div
					className={styles.object}
					style={{
						top: `${(game.boundaries.top - 80) * -1}px`,
						left: `${(game.boundaries.left + 40) * -1}px`,
					}}
				>
					{Bounds.filter(b=>!b.hide).map((boundary, index) => (<Boundary
						{...boundary}
						blocksize={blocksize}
						textures={textures}
						key={index}
					/>))}
					{bots.map((bot,index)=>(<Bot 
						key={index}
						id={index}
						framerate={framerate}
						character={bot.character}
						characters={characters}
						Bounds={Bounds}
						paused={paused}
						updateBoundary={updateBoundary}
						actions={bot.actions}
						musicControls={musicControls}
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
						<Sprite character={characters[character]} action={game.action}/>
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
