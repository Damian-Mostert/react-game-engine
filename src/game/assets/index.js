//load characters:
import jack from "./characters/jack.ts";
import knight from "./characters/knight.ts";
import ninja from "./characters/ninja.ts";
import redHat from "./characters/red-hat.ts"
import santa from "./characters/santa.ts";
import zombieFemale from "./characters/zombie-female.ts";
import zombieMale from "./characters/zombie-male.ts";
///load maps:
import boundariesHome from "./maps/home.ts";
import boundariesPlain from "./maps/plain.ts";
import boundariesVoid from "./maps/void.ts";
//load config:
import framerate from "./config/framerates.ts"
import music from "./config/music.ts";
import physics from "./config/physics.ts";
//load menus
import Characters from "./menus/characters.jsx";
import Maps from "./menus/maps.jsx";
import Pause from "./menus/pause.jsx";
import Start from "./menus/start.jsx";

import steps from "./steps.json";

export default {
    steps,
    characters : {
        "Tom":redHat,
        "Santa Clause":santa,
        "Ninja":ninja,
        "Nathan":zombieMale,
        "Addison":zombieFemale,
        "Punkin man":jack,
        "Aether":knight
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
        "Home":boundariesHome,
        "Plain":boundariesPlain,
        "Void":boundariesVoid
    },
    config : {
        framerate,
        music,
        physics
    },
    menus : {
        "characters":Characters,
        "maps":Maps,
        "pause":Pause,
        "start":Start
    }
}