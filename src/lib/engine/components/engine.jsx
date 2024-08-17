import styles from "./engine.module.css";
import useGame from "../use-game";
import { useEffect, useState } from "react";
import useStorage from "../use-storage";
import useMusic from "../use-music";
import useBot from "../use-bot";
import useFramerate from "../use-framerate";
import config from "../config/framerates";
const {game:Framerate} = config;

export function Boundary({
	top,
	left,
	width,
	height,
	texture,
	align,
	textures,
	blocksize,
	message
}) {
	return (
		<div
			style={{
				transform: align === "right" ? "scaleX(-1)" : "",
				position: "absolute",
				width: `${width * blocksize}px`,
				height: `${height * blocksize}px`,
				top: `${top * blocksize}px`,
				left: `${left * blocksize}px`,
				backgroundImage: `url(${textures[texture]})`,
				backgroundSize: `${blocksize}px ${blocksize}px`,
				backgroundRepeat: "repeat",
			}}
		>
			{message && (
				<div className="absolute bottom-full text-orange-2a00">
					{message}
				</div>
			)}
		</div>
	);
}

const keysMap = [
	{
		w:true,
	},
	{
		w:true,
	},
	{
		w:true,
	},
	{
		a:true,
	},
	{
		a:true,
	},
	{
		d:true
	},
	{
		d:true
	}

]

export default function Engine({
	characters,
	textures,
	character,
	boundaries,
	paused
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
			updateBigMessage(message) {
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
		}, 1000);
		return () => clearTimeout(t);
	}, [message]);

	const [keys, setKeys] = useState({});
	const framerate = useFramerate(Framerate,paused ? paused :dead);
	const game = useGame({ boundaries: Bounds, character, characters, paused, updateBoundary, dead ,framerate});
	const bot = useBot({ keys, boundaries: Bounds, character:"Santa Clause", characters, paused, updateBoundary, dead,framerate });
	const [index,setIndex] = useState(0);
	useEffect(()=>{
		var t = setTimeout(()=>{
			setIndex(index=>{
				if(keysMap[index+1]){
					setKeys(keysMap[index+1]);
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
	},[keys]);
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
					{Bounds.map((boundary, index) => {
						if (boundary.destroy) return null;
						return (
							<Boundary
								{...boundary}
								blocksize={30}
								textures={textures}
								key={index}
							/>
						);
					})}
				<div
                  style={{
                    transition: "left 0.1s, top 0.1s",
                    position: "absolute",
                    width: "0px",
                    height: "0px",
                    bottom: bot.boundaries.top * -1 + "px",
                    left: bot.boundaries.left + "px",
                  }}
                >
						<div className={styles.character}>
							{bot.sprite}
						</div>
					</div>
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
						{game.sprite}
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
