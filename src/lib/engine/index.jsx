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
import useUniverse from "./hooks/use-universe";

const { game: Framerate, sprites: FramerateSprites } = config_fr;
const { blockSize, gravityForce, initialPosition, initialVelocity, checkDistance, airDensity, botsSpeed } = config_physics;

export default function Engine({ characters, textures, character, boundaries, paused, bots = [] }) {
  const updateBoundaryById = (id, rules) => {
    if (!rules) return;
    setGame((game) => ({
      ...game,
      boundaries: boundaries.map((__bound) => (__bound?.id === id ? rules : __bound)),
    }));
  };

  const updateBoundaryByKey = (id, rules) => {
    if (!rules) return;
    setGame((game) => ({
      ...game,
      boundaries: boundaries.map((__bound) => (__bound?.key === id ? rules : __bound)),
    }));
  };

  const framerateSprites = useFramerate(FramerateSprites, paused);

  const [storage, store] = useStorage(["coins"]);
  const { keys } = useKeys();
  const [botsKeys, setBotsKeys] = useState(bots.map((bot) => bot.actions[0]));

  const { message, health, maxHealth, game, setGame } = useUniverse({
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
    bots,
    bots_keys: bots.map((bot) => bot.actions[0]),
    characters,
    addCoins(amount = 1) {
      store("coins", storage.coins ? storage.coins + amount : amount);
    },
    removeCoins(amount = 1) {
      store("coins", storage.coins - amount >= 0 ? storage.coins - amount : 0);
    },
  });

  // UseEffect to update the game state with the current character's position and velocity
  useEffect(() => {
    const i = setInterval(()=>{
      if (game.dead && game.keys["died"]) return;
      setGame((prevGame) => {
        window.position = prevGame.position;
        window.computed_bots = prevGame.computed_bots
        return computePhysics({
        ...prevGame,
        keys: game.dead ? { "died": true } : keys,
      })
    });
    },1000 / 40)
    return () =>clearInterval(i)
  }, [keys]); // Trigger the effect on

  // Handle bot actions switching over time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setBotsKeys((prevBotsKeys) =>
        prevBotsKeys.map((currentAction, index) => {
          const botActions = bots[index].actions;
          if (!botActions || botActions.length === 0) return currentAction;
          const nextActionIndex = (botActions.indexOf(currentAction) + 1) % botActions.length;
          return botActions[nextActionIndex];
        })
      );
    }, botsSpeed);
    return () => clearInterval(intervalId);
  }, [bots]);

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
          {game.boundaries.filter((b) => !b.hide).map((boundary, index) => (
            <Boundary {...boundary} blockSize={blockSize} textures={textures} key={index} />
          ))}
          {game.computed_bots.map((bot, index) => {
           return <Bot key={index} game={bot} message={bot.message} framerate={framerateSprites} character={bot.character} actions={bot.actions} />
          })}
        </div>
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
  );
}
