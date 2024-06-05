"use client";

import Character from "../../../engine/lib/classes/character";
import CharacterLoop from "../../../engine/lib/components/character-loop";

export default new Character({
  width: 40,
  height: 60,
  idle(width, height) {
    return (
      <CharacterLoop
        container={{ width, height }}
        images={[
          "/red-hat/Idle (1).png",
          "/red-hat/Idle (2).png",
          "/red-hat/Idle (3).png",
          "/red-hat/Idle (4).png",
          "/red-hat/Idle (5).png",
          "/red-hat/Idle (6).png",
          "/red-hat/Idle (7).png",
          "/red-hat/Idle (8).png",
          "/red-hat/Idle (9).png",
          "/red-hat/Idle (10).png",
        ]}
      />
    );
  },
  jump(width, height) {
    return (
      <CharacterLoop
        container={{ width, height }}
        images={[
          "/red-hat/Jump (1).png",
          "/red-hat/Jump (2).png",
          "/red-hat/Jump (3).png",
          "/red-hat/Jump (4).png",
          "/red-hat/Jump (5).png",
          "/red-hat/Jump (6).png",
          "/red-hat/Jump (7).png",
          "/red-hat/Jump (8).png",
          "/red-hat/Jump (9).png",
          "/red-hat/Jump (10).png",
          "/red-hat/Jump (11).png",
          "/red-hat/Jump (12).png",
        ]}
      />
    );
  },
  run(width, height) {
    return (
      <CharacterLoop
        container={{ width, height }}
        images={[
          "/red-hat/Run (1).png",
          "/red-hat/Run (2).png",
          "/red-hat/Run (3).png",
          "/red-hat/Run (4).png",
          "/red-hat/Run (5).png",
          "/red-hat/Run (6).png",
          "/red-hat/Run (7).png",
          "/red-hat/Run (8).png",
        ]}
      />
    );
  },
  slide(width, height) {
    return (
      <CharacterLoop
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
