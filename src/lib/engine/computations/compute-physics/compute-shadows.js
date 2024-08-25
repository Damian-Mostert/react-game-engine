/**
 * Computes ambient and drop shadows for a set of blocks within the screen's view.
 *
 * @param {Object} params - The parameters object.
 * @param {Array} params.blocks - Array of blocks with properties: top, left, width, height.
 * @param {number} params.blockSize - The size of each uniform block unit.
 * @param {number} params.shadowDepth - The radius (in blocks) to consider for ambient shadows.
 * @param {number} params.shadowLength - The length (in blocks) of the drop shadow.
 * @param {Object} params.lightDirection - The direction from which light originates.
 * @param {number} params.maxDarkness - The maximum darkness value.
 * @param {number} params.screenWidth - The width of the screen in pixels.
 * @param {number} params.screenHeight - The height of the screen in pixels.
 * @returns {Array} - Array of computed blocks with darkness levels.
 */
const computeShadows = ({
    blocks = [],
    blockSize = 10,
    shadowDepth = 6,
    shadowLength = 6,
    lightDirection = { x: -1, y: -1 },
    maxDarkness = 1.0,
    screenWidth,
    screenHeight,
  }) => {
    const smallBlocks = [];
  
    // Step 1: Break blocks into smaller units and filter by screen boundaries
    blocks.forEach((block) => {
      const rows = Math.ceil(block.height / blockSize);
      const cols = Math.ceil(block.width / blockSize);
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const top = block.top + row * blockSize;
          const left = block.left + col * blockSize;

          // Filter out blocks that are outside the screen boundaries
          if (top >= screenHeight || top + blockSize < 0 || left >= screenWidth || left + blockSize < 0) {
            continue;
          }

          smallBlocks.push({
            top,
            left,
            width: blockSize,
            height: blockSize,
            darkness: 0,
            isSolid: true, // Indicates this block is solid and can cast shadows
          });
        }
      }
    });
  
    // Create a spatial index for efficient lookup
    const blockMap = new Map();
    smallBlocks.forEach((block) => {
      const key = `${block.left}_${block.top}`;
      blockMap.set(key, block);
    });
  
    // Step 2: Compute Ambient Shadows
    smallBlocks.forEach((block) => {
      let ambientDarkness = 0;
      for (let dx = -shadowDepth; dx <= shadowDepth; dx++) {
        for (let dy = -shadowDepth; dy <= shadowDepth; dy++) {
          if (dx === 0 && dy === 0) continue;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > shadowDepth) continue;
  
          const neighborKey = `${block.left + dx * blockSize}_${block.top + dy * blockSize}`;
          if (blockMap.has(neighborKey)) {
            ambientDarkness += (1 - distance / shadowDepth) * 0.1;
          }
        }
      }
      block.darkness += ambientDarkness;
    });
  
    // Step 3: Compute Drop Shadows
    smallBlocks.forEach((block) => {
      if (!block.isSolid) return;
  
      for (let i = 1; i <= shadowLength; i++) {
        const shadowX = block.left + i * lightDirection.x * blockSize;
        const shadowY = block.top + i * lightDirection.y * blockSize;
        const shadowKey = `${shadowX}_${shadowY}`;
  
        if (!blockMap.has(shadowKey)) continue;
  
        const shadowBlock = blockMap.get(shadowKey);
        // Decrease darkness intensity over distance for gradient effect
        const intensity = (shadowLength - i + 1) / shadowLength * 0.2;
        shadowBlock.darkness += intensity;
      }
    });
  
    // Step 4: Clamp Darkness and Return Results
    smallBlocks.forEach((block) => {
      block.darkness = Math.min(block.darkness, maxDarkness);
    });
  
    return smallBlocks;
  };
  
export default computeShadows;
