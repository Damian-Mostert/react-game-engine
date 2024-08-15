"use client";

import styles from "./engine.module.css";
import useGame from "../lib/use-game";
import { useEffect, useRef, useState } from "react";
import useStorage from "../lib/use-storage";


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
  const [audio,setAudio] = useState();

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
  const [storage,store] = useStorage(["coins"]);
  const [message,setMessage] = useState(null);
	const [Bounds,setBounds] = useState(boundaries);
useEffect(()=>{
  window.gameDom = {
    updateBigMessage(message){
      setMessage(message);
    },
    addCoins(amount = 1){
      store("coins",storage.coins ? storage.coins + amount : amount)
    },
    playSound(audioFile){
      setAudio(`/sounds/${audioFile}` == audio ?`/sounds/${audioFile}?play=${0}` : `/sounds/${audioFile}`);
    },
    updateBoundary
  }
},[storage]);

useEffect(()=>{
  if(audio){
    let music = new Audio(audio);
    music.volume = 0.2
    music.play();
  }
},[audio]);



useEffect(()=>{
  let t = setTimeout(()=>{
    if(message)setMessage(null)
  },3000);
return ()=>{
  clearTimeout(t);
}
},[message])

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
							<div className={styles.characterTitle}>
							{character}
							</div>
							{game.sprite}
						</div>
					</div>
				</div>
        {message && <div className={styles.bigMessage}>
              {message}
        </div>}
        
        <div className={styles.coins}>
          <div className="text-sm text-left pl-1 -mb-4">
            coins:
          </div>
            {storage.coins ? storage.coins : 0}
        </div>
			</div>
		);
}
