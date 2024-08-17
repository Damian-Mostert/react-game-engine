export default function CharacterLoop({
  images = [],
  container = {},
  img = {},
  left = false,
  imageIndex = 1
}) {

  return (
    <div style={{ position: "relative", ...container }}>
      {images[imageIndex] && (
        <img
          src={images[imageIndex]}
          style={{
            ...img,
            position: "absolute",
            objectFit: "cover",
            transform: left ? "scaleX(-1)" : "",
          }}
          alt="sprite"
        />
      )}
    </div>
  );
}
