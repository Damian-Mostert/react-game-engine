"use client";

import { useEffect, useState } from "react";
import { Joystick } from "react-joystick-component";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");


function useGame({ boundries, character, characters, direction }) {
  const [players, setPlayers] = useState({});
  const [myId, setMyId] = useState("");
  const [isJumping, setIsJumping] = useState(false);
  const [velocityY, setVelocityY] = useState(0); // Vertical velocity
  const [velocityX, setVelocityX] = useState(0); // Horizontal velocity
  const characterWidth = characters[character].width; // Default width 40px
  const characterHeight = characters[character].height; // Default height 80px
  const [lastKeyPress, setLastKeyPress] = useState("");
  const blockSize = 20; // Define block size as 20px

  // Maximum horizontal velocity
  const maxVelocityX = 10; // Adjust as needed

const applyHorizontalMovement = (direction) => {
  // Calculate new horizontal velocity
  const newVelocityX = direction === "left" ? -maxVelocityX : maxVelocityX;

  // Calculate new horizontal position based on velocity
  let newBoundaries = { ...Boundries };
  newBoundaries.left += newVelocityX;

  // Check for collisions with boundaries
  const { ok, adjustment } = checkBoundries(newBoundaries, direction);

  // If collision detected, adjust position
  if (!ok) {
    newBoundaries.left += adjustment.left;
  }
  console.log(newBoundaries)
  // Update state with new position and velocity
  setBoundries(newBoundaries);
  setVelocityX(newVelocityX);
};


  useEffect(() => {
    socket.on("id", (id) => setMyId(id));
    socket.on("players", (players) => setPlayers(players));
    socket.on("client", (data) => {
      var Players = { ...players };
      if (myId && myId !== data.id) Players[data.id] = data;
      setPlayers(Players);
    });

    return () => {
      socket.off("id");
      socket.off("players");
      socket.off("client");
    };
  }, [myId, players]);

  const checkBoundries = (bounds, direction) => {
    let ok = true;
    let adjustment = { top: 0, left: 0 };

    boundries.forEach((__bound) => {
      const boundTop = __bound.top * blockSize;
      const boundLeft = __bound.left * blockSize;
      const boundBottom = boundTop + __bound.height * blockSize;
      const boundRight = boundLeft + __bound.width * blockSize;

      switch (direction) {
        case "up":
          if (
            bounds.top < boundBottom &&
            bounds.top + characterHeight > boundTop &&
            bounds.left < boundRight &&
            bounds.left + characterWidth > boundLeft
          ) {
            if(__bound.pass){
              if(__bound.onEnter)__bound.onEnter();
            }else{
              ok = false;
              adjustment.top = boundBottom - bounds.top;
            }
          }
          break;
        case "down":
          if (
            bounds.top + characterHeight > boundTop &&
            bounds.top < boundBottom &&
            bounds.left < boundRight &&
            bounds.left + characterWidth > boundLeft
          ) {
            ok = false;
            adjustment.top = boundTop - (bounds.top + characterHeight);
          }
          break;
        case "left":
          if (
            bounds.left < boundRight &&
            bounds.left + characterWidth > boundLeft &&
            bounds.top < boundBottom &&
            bounds.top + characterHeight > boundTop
          ) {
            ok = false;
            adjustment.left = boundRight - bounds.left;
            jump(3);
          }
          break;
        case "right":
          if (
            bounds.left + characterWidth > boundLeft &&
            bounds.left < boundRight &&
            bounds.top < boundBottom &&
            bounds.top + characterHeight > boundTop
          ) {
            ok = false;
            adjustment.left = boundLeft - (bounds.left + characterWidth);
            jump(3);
          }
          break;
        default:
          break;
      }
    });

    return { ok, adjustment };
  };

  const [Boundries, setBoundriesState] = useState({
    top: 0,
    left: 0,
  });

  const setBoundries = (boundries) => {
    if (boundries.top !== Boundries.top || boundries.left !== Boundries.left) {
      setBoundriesState(boundries);
    }
  };

  const applyGravity = () => {
    let newVelocityY = velocityY + 0.2; // Gravity strength
    const maxVelocityY = 50; // Max downward velocity
    newVelocityY = Math.min(newVelocityY, maxVelocityY);

    let newBoundaries = { ...Boundries };
    newBoundaries.top += newVelocityY;

    const { ok, adjustment } = checkBoundries(newBoundaries, "down");

    if (!ok) {
      newBoundaries.top += adjustment.top;
      newVelocityY = 0;
      setIsJumping(false);
    }

    setBoundries(newBoundaries);
    setVelocityY(newVelocityY);
  };

  useEffect(() => {
    const gravityInterval = setInterval(() => {
      applyGravity();
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gravityInterval);
  }, [Boundries, isJumping]);

  const jump = (blocks = 6) => {
    if (isJumping) return;
    setIsJumping(true);

    let newBoundries = { ...Boundries };
    newBoundries.top -= blockSize * blocks;
    const { ok, adjustment } = checkBoundries(newBoundries, "up");
    const { ok2 } = checkBoundries({left:Boundries.left+1,top:Boundries.top+1}, "up");

    if (ok && ok2) {
      setBoundries(newBoundries);
    } else {
      setBoundries({
        ...newBoundries,
        top: newBoundries.top + adjustment.top,
      });
    }
  };

  const keyPressListener = (ev) => {
    setLastKeyPress(ev.key);
    switch (ev.key.toLowerCase()) {
      case "w":
      case " ":
        jump();
        break;
      case "a":
        applyHorizontalMovement("left");
        break;
      case "d":
        applyHorizontalMovement("right");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Boundries.character = characters[character];
    switch (lastKeyPress.toLowerCase()) {
      case "w":
      case " ":
        Boundries.direction = 1;
        break;
      case "s":
        Boundries.direction = 2;
        break;
      case "a":
        Boundries.direction = 3;
        break;
      case "d":
        Boundries.direction = 4;
        break;
      default:
        break;
    }
    socket.emit("server", Boundries);

    window.addEventListener("keypress", keyPressListener);

    return () => {
      window.removeEventListener("keypress", keyPressListener);
    };
  }, [Boundries, lastKeyPress, characters, character, velocityX, velocityY]);

  return {
    players,
    controls: {
      jump,
    },
    boundries: Boundries,
  };
}


function Boundary({
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
  const [direction, setDirection] = useState(null);
  const game = useGame({ boundries, character, characters, direction });
  
  const handleStart = (data) => {
    setDirection(data.direction);
  };
  const handleMove = (data) => {
    console.log(data);
    setDirection(data.direction);
  };
  const handleStop = () => {
    setDirection(null);
  };

  return (
    <div
      id="container"
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.1s",
        backgroundSize: "contain",
        backgroundImage: `url(${backgrounds[background]})`,
        backgroundPositionY: game.boundries.top * -1 + "px",
        backgroundPositionX: game.boundries.left * -1 + "px",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "0px",
          minWidth: "0px",
        }}
      >
        <div
          style={{
            transition: "left 0.1s, top 0.1s",
            position: "absolute",
            width: "0px",
            height: "0px",
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
                  style={{
                    transition: "left 0.1s, top 0.1s",
                    position: "absolute",
                    width: "0px",
                    height: "0px",
                    bottom: player.top * -1 + "px",
                    left: player.left + "px",
                  }}
                >
                  <div
                    className="character"
                    style={{
                      width: player.character?.width + "px",
                      height: player.character?.height + "px",
                      display: "flex",
                      backgroundSize: "contain",
                      backgroundColor:"#cae962",
                      backgroundImage: `url(${player.character?.image})`,
                      transform: player.direction === 3 ? "scaleX(-1)" : "",
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "0rem",
          right: "0rem",
          scale: "0.5",
        }}
      >
        <Joystick
          stickSize={50}
          size={100}
          sticky={true}
          baseColor="#222"
          stickColor="#444"
          start={handleStart}
          move={handleMove}
          stop={handleStop}
        ></Joystick>
      </div>
    </div>
  );
}
