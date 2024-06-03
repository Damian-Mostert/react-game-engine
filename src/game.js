import { useState } from "react";

import Engine from "./lib/engine/components";
import characters from "./lib/resources/characters";
import backgrounds from "./lib/resources/backgrounds";
import textures from "./lib/resources/textures";
import CharacterSelect from "./character-select";

export default function Game() {
  const [character, setCharacter] = useState(null);

  return (
    <main>
      {character && (
        <div style={{ display: "flex", width: "100%", height: "100%" }}>
          <div />
          <Engine
            backgrounds={backgrounds}
            characters={characters}
            character={character}
            textures={textures}
            boundries={boundries}
            background={"Night"}
          />
        </div>
      )}
      {!character && (
        <CharacterSelect characters={characters} setCharacter={setCharacter} />
      )}
    </main>
  );
}


const createSlope = (
  top,
  left,
  length,
  height,
  reverse,
  orientation,
  texture
) => {
  if (orientation === "horizontal") {
    if (reverse) {
      return Array.from({ length: length }).map((_, i) => {
        return {
          top: top,
          left: left - i,
          width: 1,
          height: height - i,
          texture,
        };
      });
    }
    return Array.from({ length: length }).map((_, i) => {
      return {
        top: top,
        left: left + i,
        width: 1,
        height: height - i,
        texture,
      };
    });
  } else if (orientation === "vertical") {
    if (reverse) {
      return Array.from({ length: height }).map((_, i) => {
        return {
          top: top + i,
          left: left,
          width: length - i,
          height: 1,
          texture,
        };
      });
    }
    return Array.from({ length: height }).map((_, i) => {
      return {
        top: top - i,
        left: left,
        width: length - i,
        height: 1,
        texture,
      };
    });
  }
};

const createQuarterCircle = (
  top,
  left,
  radius,
  reverse,
  orientation,
  texture
) => {
  const segments = [];
  const step = 1; // Step size for iteration

  if (orientation === "horizontal") {
    for (let i = 0; i <= radius; i += step) {
      const height = Math.sqrt(radius * radius - i * i);
      segments.push({
        top: reverse ? top + Math.floor(height) : top - Math.floor(height),
        left: left + i,
        width: 1,
        height: Math.floor(height),
        texture,
      });
    }
  } else if (orientation === "vertical") {
    for (let i = 0; i <= radius; i += step) {
      const width = Math.sqrt(radius * radius - i * i);
      segments.push({
        top: top + i,
        left: reverse ? left + Math.floor(width) : left - Math.floor(width),
        width: Math.floor(width),
        height: 1,
        texture,
      });
    }
  }

  return segments;
};

const boundries = [
  {
    top:1010,
    left: -450,
    width: 900,
    height: 1,
    texture: "Dirt",
  },
  // Horizontal slope, reverse false
  ...createSlope(40, 0, 40, 40, false, "horizontal", "Dirt"),
  // Horizontal slope, reverse true
  ...createSlope(40, 40, 40, 40, true, "horizontal", "Dirt"),
  // Vertical slope, reverse false
  ...createSlope(80, 0, 40, 40, false, "vertical", "Dirt"),
  // Vertical slope, reverse true
  
  // Quarter circle, horizontal, reverse false
  ...createQuarterCircle(120, -40, 40, false, "horizontal", "Dirt"),
  // Quarter circle, vertical, reverse false
  ...createQuarterCircle(120, -40, 40, true, "vertical", "Dirt"),
];


console.log(boundries);

