export default function Boundary({
	top,
	left,
	width,
	height,
	texture,
	align,
	textures,
	blockSize,
	message,
	darkness = 0
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
		>	<div style={{position:"absolute",top:"0px",left:"0px",width:"100%",height:"100%",background:"#00000009",opacity:darkness}}>

		</div>
			{message && (
				<div className="absolute bottom-full text-orange-2a00">
					{message}
				</div>
			)}
		</div>
	);
}