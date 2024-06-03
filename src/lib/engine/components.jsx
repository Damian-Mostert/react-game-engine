import styles from "./engine.module.css";
import useGame from "./script";



	export function Boundary({
		top,
		left,
		width,
		height,
		texture,
		align,
		textures,
		blocksize,
	}) {
		return (
			<div
				style={{
					transform: align == "right" ? "scaleX(-1)" : "",
					position: "absolute",
					width: `${width * blocksize}px`,
					height: `${height * blocksize}px`,
					top: `${top * blocksize}px`,
					left: `${left * blocksize}px`,
					backgroundImage: `url(${textures[texture]})`,
					backgroundSize: `${blocksize}px ${blocksize}px`,
					backgroundRepeat: "repeat",
				}}
			/>
		);
	}

	export default function Engine({
		backgrounds,
		characters,
		textures,
		character,
		boundries,
		background,
	}) {
		const game = useGame({ boundries, character, characters });


		return (
			<div
                className={styles.container}
				style={{
					backgroundImage: `url(${backgrounds[background]})`,
					backgroundPositionY: game.boundries.top * -1 + "px",
					backgroundPositionX: game.boundries.left * -1 + "px",
				}}
			>
				<div
					className={styles['container-sub']}
				>
					<div
                        className={styles.object}
						style={{
							top: (game.boundries.top - 80) * -1 + "px",
							left: (game.boundries.left + 40) * -1 + "px",
						}}
					>
						{boundries.map((boundary, index) => {
							return (
								<Boundary
									{...boundary}
									blocksize={20}
									textures={textures}
									key={index}
								/>
							);
						})}
						{game?.players &&
							Object.keys(game.players).map((key) => {
								const player = game.players[key];
								return (
									<div
										key={key}
                                        className={styles.object}
										style={{
											bottom: player.top * -1 + "px",
											left: player.left + "px",
										}}
									>
										<div
											style={{
												width: player.character?.width + "px",
												height: player.character?.height + "px",
												display: "flex",
												backgroundSize: "contain",
												backgroundImage: `url(${player.character?.image})`,
												transform: player.direction === 3 ? "scaleX(-1)" : "",
											}}
										/>
									</div>
								);
							})}
					</div>
				</div>

			</div>
		);
	}

