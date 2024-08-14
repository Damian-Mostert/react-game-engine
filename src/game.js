import { useState } from "react";

import Engine from "./lib/engine/components/engine";
import characters from "./lib/resources/characters";
import textures from "./lib/resources/textures";
import levels from "./lib/resources/levels/_load";
import CharacterSelect from "./lib/menus/character-select";
import LevelSelect from "./lib/menus/levels";
import PauseMenu from "./lib/menus/puase";

export default function Game() {
  const [character, setCharacter] = useState(null);
  const [level,setLevel] = useState(null);

  
  return (
    <main>
      {level && <>      
        {character && (
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <Engine
              characters={characters}
              character={character}
              textures={textures}
              boundaries={levels[level]}
              />
            <PauseMenu/>
          </div>
      )}
      {!character && (
        <CharacterSelect characters={characters} setCharacter={setCharacter} />
      )}
      </>}
      {!level && <LevelSelect levels={levels} setLevel={setLevel} />}
    </main>
  );
}






