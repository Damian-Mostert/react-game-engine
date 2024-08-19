"use client";
import styles from "../styles/engine.module.css";
import Sprite from "./sprite";
 
export default function Bot({framerate,character,game,message}){
		return <div
			style={{
				position: "absolute",
				width: "0px",
				height: "0px",
				bottom: game?.position?.top * -1 + "px",
				left: game?.position?.left + "px",
			}}
		>
		{message && (
			<div className={styles.bigMessage}>
				{message}
			</div>
			)}
		<div className={styles.character}>
			<Sprite framerate={framerate} character={character} action={game?.action ? game.action : "idle"}/>
		</div>
	</div>
}