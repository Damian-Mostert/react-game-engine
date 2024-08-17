"use client";

import { useEffect, useState } from "react";
import config from "./config/physics";

const {
	blockSize,
	gravityForce,
	initialPosition,
	initialVelocity,
	checkDistance,
	airDensity,
  defaultFriction
} = config;

export default function usePhysics({
	boundaries,
	keys,
	character,
	framerate,
	updateBoundary,
  dead
}) {
	const attributes = character?.attributes ? character.attributes : {};
	const maxVelocity = attributes.maxVelocity;
	const [position, setPosition] = useState(initialPosition);
	const [velocity, setVelocity] = useState(initialVelocity);
	const [closeBoundaries, setCloseBoundaries] = useState([]);

  //action hooks.
  const [isLeft,setIsLeft] = useState(false);
	const [isJumping, setIsJumping] = useState(false);
  const [isFalling, setIsFalling] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);

  const [action,setAction] = useState("idle");

	const applyForce = (direction, force) => {
		setVelocity((prev) => ({
			...prev,
			[direction]: Math.min(
				Math.max(prev[direction] + force, -maxVelocity),
				maxVelocity
			),
		}));
	};

  useEffect(()=>{
    if(velocity.x < 0.5 && velocity.x > -0.5){
      setVelocity({...velocity,x:0})
    }
    if(velocity.y < 0.5 && velocity.y > -0.5){
      setVelocity({...velocity,yd:0})
    }

  },[velocity])

	const filterCloseBoundaries = () => {
		const newCloseBoundaries = boundaries.filter((__bound) => {
			if(!__bound)return false;
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
			if(!__bound)return;
			if(__bound.destroy)return;
			const boundTop = __bound.top * blockSize;
			const boundLeft = __bound.left * blockSize;
			const boundBottom = boundTop + __bound.height * blockSize;
			const boundRight = boundLeft + __bound.width * blockSize;

			const checkRange = (range) =>
				(newPosition.top -(range)) < (boundBottom ) &&
				(newPosition.top +(range)) + character.height > (boundTop) &&
				(newPosition.left - (range)) < (boundRight) &&
				(newPosition.left - (range) ) + character.width > (boundLeft)


			const isInRange =
				newPosition.top < boundBottom &&
				newPosition.top + character.height > boundTop &&
				newPosition.left < boundRight &&
				newPosition.left + character.width > boundLeft;

			const isNotInRange = !(
				(newPosition.top -10) < boundBottom &&
				(newPosition.top + 10) + character.height > boundTop &&
				(newPosition.left - 10) < boundRight &&
				(newPosition.left + 10) + character.width > boundLeft);

				const insideRange = !(
					(newPosition.top -1) < boundBottom &&
					(newPosition.top + 1) + character.height > boundTop &&
					(newPosition.left - 1) < boundRight &&
					(newPosition.left + 1) + character.width > boundLeft);

		if(insideRange && typeof __bound.insideRange == "function"){
			updateBoundary(__bound.id,__bound.insideRange(__bound));
		}
		if (isInRange && typeof __bound.inRange === "function") {
			updateBoundary(__bound.id,__bound.inRange(__bound));
		}else if(isNotInRange && typeof __bound.outRange == "function"){
			updateBoundary(__bound.id,__bound.outRange(__bound));
		}

		if (__bound.inRangeBlocks) {
			let {
				range,
				action
			} = __bound.inRangeBlocks(__bound);
			if(checkRange(range))updateBoundary(__bound.id,action(__bound));
		}
		if(__bound.outRangeBlocks){
			let {
				range,
				action
			} = __bound.outRangeBlocks(__bound);
				if(!checkRange(range))updateBoundary(__bound.id,action(__bound));
		}
		if (__bound.passThrough) return;

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
		if (!keys.d && velocity.x > 0) applyForce("x", airDensity * -1); // Slow down right movement
		if (!keys.a && velocity.x < 0) applyForce("x", airDensity); // Slow down left movement

		let newPosition = {
			top: position.top,
			left: position.left,
		};

		// Handle vertical movement
		newPosition.top += velocity.y;
		const verticalCheck = checkBoundaries(newPosition, "vertical", velocity);
		if (!verticalCheck.ok) {
			newPosition.top += verticalCheck.adjustment.top;
			setVelocity((prev) => ({ ...prev, y: 0 }));

			// Reset jumping state if the character lands
			if (velocity.y >= 0) {
				setIsJumping(false);
			}
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
			setVelocity((prev) => ({ ...prev, x: 0 }));
		}

		// Apply gravity
		if (verticalCheck.ok && horizontalCheck.ok) {
			applyForce("y", gravityForce + attributes.weight);
		}

		if (
			newPosition.top !== position.top ||
			newPosition.left !== position.left
		) {
			setPosition(newPosition);
		}
	};

	const onKeysChange = () => {
		if (attributes.jump && !isJumping) {
			if (keys.w || keys[" "]) {
				setIsJumping(true);
				applyForce("y", -maxVelocity); // Jump Up
      }
		} else if (attributes.fly) {
			if (keys.w || keys[" "]) {
        applyForce("y", -maxVelocity * airDensity);
        setAction("fly");
      }
		}

		if (attributes.slide) {
			if (keys.s || keys[" "]) {
				applyForce("y", maxVelocity * airDensity); // Down
				applyForce(
					"x",
					maxVelocity * airDensity * (velocity.x < 0 ? -attributes.speed : attributes.speed)
				); // Slide Left/Right
			}
		}
		if (attributes.run || attributes.walk) {
			if (keys.a) applyForce("x", attributes.speed * -1); // Left
			if (keys.d) applyForce("x", attributes.speed); // Right
		}
	};

  useEffect(()=>{
    if(dead){
      return setAction("dead"+(isLeft ? "-left":""));
    }
    if(keys.s){
      if(velocity.x < -0.5){
        setIsLeft(true);
      }
      if(velocity.x > 0.5){
        setIsLeft(false);
      }
      setIsSliding(true);
      return setAction("slide"+(isLeft ? "-left":""));
    }
    //console.info(velocity)
    if(isJumping){
      setIsSliding(false);
      if(velocity.x < -0.5){
        setIsLeft(true);
        return setAction("jump-left");
      }else{
        if(velocity.x > 0.5){
          setIsLeft(false);
        }
        return setAction("jump");
      }
    }
    
    if(velocity.x < -0.5){
      setIsLeft(true);
      return setAction("run-left");
    }else if(velocity.x > 0.5){
      if(velocity.x > 0.5){
        setIsLeft(false);
      }
      return setAction("run");
    }

    if(velocity.y > gravityForce * character.attributes.weight){
      setIsFalling(true);
      return setAction("fall"+(isLeft ? "-left":""));
    }
    setIsSliding(false);
    setIsFalling(false);
    setAction("idle"+(isLeft ? "-left":""));
  },[velocity,isJumping,isFalling,isLeft,keys,dead]);

	useEffect(() => {
		onKeysChange();
	}, [keys]);

	useEffect(() => {
		filterCloseBoundaries();
	}, [position]);

	useEffect(() => {
		render();
	}, [framerate]);

  useEffect(()=>{
    console.log(action)
  },[action])

	return {
		position:{
      top:Math.round(position.top),
      left:Math.round(position.left)
    },
		action,
    isFalling,
    isAttacking,
    isSliding,
    isJumping,
    isLeft
	};
}
