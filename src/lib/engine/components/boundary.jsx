export default function Boundary({
	top,
	left,
	width,
	height,
	texture,
	align,
	textures,
	blocksize,
	message
}) {
	return (
		<div
			style={{
				transform: align === "right" ? "scaleX(-1)" : "",
				position: "absolute",
				width: `${width * blocksize}px`,
				height: `${height * blocksize}px`,
				top: `${top * blocksize}px`,
				left: `${left * blocksize}px`,
				backgroundImage: `url(${textures[texture]})`,
				backgroundSize: `${blocksize}px ${blocksize}px`,
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