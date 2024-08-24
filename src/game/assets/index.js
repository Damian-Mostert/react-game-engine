//load characters:
import jack from "./characters/jack.js";
import knight from "./characters/knight.js";
import ninja from "./characters/ninja.js";
import redHat from "./characters/red-hat.js"
import santa from "./characters/santa.js";
import zombieFemale from "./characters/zombie-female.js";
import zombieMale from "./characters/zombie-male.js";
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
import framerate from "./config/framerates.js"
import music from "./config/music.js";
import physics from "./config/physics.js";
//load menus
import Characters from "./menus/characters.jsx";
import Maps from "./menus/maps.jsx";
import Pause from "./menus/pause.jsx";
import Start from "./menus/start.jsx";

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
console.info("assets",{
    characters,
    textures,
    maps,
    config,
    menus,
    steps
})
export {
    characters,
    textures,
    maps,
    config,
    menus,
    steps,
}