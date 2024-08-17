import computeBoundaries from "./compute-boundaries";

export default function computeVelocity({
    keys,
    velocity = { x: 0, y: 0 },
    position,
    isJumping,
    isFalling,
    gravityForce = 0,
    airDensity = 0,
    maxVelocity = 10,
    attributes = { weight: 0 },
    updateBoundary,
    blockSize,
    boundaries,
    checkDistance,
    character,
    direction = "x",
    bot
}) {
    let velocity_result = { ...velocity };
    let position_result = { ...position };

    const applyForce = (axis, force) => {
        if (axis !== "x" && axis !== "y") return;

        velocity_result[axis] = Math.min(
            Math.max(velocity_result[axis] + force, -maxVelocity),
            maxVelocity
        );
    };
    // Apply forces based on key inputs for horizontal movement
    if (keys.d) {
        applyForce("x", airDensity * keys.s? 2 : 1); // Moving right
    } else if (keys.a) {
        applyForce("x", airDensity * keys.s? -2 : -1); // Moving left
    } else {
        if (keys.w) {
            applyForce("y", -attributes.strength); // Jumping
            isJumping = true
        }
        // Apply air resistance when no key is pressed
        if (velocity.x > 0) applyForce("x", airDensity * -1);
        if (velocity.x < 0) applyForce("x", airDensity);
    }

    let newPosition = { ...position_result };

    // Update position based on velocity
    newPosition.top += velocity_result.y;

    const verticalCheck = computeBoundaries(
        blockSize,
        boundaries,
        newPosition,
        "vertical",
        velocity_result,
        updateBoundary,
        checkDistance,
        character,
        position_result,
        bot
    );

    if (!verticalCheck.ok) {
        newPosition.top += verticalCheck.adjustment.top;
        velocity_result.y = 0;
        if (velocity_result.y >= 0) {
            isJumping = false;
        }
    }

    newPosition.left += velocity_result.x;

    const horizontalCheck = computeBoundaries(
        blockSize,
        boundaries,
        newPosition,
        "horizontal",
        velocity_result,
        updateBoundary,
        checkDistance,
        character,
        position_result,
        bot
    );

    if (!horizontalCheck.ok) {
        newPosition.left += horizontalCheck.adjustment.left;
        velocity_result.x = 0;
    }

    // Apply gravity if not blocked
    if (verticalCheck.ok && horizontalCheck.ok) {
        applyForce("y", gravityForce + (attributes.weight || 0));
    }

    if (
        newPosition.top !== position_result.top ||
        newPosition.left !== position_result.left
    ) {
        position_result = newPosition;
    }

    return {
        velocity: velocity_result,
        position: position_result,
        isJumping,
        direction
    };
}
