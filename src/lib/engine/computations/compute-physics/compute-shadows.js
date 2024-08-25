/**
 * Computes ambient and drop shadows for a set of blocks.
 * Ambient shadows darken a block based on the number of blocks directly above it,
 * while drop shadows darken blocks below based on the number of blocks above.
 * Generates additional blocks that are drop shadows from the top.
 * Increases darkness if there's a neighboring block to the left or right.
 *
 * @param {Object} params - The parameters object.
 * @param {Array} params.blocks - Array of blocks with properties: top, left, width, height.
 * @param {number} params.blockSize - The size of each uniform block unit.
 * @param {number} params.maxDarkness - The maximum darkness value.
 * @param {Object} params.screen - The screen dimensions (width and height).
 * @returns {Array} - Array of computed blocks with darkness levels and additional drop shadows.
 */
const computeShadows = ({
    blocks = [],
    maxDarkness = 1.0,
    blockSize = 30, // default blockSize
    screen = { width: 800, height: 600 } // default screen dimensions
}) => {
    // Create a map for quick block lookup
    const blockMap = new Map();

    blocks.forEach((block) => {
        blockMap.set(`${block.left}_${block.top}`, {
            ...block,
        });
    });

    const getKey = (left, top) => `${left}_${top}`;

    // Calculate ambient and drop shadows for inner blocks
    let output = blocks.map(block => {
        let ambientDarkness = 0;
        let dropDarkness = 0;
        let sideDarkness = 0;

        // Calculate ambient darkness (upwards shadow)
        for (let y = 1; y <= 5; y++) {
            if (blockMap.has(getKey(block.left, block.top - y))) {
                ambientDarkness += maxDarkness / 10; // Smaller increment to avoid too much darkness
            }
        }

        // Calculate drop shadows (downwards shadow)
        for (let y = 1; y <= 3; y++) {
            if (blockMap.has(getKey(block.left, block.top + y))) {
                dropDarkness += maxDarkness / 15; // Smaller increment to avoid too much darkness
            }
        }

        // Calculate side darkness (left and right shadows)
        if (blockMap.has(getKey(block.left - blockSize, block.top))) {
            sideDarkness += 0.2; // Darkness increase if a block exists to the left
        }
        if (blockMap.has(getKey(block.left + blockSize, block.top))) {
            sideDarkness += 0.2; // Darkness increase if a block exists to the right
        }

        // Combine ambient, drop, and side darkness, but ensure it doesn't exceed maxDarkness
        block.darkness = Math.min(ambientDarkness + dropDarkness + sideDarkness, maxDarkness);
        return block;
    });

    // Generate additional blocks that are drop shadows from the top
    output.forEach(block => {
        let additionalDarkness = maxDarkness / 20; // Smaller increment for additional drop shadows

        // Continue casting shadows downward until blocked
        for (let y = 1; y <= 6; y++) {
            const keyBelow = getKey(block.left, block.top + y);
            if (!blockMap.has(keyBelow)) {
                // If there's no block, create a shadow block
                const shadowBlock = {
                    left: block.left,
                    top: block.top + y,
                    width: block.width,
                    height: block.height,
                    darkness: additionalDarkness
                };
                blockMap.set(keyBelow, shadowBlock);
                output.push(shadowBlock);
            } else {
                // If a block exists below, darken it slightly and stop casting shadows
                blockMap.get(keyBelow).darkness = Math.min(blockMap.get(keyBelow).darkness + additionalDarkness, maxDarkness);
                break;
            }
        }
    });

    return output;
};

export default computeShadows;
