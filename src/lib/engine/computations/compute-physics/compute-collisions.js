export default function computeCollisions({
    velocity,
    bot,
}) {
    window.position = window.position ? window.position : {};
    var position = window.position;
    let velocity_result = { ...velocity };

    // Define the boundaries of the current bot
    const botBounds = {
        top: position.top,
        left: position.left,
        right: position.left + bot.width,
        bottom: position.top + bot.height,
    };

    // Check collisions with other bots
    if (window.computed_bots) {
        window.computed_bots.forEach((otherBot) => {
            // Define the boundaries of the other bot
            const otherBotBounds = {
                top: otherBot.position.top,
                left: otherBot.position.left,
                right: otherBot.position.left + otherBot.character.width,
                bottom: otherBot.position.top + otherBot.character.height,
            };

            // Determine if the bots are colliding
            const isColliding =
                botBounds.right > otherBotBounds.left &&
                botBounds.left < otherBotBounds.right &&
                botBounds.bottom > otherBotBounds.top &&
                botBounds.top < otherBotBounds.bottom;

            if (isColliding) {
                console.log("Collided:", bot.name, otherBot.character.name);
                
                // Allow bots to pass through unless one is attacking or sliding
                if (!bot.isAttacking && !bot.isSliding && !otherBot.isAttacking && !otherBot.isSliding) {
                    // Do not adjust positions or velocities, allowing bots to pass through each other
                    return;
                }

                // Calculate overlap
                const overlapX = Math.min(botBounds.right, otherBotBounds.right) - Math.max(botBounds.left, otherBotBounds.left);
                const overlapY = Math.min(botBounds.bottom, otherBotBounds.bottom) - Math.max(botBounds.top, otherBotBounds.top);

                // Separate bots based on overlap
                if (overlapX < overlapY) {
                    // Handle horizontal collision
                    if (botBounds.left < otherBotBounds.left) {
                        position.left -= overlapX; // Move left
                    } else {
                        position.left += overlapX; // Move right
                    }
                    velocity_result.x = 0; // Stop horizontal movement
                } else {
                    // Handle vertical collision
                    if (botBounds.top < otherBotBounds.top) {
                        position.top -= overlapY; // Move up
                    } else {
                        position.top += overlapY; // Move down
                    }
                    velocity_result.y = 0; // Stop vertical movement
                }

                // Apply force based on character actions
                if (bot.isAttacking) {
                    otherBot.velocity.y += (velocity_result.y > 0 ? -1 : 1) * 10;
                }

                if (bot.isSliding) {
                    otherBot.velocity.x += (velocity_result.x > 0 ? -1 : 1) * 10;
                }

                // Update the bot's position to avoid sticking
                window.position = position;
            }
        });
    }

    // Check if the updated position is within the map boundaries
    const mapBounds = {
        top: 0,
        left: 0,
        right: window.mapWidth || 1000, // Set appropriate map width
        bottom: window.mapHeight || 1000, // Set appropriate map height
    };

    return {
        velocity: velocity_result,
    };
}
