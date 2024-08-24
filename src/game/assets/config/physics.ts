import { Physics } from "../../../lib/helpers/config/interfaces.ts";

const physics:Physics = {
	blockSize : 30,
	gravityForce : 2,
	airDensity: 1,
	initialPosition : { top: 0, left: 0 },
	initialVelocity : { x: 0, y: 0 },
	checkDistance:5,
	botsSpeed:200
}

export default physics;
