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
    blockSize,
    boundaries,
    checkDistance,
    character,
    direction = "x",
    bot,
    computed_bots = []
}) {
    //console.log(computed_bots)
    let velocity_result = { ...velocity };
    let position_result = { ...position };

    const applyForce = (axis, force) => {
        if (axis !== "x" && axis !== "y") return;

        velocity_result[axis] = Math.min(
            Math.max(velocity_result[axis] + force, -maxVelocity),
            maxVelocity
        );
    };

    // Get other bots (excluding the main bot

    // Reset jumping state if on the ground
    if (velocity_result.y === 0) {
        isJumping = false;
        isFalling = false;
    }

    // Apply forces based on key inputs for horizontal movement
    if (keys.w && isJumping !== attributes.strength) {
        if (!isJumping) isJumping = 0;
        isJumping++;
        applyForce("y", -attributes.strength); // Variable jumping
        isFalling = false;
    } else if (isJumping && !isFalling) {
        // Gradually decrease jump velocity until it reaches 0, then switch to falling
        applyForce("y", gravityForce * 0.1);
        if (velocity_result.y >= 0) {
            isFalling = true;
        }
    }

    if (keys.d) {
        applyForce("x", airDensity * (keys.s ? 2 : 1)); // Moving right
    } else if (keys.a) {
        applyForce("x", airDensity * (keys.s ? -2 : -1)); // Moving left
    } else {
        // Apply air resistance when no key is pressed
        if (velocity_result.x > 0) applyForce("x", airDensity * -1);
        if (velocity_result.x < 0) applyForce("x", airDensity);
    }

    let newPosition = { ...position_result };

    // Check vertical collisions and update position based on velocity
    newPosition.top += velocity_result.y;

    const verticalCheck = computeBoundaries({        
        blockSize,
        boundaries,
        newPosition,
        direction: "vertical",
        newVelocity: velocity_result,
        checkDistance,
        character,
        position: position_result,
        bot,
        computed_bots
    });

    if (!verticalCheck.ok) {
        newPosition.top += verticalCheck.adjustment.top;
        velocity_result.y = 0;
        isJumping = false;
        isFalling = false;
    }

    // Check horizontal collisions and update position based on velocity
    newPosition.left += velocity_result.x;

    const horizontalCheck = computeBoundaries({
        blockSize,
        boundaries,
        newPosition,
        direction: "horizontal",
        newVelocity: velocity_result,
        checkDistance,
        character,
        position: position_result,
        bot,
        computed_bots // Add computed_bots here
    });

    if (!horizontalCheck.ok) {
        newPosition.left += horizontalCheck.adjustment.left;
        velocity_result.x = 0;
    }

    // Apply bot-related collision logic
    const collisionResult = computeCollisions({
        velocity: velocity_result,
        position: position_result,
        bot:character,
        computed_bots // Pass otherBots here
    });

    velocity_result = collisionResult.velocity;

    // Apply gravity if not blocked by any boundary
    if (verticalCheck.ok && horizontalCheck.ok) {
        applyForce("y", gravityForce + (attributes.weight || 0));
    }

    // Only update position if it has changed
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
        isFalling,
        direction
    };
}

export function computeCollisions({
    velocity,
    position,
    bot,
    computed_bots,
}) {
    let velocity_result = { ...velocity };

    const botBounds = {
        top: position.top,
        left: position.left,
        right: position.left + bot.width,  
        bottom: position.top + bot.height,  
    };

    // Check collisions with other bots
    computed_bots.forEach((otherBot) => {
        const otherBotBounds = {
            top: otherBot.position.top,
            left: otherBot.position.left,
            right: otherBot.position.left + otherBot.width,  
            bottom: otherBot.position.top + otherBot.height,  
        };

        const isColliding =
            botBounds.right > otherBotBounds.left &&
            botBounds.left < otherBotBounds.right &&
            botBounds.bottom > otherBotBounds.top &&
            botBounds.top < otherBotBounds.bottom;

        console.log("Collision with bot:", isColliding,bot.name,position,otherBot);

        if (isColliding) {
            // Apply counter velocity based on bot's strength
            const strengthFactor = bot.attributes.strength || 1;

            if (bot.isAttacking) {
                velocity_result.y -= strengthFactor * 10;
            }

            if (bot.isSliding) {
                velocity_result.x -= strengthFactor * 10;
            }
        }
    });

    return {
        velocity: velocity_result,
    };
}


