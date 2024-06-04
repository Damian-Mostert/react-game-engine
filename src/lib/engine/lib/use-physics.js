"use client";

import { useEffect, useState } from "react";

const blockSize = 20;
const maxVelocityOption = 20;
const gravityForce = 2;
const initialPosition = { top: 0, left: 0 };

export default function usePhysics({ boundaries, keys, character }) {

    const { width: characterWidth, height: characterHeight } = character;

    const [maxVelocity,setMaxVelocity] = useState(maxVelocityOption);

    const [position, setPosition] = useState(initialPosition);

    const [velocity, setVelocity] = useState({ x: 0, y: 0 });

    const [isJumping, setIsJumping] = useState(false);

    const checkBoundaries = (bounds, direction) => {
        let adjustment = { top: 0, left: 0 };
        let ok = true;

        boundaries.forEach((__bound) => {
            const boundTop = __bound.top * blockSize;
            const boundLeft = __bound.left * blockSize;
            const boundBottom = boundTop + __bound.height * blockSize;
            const boundRight = boundLeft + __bound.width * blockSize;

            switch (direction) {
                case "vertical":
                    if ((bounds.top + velocity.y < boundBottom && bounds.top + characterHeight + velocity.y > boundTop) &&
                        bounds.top + characterHeight > boundTop &&
                        bounds.top < boundBottom &&
                        bounds.left < boundRight &&
                        bounds.left + characterWidth > boundLeft) {
                        ok = false;
                        adjustment.top = boundTop - (bounds.top + characterHeight);
                        if (!isJumping) setIsJumping(true);
                    }
                    break;
                case "horizontal":
                    if ((direction === "left" || velocity.x < 0) &&
                        bounds.left < boundRight &&
                        bounds.left + characterWidth > boundLeft &&
                        bounds.top < boundBottom &&
                        bounds.top + characterHeight > boundTop) {
                        ok = false;
                        adjustment.left = (direction === "left") ? boundRight - bounds.left : boundLeft - (bounds.left + characterWidth);
                        setVelocity(prev => ({ ...prev, x: 0 }));
                    }
                    break;
                default:
                    break;
            }
        });

        return { ok, adjustment };
    };

    const applyForce = (direction, force) => {
        setVelocity(prev => ({
            ...prev,
            [direction]: Math.min(Math.max(prev[direction] + force, -maxVelocity), maxVelocity)
        }));
    };

    useEffect(() => {
        if ((keys.w || keys[' '])) applyForce('y', -maxVelocity); // Up
        if (keys.a) applyForce('x', -2); // Left
        if (keys.d) applyForce('x', 2); // Right
        if (keys.s) {
            applyForce('y', gravityForce); // Down
            setMaxVelocity(maxVelocityOption * 4);
        }
        if(!keys.s){
            setMaxVelocity(maxVelocityOption);
        }
    }, [keys]);

    useEffect(() => {
        const applyForces = setInterval(() => {
            if (!keys.d && velocity.x > 0) applyForce('x', -2); // Slow down right movement
            if (!keys.a && velocity.x < 0) applyForce('x', 2); // Slow down left movement
            applyForce('y', gravityForce); // Apply gravity
        }, 1000 / 60);

        const moveCharacter = setInterval(() => {
            let newPosition = {
                top: position.top + velocity.y,
                left: position.left + velocity.x
            };

            const { ok: verticalOk, adjustment: verticalAdjustment } = checkBoundaries(newPosition, "vertical");
            if (!verticalOk) {
                newPosition.top += verticalAdjustment.top;
                setVelocity(prev => ({ ...prev, y: 0 }));
            }

            const { ok: horizontalOk, adjustment: horizontalAdjustment } = checkBoundaries(newPosition, "horizontal");
            if (!horizontalOk) newPosition.left += horizontalAdjustment.left;

            setPosition(newPosition);
        }, 1000 / 60);

        return () => {
            clearInterval(applyForces);
            clearInterval(moveCharacter);
        };
    }, [position, velocity, keys]);

    return position;
}
