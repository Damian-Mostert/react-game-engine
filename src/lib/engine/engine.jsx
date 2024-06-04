"use client";

import styles from "./engine.module.css";
import useGame from "./lib/use-game";

export function Boundary({
  top,
  left,
  width,
  height,
  texture,
  align,
  textures,
  blocksize,
  closeBoundarie,
}) {
  if (closeBoundarie) {
    return (
      <div
        style={{
          transform: align == "right" ? "scaleX(-1)" : "",
          position: "absolute",
          width: `${width * blocksize}px`,
          height: `${height * blocksize}px`,
          top: `${top * blocksize}px`,
          left: `${left * blocksize}px`,
          background:"red"
        }}
      />
    );
  }
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
        //background:closeBoundarie?"red": null
      }}
    />
  );
}

export default function Engine({
  characters,
  textures,
  character,
  boundaries,
}) {
  const game = useGame({ boundaries, character, characters });

  return (
    <div className={styles.container}>
      <div className={styles["container-sub"]}>
        <div
          className={styles.object}
          style={{
            top: (game.boundaries.top - 80) * -1 + "px",
            left: (game.boundaries.left + 40) * -1 + "px",
          }}
        >
          {boundaries.map((boundary, index) => {
            return (
              <Boundary
                {...boundary}
                blocksize={20}
                textures={textures}
                key={index}
              />
            );
          })}
          {game.closeBoundaries.map((boundary, index) => {
            return (
              <Boundary
                {...boundary}
                closeBoundarie={true}
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
                    className={styles.character}
                    style={{
                      width: player.character?.width + "px",
                      height: player.character?.height + "px",
                      backgroundImage: `url(${player.character?.image})`,
                      transform: player?.keys?.a ? "scaleX(-1)" : "",
                    }}
                  />
                </div>
              );
            })}
        </div>
        <div
          className={styles.object}
          style={{ position: "absolute", top: "80px", left: "-40px" }}
        >
          <div
            className={styles.character}
            style={{
              width: characters[character]?.width + "px",
              height: characters[character]?.height + "px",
              backgroundImage: `url(${characters[character]?.image})`,
              transform: game.keys?.a ? "scaleX(-1)" : "",
            }}
          />
        </div>
      </div>
    </div>
  );
}
