//load characters:
import jack from "./characters/jack";
import knight from "./characters/knight";
import ninja from "./characters/ninja";
import redHat from "./characters/red-hat"
import santa from "./characters/santa";
import zombieFemale from "./characters/zombie-female";
import zombieMale from "./characters/zombie-male";
///load textures:
import Grass from "./textures/grass.png";
import Dirt from "./textures/dirt.jpg";
import Stairs from "./textures/stairs.png";
import CobbleStone from "./textures/cobblestone.webp";
import Rock from "./textures/Rock.png";
import Lava from "./textures/Lava.jpg";
///load maps:
import boundariesHome from "./maps/home.ts";
import boundariesPlain from "./maps/plain.ts";
import boundariesVoid from "./maps/void.ts";
//load config:
import framerate from "./config/framerates"
import music from "./config/music";
import physics from "./config/physics";
//load menus
import Characters from "./menus/characters";
import Maps from "./menus/maps";
import Pause from "./menus/pause";
import Start from "./menus/start";

import steps from "./steps.json";

const characters = {
    "Tom":redHat,
    "Santa Clause":santa,
    "Ninja":ninja,
    "Nathan":zombieMale,
    "Addison":zombieFemale,
    "Punkin man":jack,
    "Aether":knight
  };

const textures = {
    Grass,
    Dirt,
    Stairs,
    CobbleStone,
    Coin:"./gifs/coin.gif",
    Rock,
    Lava
}

const maps = {
    "Home":boundariesHome,
    "Plain":boundariesPlain,
    "Void":boundariesVoid
};


const config = {
    framerate,
    music,
    physics
}

const menus = {
    "characters":Characters,
    "maps":Maps,
    "pause":Pause,
    "start":Start
}


//export assets
export {
    characters,
    textures,
    maps,
    config,
    menus,
    steps
}