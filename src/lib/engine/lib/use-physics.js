"use client";

import { useEffect, useState } from "react";

// Game configuration
const blockSize = 20;
const maxVelocityX = 20;
const maxVelocityY = 20;
const gravityForce = 2; // Force of gravity

// Initial position configuration
const initialPosition = { top: 0, left: 0 };

export default function usePhysics({
	boundaries,
	keys,
	character
}) {

const { width: characterWidth, height: characterHeight } = character;

	const [position, setPositionState] = useState(initialPosition);

	const setPosition = (pos) =>{
		if(position.top !== pos.top || position.left !== pos.left)
			setPositionState(pos);
	}

	const [velocityX, setVelocityX] = useState(0);
	const [velocityY, setVelocityY] = useState(0);
	const [isJumping, setIsJumping] = useState(false);

	const checkBoundaries = (bounds, direction) => {
		let ok = true;
		let adjustment = { top: 0, left: 0 };


		boundaries.forEach((__bound) => {
			//if(!ok)return;
			const boundTop = __bound.top * blockSize;
			const boundLeft = __bound.left * blockSize;
			const boundBottom = boundTop + __bound.height * blockSize;
			const boundRight = boundLeft + __bound.width * blockSize;

			switch (direction) {
				case "vertical":
					if (!isJumping) {
						if (
							bounds.top + characterHeight > boundTop &&
							bounds.top < boundBottom &&
							bounds.left < boundRight &&
							bounds.left + characterWidth > boundLeft
						) {
							ok = false;
							adjustment.top = boundTop - (bounds.top + characterHeight);
						}
					} else {
						if (
							bounds.top + characterHeight > boundTop &&
							bounds.top < boundBottom &&
							bounds.left < boundRight &&
							bounds.left + characterWidth > boundLeft
						) {
							ok = false;
							adjustment.top = boundTop - (bounds.top + characterHeight);
						}
						if (
							bounds.top + velocityY < boundBottom &&
							bounds.top + characterHeight + velocityY > boundTop &&
							bounds.left < boundRight &&
							bounds.left + characterWidth > boundLeft
						) {
							setIsJumping(false);
							ok = false;
							adjustment.top = 0;
						}
					}
					break;
				case "left":
					if (
						bounds.left < boundRight &&
						bounds.left + characterWidth > boundLeft &&
						bounds.top < boundBottom &&
						bounds.top + characterHeight > boundTop
					) {
						ok = false;
						adjustment.left = boundRight - bounds.left;
					}
					break;
				case "right":
					if (
						bounds.left + characterWidth > boundLeft &&
						bounds.left <= boundRight &&
						bounds.top < boundBottom &&
						bounds.top + characterHeight > boundTop
					) {
						ok = false;
						adjustment.left = boundLeft - (bounds.left + characterWidth);
					}
					break;
				default:
					break;
			}
		});

		return { ok, adjustment };
	};

	const upForce = () => {
		if (!isJumping) {
			setVelocityY(-maxVelocityY);
			setIsJumping(true);
		}
	};

	const downForce = () => {
		setVelocityY(prev => Math.min(prev + gravityForce, maxVelocityY));
	};

	const leftForce = () => {
		setVelocityX(prev => Math.max(prev - 2, -maxVelocityX));
	};

	const rightForce = () => {
		setVelocityX(prev => Math.min(prev + 2, maxVelocityX));
	};

	useEffect(() => {
		if (keys.w || keys[' ']) {
			upForce();
		}
		if (keys.a) {
			leftForce();
		}
		if (keys.d) {
			rightForce();
		}
		if (keys.s) {
			downForce();
		}
	}, [keys,isJumping]);

	useEffect(() => {
		const applyForces = setInterval(() => {
			downForce();
			if(!keys.d && velocityX > 0){
				leftForce();
			}
			if(!keys.a && velocityX < 0){
				rightForce();
			}
		}, 1000 / 60);

		const moveCharacter = setInterval(() => {
			let newPosition = {
				top: position.top + velocityY,
				left: position.left + velocityX
			};

			// Check vertical boundaries
			let { ok: verticalOk, adjustment: verticalAdjustment } = checkBoundaries(
				{ top: newPosition.top, left: newPosition.left },
				"vertical"
			);
			if (!verticalOk) {
				newPosition.top += verticalAdjustment.top;
				setVelocityY(0);
			}

			// Check horizontal boundaries (left)
			let { ok: leftOk, adjustment: leftAdjustment } = checkBoundaries(
				{ top: newPosition.top, left: newPosition.left },
				"left"
			);
			if (!leftOk) {
				newPosition.left += leftAdjustment.left;
				setVelocityX(0);
			}

			// Check horizontal boundaries (right)
			let { ok: rightOk, adjustment: rightAdjustment } = checkBoundaries(
				{ top: newPosition.top, left: newPosition.left },
				"right"
			);
			if (!rightOk) {
				newPosition.left += rightAdjustment.left;
				setVelocityX(0);
			}

			// Apply new position
			setPosition(newPosition);
		}, 1000 / 60);

		return () => {
			clearInterval(applyForces);
			clearInterval(moveCharacter);
		};
	}, [position, velocityX, velocityY,keys]);

	return position;
}
