import styles from "./styles/engine.module.css";
import { useEffect, useState } from "react";
import useStorage from "./hooks/use-storage";
import useFramerate from "./hooks/use-framerate";
import config_fr from "../../game/assets/config/framerate.ts";
import config_physics from "../../game/assets/config/physics.ts";
import Sprite from "./components/sprite";
import Boundary from "./components/boundary";
import Bot from "./components/bot";
import useKeys from "./hooks/use-keys";
import computePhysics from "./computations/compute-physics";
import useUniverse from "./hooks/use-universe";
import Sky from "./components/sky.jsx";

const { game: Framerate, sprites: FramerateSprites } = config_fr;
const { blockSize, gravityForce, initialPosition, initialVelocity, checkDistance, airDensity, botsSpeed } = config_physics;

export default function Engine({ characters, textures, character, boundaries, paused, bots = [] }) {

  const framerateSprites = useFramerate(FramerateSprites, paused);

  const {game,message,storage,health,maxHealth} = useUniverse({
    ...config_physics,
    bots,
    boundaries,
    character,
    characters
  });

  return (
    <>
    <Sky/>
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
            top: `${(game.position.top - 80) * -1}px`,
            left: `${(game.position.left + 40) * -1}px`,
          }}
        >
          {game.computed_bots.map((bot, index) => (
            <Bot key={index} game={bot} message={bot.message} framerate={framerateSprites} character={bot.character} actions={bot.keys} />
          ))}
          {game.boundaries.filter((b) => !b.hide).map((boundary, index) => (
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
