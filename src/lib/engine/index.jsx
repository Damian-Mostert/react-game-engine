import styles from "./styles/engine.module.css";
import { useEffect, useState } from "react";
import useStorage from "./hooks/use-storage";
import useFramerate from "./hooks/use-framerate";
import config_fr from "../../game/assets/config/framerates.ts";
import config_physics from "../../game/assets/config/physics.ts";
import Sprite from "./components/sprite";
import Boundary from "./components/boundary";
import Bot from "./components/bot";
import useKeys from "./hooks/use-keys";
import computePhysics from "./computations/compute-physics";
import useUniverse from "./hooks/use-universe";

const { game: Framerate, sprites: FramerateSprites } = config_fr;
const { blockSize, gravityForce, initialPosition, initialVelocity, checkDistance, airDensity, botsSpeed } = config_physics;

export default function Engine({ characters, textures, character, boundaries, paused, bots = [] }) {

  const framerateSprites = useFramerate(FramerateSprites, paused);

  const [storage, store] = useStorage(["coins"]);
  const { keys } = useKeys();
  const [botsKeys, setBotsKeys] = useState(bots.map((bot) => bot.actions[0]));
  const [botActionIndex, setBotActionIndex] = useState(bots.map(() => 0));

  const { message, health, maxHealth, game, setGame } = useUniverse({
    gravityForce,
    initialPosition,
    initialVelocity,
    checkDistance,
    airDensity,
    store,
    character: characters[character],
    keys,
    boundaries,
    blockSize,
    bots,
    bots_keys: bots.map((bot) => bot.actions[0]),
    characters,
    addBoundary: (rules) => {
      setGame((game) => ({
        ...game,
        boundaries: [...game.boundaries,{...rules,key:game.boundaries.length}],
      }));
    },
    updateBoundaryById : (id, rules) => {
      if (!rules) return;
      setGame((game) => ({
        ...game,
        boundaries: boundaries.map((__bound) => (__bound?.id === id ? rules : __bound)),
      }));
    },
    updateBoundaryByKey : (id, rules,remove) => {
      if (!rules) return;
      setGame((game) => ({
        ...game,
        boundaries: boundaries.map((__bound) => (__bound?.key === id ? rules : __bound)),
      }));
    },
    addCoins(amount = 1) {
      store("coins", storage.coins ? storage.coins + amount : amount);
    },
    removeCoins(amount = 1) {
      store("coins", storage.coins - amount >= 0 ? storage.coins - amount : 0);
    },
  });

  useEffect(() => {
    // Function to update game state and bot actions
    const updateGameState = () => {
      // Update bot action indices and bot keys
      setBotActionIndex((prevIndex) => {
        // Compute the new bot keys based on the previous action index
        // Update bots' keys
        setBotsKeys(()=>{
          const updatedBotKeys = prevIndex.map((index, i) => {
            const botActions = bots[i].actions;
          
            const nextActionIndex = (index + 1);
            if(nextActionIndex == botActions.length - 2){
              prevIndex[i] = 0;
              return botActions[0];
            }else{
              prevIndex[i] = nextActionIndex;
              return botActions[nextActionIndex];
            }
         
          });
      
          // Update game state
          setGame((prevGame) => {
            const updatedBots = prevGame.computed_bots.map((bot, i) => {
              // Update bot keys from the current botsKeys state
              bot.keys = updatedBotKeys[i];
              return bot;
            });
      
            // Preserve previous position
            window.position = prevGame.position;
            window.computed_bots = updatedBots;
      
            // Compute new game state
            return computePhysics({
              ...prevGame,
              keys: prevGame.dead ? { "died": true } : keys,
              computed_bots: window.computed_bots
            });

          });
          return updatedBotKeys;
        });
    
    
        return prevIndex;
      });
    };
    

    // Update game state at 30 FPS
    const gameInterval = setInterval(updateGameState, 1000 / 30);

    return () => {
      clearInterval(gameInterval);
    };
  }, [keys, bots, botActionIndex, botsSpeed]);

  useEffect(() => {
    console.log(botsKeys);
  }, [botsKeys]);

  useEffect(() => {
    console.log(botActionIndex);
  }, [botActionIndex]);



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
          {game.computed_bots.map((bot, index) => (
            <Bot key={index} game={bot} message={bot.message} framerate={framerateSprites} character={bot.character} actions={bot.keys} />
          ))}
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
