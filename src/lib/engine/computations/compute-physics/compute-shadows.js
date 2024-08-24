const computeShadows = ({
    blocks = [],
    blockSize,
    shadowDepth = 6,
    maxDarkness = 1.0,
  }) => {
    const boundaries = [];
  
    blocks.forEach((block) => {
      const { top, left, width, height } = block;
      const rows = Math.ceil(height / blockSize);
      const cols = Math.ceil(width / blockSize);
  
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const boundary = {
            top: top + row * blockSize,
            left: left + col * blockSize,
            width: blockSize,
            height: blockSize,
            darkness: 0,
          };
          boundaries.push(boundary);
        }
      }
    });
  
    boundaries.forEach((boundary) => {
      const closeBlocks = boundaries.filter((other) => {
        const distanceX = Math.abs(boundary.left - other.left);
        const distanceY = Math.abs(boundary.top - other.top);
  
        return (
          (distanceX <= shadowDepth * blockSize || distanceY <= shadowDepth * blockSize) &&
          other !== boundary
        );
      });
  
      if (closeBlocks.length > 0) {
        boundary.darkness = Math.min(
          maxDarkness,
          boundary.darkness + 0.1 * closeBlocks.length
        );
      }
    });
  
    return boundaries;
  };
  
  export default computeShadows;
  