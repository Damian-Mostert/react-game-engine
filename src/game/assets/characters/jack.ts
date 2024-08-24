import { Character } from "../../../lib/helpers/character/classes.ts";

const jack = new Character({
  name:"jack",
  width:55,
  height:65,
  container:{
    minHeight: 70,
    minWidth: 50,
  },
  box:{
    minWidth: 50,
    height: "80px",
    left: "-0px",
    top: "-12px",
    objectPosition: "-5px",
    objectFit: "cover",
  },
  attributes:{
    strength: 30,
    speed: 2.5,
    weight: 100,
    health: 10,
    ap: 10,
    jump: true,
    run: true,
    walk: true,
    slide: true,
    attack: false,
    jumpAttack: false,
    maxVelocity: 50,
  },
  actions:[
    { callback: "dead", slug: "Dead", frames: 10 },
    { callback: "hurt", slug: "Hurt", frames: 8 },
    { callback: "idle", slug: "Idle", frames: 10 },
    { callback: "jump", slug: "Jump", frames: 10 },
    {
      callback: "run",
      slug: "Run",
      frames: 8,
      override: {
        container: {
          width: 50,
          height: 70,
          minHeight: 70,
          minWidth: 55,
        },
        box: {
          width: "150px",
          height: "80px",
          left: "-0px",
          top: "-12px",
          objectPosition: "0px",
        },
      },
    },
    {
      callback: "slide",
      slug: "Slide",
      frames: 10,
      override: {
        container: {
          width: 45,
          height: 70,
          minHeight: 70,
          minWidth: 45,
        },
        box: {
          minWidth: 72,
          scale: "0.8",
          height: "80px",
          left: "-0px",
          top: "-6px",
          objectFit: "contain",
        },
      },
    },
  ]
});

export default jack;
