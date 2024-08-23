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
        window.computed_bots = window.computed_bots.map((otherBot, index) => {
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
                const adjustedStrengthFactor = Math.min(strengthFactor, 5);

                // Calculate overlap
                const overlapX = Math.min(botBounds.right, otherBotBounds.right) - Math.max(botBounds.left, otherBotBounds.left);
                const overlapY = Math.min(botBounds.bottom, otherBotBounds.bottom) - Math.max(botBounds.top, otherBotBounds.top);

                // Determine the direction to push characters apart
                const pushX = overlapX / 2;
                const pushY = overlapY / 2;

                if (bot.isAttacking) {
                    // Push the other bot away
                    if (position.left < otherBot.position.left) {
                        otherBot.velocity.x -= adjustedStrengthFactor * 10;
                    } else if (position.left > otherBot.position.left) {
                        otherBot.velocity.x += adjustedStrengthFactor * 10;
                    }

                    if (position.top < otherBot.position.top) {
                        otherBot.velocity.y -= adjustedStrengthFactor * 10;
                    } else if (position.top > otherBot.position.top) {
                        otherBot.velocity.y += adjustedStrengthFactor * 10;
                    }
                }

                if (bot.isSliding) {
                    // Apply sliding force
                    if (position.left < otherBot.position.left) {
                        otherBot.velocity.x += adjustedStrengthFactor * 10;
                    } else if (position.left > otherBot.position.left) {
                        otherBot.velocity.x -= adjustedStrengthFactor * 10;
                    }

                    if (position.top < otherBot.position.top) {
                        otherBot.velocity.y += adjustedStrengthFactor * 10;
                    } else if (position.top > otherBot.position.top) {
                        otherBot.velocity.y -= adjustedStrengthFactor * 10;
                    }
                }

                // Apply a small separation force to prevent sticking
                if (botBounds.right > otherBotBounds.left) {
                    position.left -= pushX;
                } else if (botBounds.left < otherBotBounds.right) {
                    position.left += pushX;
                }

                if (botBounds.bottom > otherBotBounds.top) {
                    position.top -= pushY;
                } else if (botBounds.top < otherBotBounds.bottom) {
                    position.top += pushY;
                }

                // Update the bot's position to avoid sticking
                window.position = position;
            }

            // Return the updated otherBot
            return otherBot;
        });
    }

    return {
        velocity: velocity_result,
    };
}
