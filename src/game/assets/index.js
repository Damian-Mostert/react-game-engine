//load characters:
import Tom from "./characters/red-hat.ts"
import SantaClause from "./characters/santa.ts";
import Ninja from "./characters/ninja.ts";
import Nathan from "./characters/zombie-male.ts";
import Addison from "./characters/zombie-female.ts";
import PunkinMan from "./characters/jack.ts";
import Aether from "./characters/knight.ts";
///load maps:
import Home from "./maps/home.ts";
import Plain from "./maps/plain.ts";
import Void from "./maps/void.ts";
//load config:
import framerate from "./config/framerate.ts"
import music from "./config/music.ts";
import physics from "./config/physics.ts";
//load menus
import characters from "./menus/characters.jsx";
import maps from "./menus/maps.jsx";
import pause from "./menus/pause.jsx";
import start from "./menus/start.jsx";

import steps from "./steps.json";

export default {
    steps,
    characters : {
        Tom,
        SantaClause,
        Ninja,
        Nathan,
        Addison,
        PunkinMan,
        Aether
    },
    textures : {
        Grass:"/textures/grass.png",
        Dirt:"/textures/dirt.jpg",
        Stairs:"/textures/stairs.png",
        CobbleStone:"/textures/cobblestone.webp",
        Coin:"/textures/coin.gif",
        Rock:"/textures/Rock.png",
        Lava:"/textures/Lava.jpg"
    },
    maps : {
        Home,
        Plain,
        Void
    },
    config : {
        framerate,
        music,
        physics
    },
    menus : {
        characters,
        maps,
        pause,
        start
    }
}