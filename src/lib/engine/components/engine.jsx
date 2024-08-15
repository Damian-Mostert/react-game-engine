"use client";

import styles from "./engine.module.css";
import useGame from "../lib/use-game";
import useSprite from "../lib/use-sprite";
import { useEffect, useState } from "react";

export function Boundary({
	top,
	left,
	width,
	height,
	texture,
	align,
	textures,
	blocksize,
	closeBoundarie,
	message
}) {
	if (closeBoundarie) {
		return (
			<div
				style={{
					transform: align == "right" ? "scaleX(-1)" : "",
					position: "absolute",
					width: `${width * blocksize}px`,
					height: `${height * blocksize}px`,
					top: `${top * blocksize}px`,
					left: `${left * blocksize}px`,
					background:"#a60e0050"
				}}
			/>
		);
	}
	return (
		<>
		<div
			style={{
				transform: align == "right" ? "scaleX(-1)" : "",
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

			{message && <div className="absolute bottom-full text-orange-2a00">
	    	{message}
  		</div>}
	</div>
	</>
	);
}

export default function Engine({
	characters,
	textures,
	character,
	boundaries,
	paused
}) {
	const updateBoundary = (id,rules) =>{
    if(!rules)return;
		setBounds(boundaries=>boundaries.map(__bound=>{
      if(!__bound)return __bound;
			if(__bound.id == id){
				return rules
			}else{
				return __bound;
			}
		}));
	}
  const [message,setMessage] = useState(null);
	const [Bounds,setBounds] = useState(boundaries);
  const [coins,setCoins] = useState(0);
useEffect(()=>{
  window.gameDom = {
    updateBigMessage(message){
      setMessage(message);
    },
    addCoins(amount = 1){
      setCoins((p)=>{
        return p + amount
      })
    },
    updateBoundary
  }
},[])

		const game = useGame({ boundaries:Bounds, character, characters, paused ,updateBoundary});

		return (
			<div className={styles.container}>
				<div className={styles["container-sub"]}>
					<div
						className={styles.object}
						style={{
							top: (game.boundaries.top - 80) * -1 + "px",
							left: (game.boundaries.left + 40) * -1 + "px",
						}}
					>
						{Bounds.map((boundary, index) => {
              if(boundary.destroy)return<></>
							return (
								<Boundary
									{...boundary}
									blocksize={30}
									textures={textures}
									key={index}
								/>
							);
						})}
						{/* {game.closeBoundaries.map((boundary, index) => {
							return (
								<Boundary
									{...boundary}
									closeBoundarie={true}
									blocksize={30}
									textures={textures}
									key={index}
								/>
							);
						})} */}
					</div>
					<div
						className={styles.object}
						style={{ position: "absolute", top: "80px", left: "-40px" }}
					>
						<div
							className={styles.character}
							style={{
								width: characters[character]?.width + "px",
								height: characters[character]?.height + "px",
							}}
						>
							<div className="absolute bottom-full w-max text-white text-[0.8rem]">
							{character}
							</div>
							{game.sprite}
						</div>
					</div>
				</div>
        <div className={styles.bigMessage}>
              {message}
        </div>
        <div className={styles.coins}>
              {coins}
        </div>
			</div>
		);
}
