"use client";

import { useEffect, useState } from "react";

const blockSize = 30;
const maxVelocity = 20;
const gravityForce = 2;
const initialPosition = { top: 0, left: 0 };
const initialVelocity = { x: 0, y: 0 };
const checkDistance = 3;

export default function usePhysics({
  boundaries,
  keys,
  swipe,
  character,
  framerate,
}) {
  const [position, setPosition] = useState(initialPosition);
  const [velocity, setVelocity] = useState(initialVelocity);
  const [closeBoundaries, setCloseBoundaries] = useState([]);

  const applyForce = (direction, force) => {
    setVelocity((prev) => ({
      ...prev,
      [direction]: Math.min(
        Math.max(prev[direction] + force, -maxVelocity),
        maxVelocity
      ),
    }));
  };

  const filterCloseBoundaries = () => {
    const newCloseBoundaries = boundaries.filter((__bound) => {
      const boundTop = __bound.top * blockSize;
      const boundLeft = __bound.left * blockSize;
      const boundBottom = boundTop + __bound.height * blockSize;
      const boundRight = boundLeft + __bound.width * blockSize;

      const withinHorizontalDistance =
        Math.abs(boundLeft - position.left) <= checkDistance * blockSize ||
        Math.abs(boundRight - position.left) <= checkDistance * blockSize;
      const withinVerticalDistance =
        Math.abs(boundTop - position.top) <= checkDistance * blockSize ||
        Math.abs(boundBottom - position.top) <= checkDistance * blockSize;

      return withinHorizontalDistance || withinVerticalDistance;
    });

    setCloseBoundaries(newCloseBoundaries);
  };

  const checkBoundaries = (newPosition, direction, newVelocity) => {
    let adjustment = { top: 0, left: 0 };
    let ok = true;

    closeBoundaries.forEach((__bound) => {
      const boundTop = __bound.top * blockSize;
      const boundLeft = __bound.left * blockSize;
      const boundBottom = boundTop + __bound.height * blockSize;
      const boundRight = boundLeft + __bound.width * blockSize;

      switch (direction) {
        case "vertical":
          if (
            newVelocity.y > 0 &&
            newPosition.top + character.height > boundTop &&
            newPosition.top < boundBottom &&
            newPosition.left < boundRight &&
            newPosition.left + character.width > boundLeft
          ) {
            ok = false;
            adjustment.top = Math.min(
              boundTop - (newPosition.top + character.height),
              newVelocity.y
            );
          } else if (
            newVelocity.y < 0 &&
            newPosition.top < boundBottom &&
            newPosition.top + character.height > boundTop &&
            newPosition.left < boundRight &&
            newPosition.left + character.width > boundLeft
          ) {
            ok = false;
            adjustment.top = Math.max(
              boundBottom - newPosition.top,
              newVelocity.y
            );
          }
          break;
        case "horizontal":
          if (
            newVelocity.x > 0 &&
            newPosition.left + character.width > boundLeft &&
            newPosition.left < boundRight &&
            newPosition.top < boundBottom &&
            newPosition.top + character.height > boundTop
          ) {
            ok = false;
            adjustment.left = Math.min(
              boundLeft - (newPosition.left + character.width),
              newVelocity.x
            );
          } else if (
            newVelocity.x < 0 &&
            newPosition.left < boundRight &&
            newPosition.left + character.width > boundLeft &&
            newPosition.top < boundBottom &&
            newPosition.top + character.height > boundTop
          ) {
            ok = false;
            adjustment.left = Math.max(
              boundRight - newPosition.left,
              newVelocity.x
            );
          }
          break;
        default:
          break;
      }
    });

    return { ok, adjustment };
  };

  const render = () => {
    if (!keys.d && velocity.x > 0) applyForce("x", -2); // Slow down right movement
    if (!keys.a && velocity.x < 0) applyForce("x", 2); // Slow down left movement

    let newPosition = {
      top: position.top,
      left: position.left,
    };

    // Handle vertical movement
    newPosition.top += velocity.y;
    const verticalCheck = checkBoundaries(newPosition, "vertical", velocity);
    if (!verticalCheck.ok) {
      newPosition.top += verticalCheck.adjustment.top;
      setVelocity({ ...velocity, y: 0 });
    }

    // Handle horizontal movement
    newPosition.left += velocity.x;
    const horizontalCheck = checkBoundaries(
      newPosition,
      "horizontal",
      velocity
    );
    if (!horizontalCheck.ok) {
      newPosition.left += horizontalCheck.adjustment.left;
      setVelocity({ ...velocity, x: 0 });
    }

    // Apply gravity
    if (verticalCheck.ok && horizontalCheck.ok) {
      applyForce("y", gravityForce);
    }

    if (
      newPosition.top !== position.top ||
      newPosition.left !== position.left
    ) {
      setPosition(newPosition);
    }
  };

  const onKeysChange = () => {
    if (keys.w || keys[" "]) applyForce("y", -maxVelocity * 2); // Up
    if (keys.a) applyForce("x", -2); // Left
    if (keys.d) applyForce("x", 2); // Right
  };

  const onSwipeChange = () => {
    if (swipe.x > 70) {
      applyForce("x", 2); // Right
    }else
    if (swipe.x < -70) {
      applyForce("x", -2); // Left
    }
    if ( swipe.y < -70) {
      applyForce("y", -maxVelocity * 2); // Up
    }
  };

  useEffect(() => {
    console.info("keys", keys);
    onKeysChange();
  }, [keys]);

  useEffect(() => {
    console.info("swipe", swipe);
    onSwipeChange();
  }, [swipe]);

  useEffect(() => {
    render();
  }, [framerate]);

  useEffect(() => {
    filterCloseBoundaries();
  }, [position]);

  useEffect(() => {
    console.info("game-pos", position);
  }, [position]);

  useEffect(() => {
    console.info("close-boundaries", closeBoundaries);
  }, [closeBoundaries]);

  return {
    position,
    closeBoundaries,
  };
}
