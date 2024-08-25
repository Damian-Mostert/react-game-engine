
const computeBoundaries = ({
	blockSize,
	boundaries =[],
	direction, 
	velocity,
	checkDistance,
	character,
	position,
	bot,
}) => {
	let newVelocity = { ...velocity };
	let newPosition = { ...position };
	let adjustment = { top: 0, left: 0 };
	let ok = true;

	const filterBoundaries = (boundaries) => {
		// Screen dimensions and center based on character's position
		const { top: viewTop, left: viewLeft } = position;
		const { width: viewWidth, height: viewHeight } = {
			width:150,
			height:150
		};
	  
		// Adjust for screen offset
		const screenOffsetTop = 80; // Screen is offset 80px from the top
		const screenOffsetLeft = -40; // Screen is offset -40px from the left
	  
		// Calculate screen edges relative to character in the center
		const screenTop = viewTop - viewHeight / 2 - screenOffsetTop;
		const screenLeft = viewLeft - viewWidth / 2 - screenOffsetLeft;
		const screenBottom = screenTop + viewHeight + screenOffsetTop;
		const screenRight = screenLeft + viewWidth + Math.abs(screenOffsetLeft);
	  
		return boundaries.filter((boundary) => {
		  if (!boundary) return false;
	  
		  // Calculate boundary positions
		  const boundTop = boundary.top * blockSize;
		  const boundLeft = boundary.left * blockSize;
		  const boundBottom = boundTop + boundary.height * blockSize;
		  const boundRight = boundLeft + boundary.width * blockSize;
	  
		  // Check if the boundary intersects with the screen
		  const intersectsHorizontally =
			boundLeft < screenRight && boundRight > screenLeft;
		  const intersectsVertically =
			boundTop < screenBottom && boundBottom > screenTop;
	  
		  // Check if the boundary is within the visible screen area
		  return intersectsHorizontally && intersectsVertically;
		});
	  };
	  

	filterBoundaries(boundaries).forEach((__bound) => {
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
			bot.updateBoundaryByKey(__bound.key,__bound.insideRange({...__bound,bot,was_in_range:true},bot));
		}
		if (isInRange && typeof __bound.inRange === "function") {
			bot.updateBoundaryByKey(__bound.key,__bound.inRange({...__bound,was_in_range:true},bot));
		}else if(isNotInRange && __bound.was_in_range && typeof __bound.outRange == "function"){
			bot.updateBoundaryByKey(__bound.key,__bound.outRange({...__bound,was_in_range:false},bot));
		}

		if (__bound.inRangeBlocks) {
			let {
				range,
				action
			} = __bound.inRangeBlocks(__bound);
			if(checkRange(range))bot.updateBoundaryByKey(__bound.key,action({...__bound,was_in_range:true},bot));
		}
		if(__bound.outRangeBlocks){
			let {
				range,
				action
			} = __bound.outRangeBlocks(__bound);
			if(!checkRange(range))bot.updateBoundaryByKey(__bound.key,action({...__bound,was_in_range:true},bot));
		}

		if (__bound.passThrough) return;

		const inbound = ()=>{
			if(__bound.goo){
				newVelocity.x *= __bound.goo_density;
				newVelocity.y *= __bound.goo_density;
				ok = true
			}
			if(__bound.slip){
				newVelocity.x *= __bound.slip_amount;
				newVelocity.y *= __bound.slip_amount;
			}
		}

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
					inbound();
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
					inbound();
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
					inbound();
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
					inbound();
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
