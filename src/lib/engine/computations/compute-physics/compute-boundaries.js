const computeBoundaries = ({
	blockSize,
	boundaries,
	newPosition, 
	direction, 
	newVelocity,
	checkDistance,
	character,
	position,
	bot,
}) => {

	let adjustment = { top: 0, left: 0 };
	let ok = true;

	boundaries.filter((__bound) => {
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
	}).forEach((__bound) => {
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
			bot.updateBoundaryByKey(__bound.key,__bound.insideRange(__bound,bot));
		}
		if (isInRange && typeof __bound.inRange === "function") {
			bot.updateBoundaryByKey(__bound.key,__bound.inRange(__bound,bot));
		}else if(isNotInRange && typeof __bound.outRange == "function"){
			bot.updateBoundaryByKey(__bound.key,__bound.outRange(__bound,bot));
		}

		if (__bound.inRangeBlocks) {
			let {
				range,
				action
			} = __bound.inRangeBlocks(__bound);
			if(checkRange(range))bot.updateBoundaryByKey(__bound.key,action(__bound,bot));
		}
		if(__bound.outRangeBlocks){
			let {
				range,
				action
			} = __bound.outRangeBlocks(__bound);
			if(!checkRange(range))bot.updateBoundaryByKey(__bound.key,action(__bound,bot));
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
export default computeBoundaries;
