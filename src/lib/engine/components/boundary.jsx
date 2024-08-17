export default function Boundary({
	top,
	left,
	width,
	height,
	texture,
	align,
	textures,
	blockSize,
	message
}) {
	return (
		<div
			style={{
				transform: align === "right" ? "scaleX(-1)" : "",
				position: "absolute",
				width: `${width * blockSize}px`,
				height: `${height * blockSize}px`,
				top: `${top * blockSize}px`,
				left: `${left * blockSize}px`,
				backgroundImage: `url(${textures[texture]})`,
				backgroundSize: `${blockSize}px ${blockSize}px`,
				backgroundRepeat: "repeat",
			}}
		>
			{message && (
				<div className="absolute bottom-full text-orange-2a00">
					{message}
				</div>
			)}
		</div>
	);
}