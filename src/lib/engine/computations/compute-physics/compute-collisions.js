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
    window.computed_bots?.forEach((otherBot, index) => {
        // Define the boundaries of the other bot
        const otherBotBounds = {
            top: otherBot.position.top,
            left: otherBot.position.left,
            right: otherBot.position.left + otherBot.character.width,
            bottom: otherBot.position.top + otherBot.character.height,
        };

        // Determine if the bots are colliding
        const isColliding =
            botBounds.right >= otherBotBounds.left &&
            botBounds.left <= otherBotBounds.right &&
            botBounds.bottom >= otherBotBounds.top &&
            botBounds.top <= otherBotBounds.bottom;

        if (isColliding) {
            console.log("Collided:", bot.name, otherBot.character.name);
            const strengthFactor = bot.attributes.strength || 1;

            if (bot.isAttacking) {
                if (velocity_result.y > 0) { // Moving down
                    velocity_result.y -= strengthFactor * 10;
                } else if (velocity_result.y < 0) { // Moving up
                    velocity_result.y += strengthFactor * 10;
                }
                // Apply anti-force to the other bot
                window.computed_bots[index].velocity.y += (velocity_result.y > 0 ? -1 : 1) * strengthFactor * 10;
            }

            if (bot.isSliding) {
                if (velocity_result.x > 0) { // Moving right
                    velocity_result.x -= strengthFactor * 10;
                } else if (velocity_result.x < 0) { // Moving left
                    velocity_result.x += strengthFactor * 10;
                }
                // Apply anti-force to the other bot
                window.computed_bots[index].velocity.x += (velocity_result.x > 0 ? -1 : 1) * strengthFactor * 10;
            }
        }
    });

    return {
        velocity: velocity_result,
    };
}
