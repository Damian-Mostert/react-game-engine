"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function useGame({ boundries, character, characters }) {
	const [players, setPlayers] = useState({});
	const [myId, setMyId] = useState("");
	const [isJumping, setIsJumping] = useState(true);
	const [velocityY, setVelocityY] = useState(0);
	const [velocityX, setVelocityX] = useState(0);
	const characterWidth = characters[character].width;
	const characterHeight = characters[character].height;
	const [lastKeyPress, setLastKeyPress] = useState("");
	const blockSize = 20;

	const maxVelocityX = 30;
	const maxVelocityY = 20; // Adjusted max downward velocity

const applyHorizontalMovement = (direction) => {
	const newVelocityX = direction === "left" ? -maxVelocityX : maxVelocityX;
	let newBoundaries = { ...Boundries };
	newBoundaries.left += newVelocityX;

	let { ok, adjustment } = checkBoundries(newBoundaries, direction);

	if (!ok) {
		// Adjust the position to stop exactly at the boundary
		newBoundaries.left += adjustment.left;
		setBoundries(newBoundaries);
		setVelocityX(0); // Stop horizontal movement when hitting a boundary
		return; // Exit the function since the movement is blocked
	}

	// If no collision, continue moving horizontally
	setBoundries(newBoundaries);
	setVelocityX(newVelocityX);
};


	useEffect(() => {
		socket.on("id", (id) => setMyId(id));
		socket.on("players", (players) => setPlayers(players));
		socket.on("client", (data) => {
			const Players = { ...players };
			if (myId && myId !== data.id) Players[data.id] = data;
			setPlayers(Players);
		});

		return () => {
			socket.off("id");
			socket.off("players");
			socket.off("client");
		};
	}, [myId, players]);

	const checkBoundries = (bounds, direction) => {
		let ok = true;
		let adjustment = { top: 0, left: 0 };

		boundries.forEach((__bound) => {
			const boundTop = __bound.top * blockSize;
			const boundLeft = __bound.left * blockSize;
			const boundBottom = boundTop + __bound.height * blockSize;
			const boundRight = boundLeft + __bound.width * blockSize;

			switch (direction) {
				case "up":
					if (
						bounds.top < boundBottom &&
						bounds.top + characterHeight > boundTop &&
						bounds.left < boundRight &&
						bounds.left + characterWidth > boundLeft
					) {
						if (__bound.pass) {
							if (__bound.onEnter) __bound.onEnter();
						} else {
							ok = false;
							adjustment.top = boundBottom - bounds.top;
						}
					}
					break;
				case "down":
					if (
						bounds.top + characterHeight > boundTop &&
						bounds.top < boundBottom &&
						bounds.left < boundRight &&
						bounds.left + characterWidth > boundLeft
					) {
						ok = false;
						adjustment.top = boundTop - (bounds.top + characterHeight);
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
						bounds.left < boundRight &&
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

	const [Boundries, setBoundriesState] = useState({
		top: 0,
		left: 0,
	});

	const setBoundries = (boundries) => {
		if (boundries.top !== Boundries.top || boundries.left !== Boundries.left) {
			setBoundriesState(boundries);
		}
	};

	const applyGravity = () => {
		let newVelocityY = velocityY + 0.5; // Gravity strength increased for smoother fall
		newVelocityY = Math.min(newVelocityY, maxVelocityY);

		let newBoundaries = { ...Boundries };
		newBoundaries.top += newVelocityY;

		const { ok, adjustment } = checkBoundries(newBoundaries, "down");

		if (!ok) {
			newBoundaries.top += adjustment.top;
			newVelocityY = 0;
			setIsJumping(false);
		}

		setBoundries(newBoundaries);
		setVelocityY(newVelocityY);
	};
	useEffect(()=>{
		if(!isJumping){
			let newBoundaries = Boundries;
			newBoundaries.direction = 0;
			setBoundries(newBoundaries);
		}
	},[isJumping]);
	useEffect(() => {
		const gravityInterval = setInterval(() => {
			applyGravity();
		}, 1000 / 60);

		return () => clearInterval(gravityInterval);
	}, [Boundries, isJumping, velocityY]);

		const jump = (blocks = 5) => {
			const jumpBounds = { ...Boundries, top: Boundries.top - blocks * blockSize };
      const b = checkBoundries(jumpBounds, "up")
			if (isJumping) return;

			setIsJumping(true);

			let jumpVelocity =  -blocks * blockSize * 0.15; // Adjust jump strength
			setVelocityY(jumpVelocity);
};



	const keyPressListener = (ev) => {
		setLastKeyPress(ev.key);
		switch (ev.key.toLowerCase()) {
			case "w":
			case " ":
				jump();
				break;
			case "a":
				applyHorizontalMovement("left");
				break;
			case "d":
				applyHorizontalMovement("right");
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		Boundries.character = characters[character];
		switch (lastKeyPress.toLowerCase()) {
			case "w":
			case " ":
				Boundries.direction = 1;
				break;
			case "s":
				Boundries.direction = 2;
				break;
			case "a":
				Boundries.direction = 3;
				break;
			case "d":
				Boundries.direction = 4;
				break;
			default:
				break;
		}
		socket.emit("server", Boundries);

		window.addEventListener("keypress", keyPressListener);

		return () => {
			window.removeEventListener("keypress", keyPressListener);
		};
	}, [Boundries, lastKeyPress, characters, character, velocityX, velocityY]);

	return {
		players,
		controls: {
			jump,
		},
		boundries: Boundries,
	};
}
