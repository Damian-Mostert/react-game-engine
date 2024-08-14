"use client";

import styles from "./engine.module.css";
import useGame from "../lib/use-game";
import useSprite from "../lib/use-sprite";

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
          background:"#a60e0050"
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
      }}
    />
  );
}

export default function Engine({
  characters,
  textures,
  character,
  boundaries,
  paused
}) {
  const game = useGame({ boundaries, character, characters, paused });

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
                blocksize={30}
                textures={textures}
                key={index}
              />
            );
          })}
                    {boundaries.map((boundary, index) => {
            return (
              <Boundary
                {...boundary}
                blocksize={30}
                textures={textures}
                key={index}
              />
            );
          })} 
          {/* {game.closeBoundaries.map((boundary, index) => {
            return (
              <Boundary
                {...boundary}
                closeBoundarie={true}
                blocksize={30}
                textures={textures}
                key={index}
              />
            );
          })}  */}
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
            }}
          >
            <div className="absolute bottom-full w-max text-white text-[0.8rem]">
            {character}
            </div>
            {game.sprite}
          </div>
        </div>
      </div>
    </div>
  );
}
