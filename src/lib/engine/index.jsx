import styles from "./styles/engine.module.css";
import useFramerate from "./hooks/use-framerate";
import config_fr from "../../game/assets/config/framerate.ts";
import config_physics from "../../game/assets/config/physics.ts";
import Sprite from "./components/sprite";
import Boundary from "./components/boundary";
import Bot from "./components/bot";
import useUniverse from "./hooks/use-universe";
import Sky from "./components/sky.jsx";
import computeShadows from "./computations/compute-physics/compute-shadows.js";
import useScreen from "./hooks/use-screen.js";
import useDayNightCycle from "./hooks/use-day-night-cycle.js";
const { game: Framerate, sprites: FramerateSprites } = config_fr;
const { blockSize, gravityForce, initialPosition, initialVelocity, checkDistance, airDensity, botsSpeed } = config_physics;


export default function Engine({ characters, textures, character, boundaries, paused, bots = [] }) {


	const framerateSprites = useFramerate(FramerateSprites, paused);

	const screen = useScreen();
  const filterBoundaries = (boundaries) => {
    // Screen dimensions and center based on character's position
    const { top: viewTop, left: viewLeft } = game.position;
    var { width: viewWidth, height: viewHeight } = screen;
  
    viewWidth += blockSize *12.3
    viewHeight += blockSize
    // Adjust for screen offset
    const screenOffsetTop = 80; // Screen is offset 80px from the top
    const screenOffsetLeft = -40; // Screen is offset -40px from the left
  
    // Calculate screen edges relative to character in the center
    const screenTop = viewTop - viewHeight / 2 - screenOffsetTop;
    const screenLeft = viewLeft - viewWidth / 2 - screenOffsetLeft;
    const screenBottom = screenTop + viewHeight + screenOffsetTop;
    const screenRight = screenLeft + viewWidth + Math.abs(screenOffsetLeft);
  
    return boundaries.filter((boundary) => {
      if (!boundary) return false;
  
      // Calculate boundary positions
      const boundTop = boundary.top * blockSize;
      const boundLeft = boundary.left * blockSize;
      const boundBottom = boundTop + boundary.height * blockSize;
      const boundRight = boundLeft + boundary.width * blockSize;
  
      // Check if the boundary intersects with the screen
      const intersectsHorizontally =
        boundLeft < screenRight && boundRight > screenLeft;
      const intersectsVertically =
        boundTop < screenBottom && boundBottom > screenTop;
  
      // Check if the boundary is within the visible screen area
      return intersectsHorizontally && intersectsVertically;
    });
  };
  
	const {game,message,storage,health,maxHealth} = useUniverse({
		...config_physics,
		bots,
		boundaries:boundaries,
		character,
		characters,
	});

	// Screen dimensions


	// Filter boundaries that are within the screen's view
  const viewLeft =game.position.left;
  const viewTop = game.position.top;

  const filteredBoundaries = filterBoundaries(game.boundaries);

  const {day,night,dawn} = useDayNightCycle();
  
  const shadows = computeShadows({
    blocks: filteredBoundaries,
    blockSize: 30, // Adjust block size as needed
    shadowDepth: 3,
    maxDarkness: night ? 1 : day ? 0.5 : dawn ? 0.8 : 0,
    shadowLength: 6,
    screen
  });
  
	return (
		<>
    <Sky day={day} night={night} dawn={dawn}/>
		<div className={styles.container}>
			<div className={styles["container-sub"]}>
				<div className={styles.object} style={{ position: "absolute", top: "80px", left: "-40px" }}>
					<div
						className={styles.character}
						style={{
							width: `${characters[character]?.width}px`,
							height: `${characters[character]?.height}px`,
						}}
					>
						{message && <div className={styles.bigMessage}>{message}</div>}
						<Sprite framerate={framerateSprites} character={characters[character]} action={game.action} />
					</div>
				</div>
				<div
					className={styles.object}
					style={{
						top: `${(viewTop - 80) * -1}px`,
						left: `${(viewLeft + 40) * -1}px`,
					}}
				>
					{game.computed_bots.map((bot, index) => (
						<Bot key={index} game={bot} message={bot.message} framerate={framerateSprites} character={bot.character} actions={bot.keys} />
					))}
          {shadows.map((boundary, index) => (
						<Boundary {...boundary} blockSize={blockSize} textures={textures} key={index} />
					))}
				</div>
			</div>
			<div className={styles.coins}>
				<div className="text-sm text-left pl-1 -mb-4">coins:</div>
				{storage.coins ? storage.coins : 0}
			</div>
			{characters[character] && (
				<div className={styles.healthBar}>
					<div className={styles.healthStats}>hp: {health}</div>
					<div className={styles.healthProgress} style={{ width: `${100 - (health / maxHealth) * 100}%` }} />
				</div>
			)}
		</div>
		</>
	);
}
