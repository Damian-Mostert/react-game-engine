"use client";

import Character from "../../../engine/lib/classes/character";
import CharacterLoop from "../../../engine/lib/components/character-loop";

export default new Character({
  width: 40,
  height: 65,
  idle(width, height) {
    return (
      <CharacterLoop
        img={{width:"150px",height:"80px",left:"0px",top:"-6px",objectPosition:"-36px"}}
        container={{ width, height}}
        images={Array.from({length:10}).map((_,i)=>(`/sprites/red-hat/Idle (${i+1}).png`))}
      />
    );
  },
  jump(width, height) {
    return (
      <CharacterLoop
        img={{
          width: "150px",
          height: "80px",
          left: "0px",
          top: "-6px",
          objectPosition: "-36px",
        }}
        container={{ width, height }}
        images={Array.from({ length: 12 }).map(
          (_, i) => `/sprites/red-hat/Jump (${i + 1}).png`
        )}
      />
    );
  },
  run(width, height) {
    return (
      <CharacterLoop
        img={{
          width: "150px",
          height: "80px",
          left: "0px",
          top: "-6px",
          objectPosition: "-36px",
        }}
        container={{ width, height }}
        images={Array.from({ length: 8 }).map(
          (_, i) => `/sprites/red-hat/Run (${i + 1}).png`
        )}
      />
    );
  },
  slide(width, height) {
    return (
      <CharacterLoop
        img={{
          width: "150px",
          height: "80px",
          left: "0px",
          top: "-6px",
          objectPosition: "-36px",
        }}
        container={{ width, height }}
        images={[
          "/red-hat/Slide (1).png",
          "/red-hat/Slide (2).png",
          "/red-hat/Slide (3).png",
          "/red-hat/Slide (4).png",
          "/red-hat/Slide (5).png",
        ]}
      />
    );
  },
  hurt(width, height) {
    return (
      <CharacterLoop
        img={{
          width: "150px",
          height: "80px",
          left: "0px",
          top: "-6px",
          objectPosition: "-36px",
        }}
        container={{ width, height }}
        images={[
          "/red-hat/Hurt (1).png",
          "/red-hat/Hurt (2).png",
          "/red-hat/Hurt (3).png",
          "/red-hat/Hurt (4).png",
          "/red-hat/Hurt (5).png",
          "/red-hat/Hurt (6).png",
          "/red-hat/Hurt (7).png",
          "/red-hat/Hurt (8).png",
        ]}
      />
    );
  },
  dead(width, height) {
    return (
      <CharacterLoop
        img={{
          width: "150px",
          height: "80px",
          left: "0px",
          top: "-6px",
          objectPosition: "-36px",
        }}
        container={{ width, height }}
        images={[
          "/red-hat/Dead (1).png",
          "/red-hat/Dead (2).png",
          "/red-hat/Dead (3).png",
          "/red-hat/Dead (4).png",
          "/red-hat/Dead (5).png",
          "/red-hat/Dead (6).png",
          "/red-hat/Dead (7).png",
          "/red-hat/Dead (8).png",
          "/red-hat/Dead (9).png",
          "/red-hat/Dead (10).png",
        ]}
      />
    );
  },
});
