import { useEffect, useState } from "react";

import Engine from "./lib/engine";
import characters from "./assets/characters";
import textures from "./assets/textures";
import levels from "./assets/levels/_load";
import CharacterSelect from "./menus/character-select";
import LevelSelect from "./menus/levels";
import PauseMenu from "./menus/puase";

import musicTracks from "./assets/config/music";
import Start from "./menus/start";
import useMusic from "./lib/engine/hooks/use-music";

export default function Game() {
	const [character, setCharacter] = useState(null);
	const [level,setLevel] = useState(null);
	const [paused,setPaused] = useState(false);
	const [started,setStarted] = useState(false);

	const {
		track:musicTrack,
		started:startedMusic,
		ended:endedMusic,
		playing:playingMusic,
		controls:musicControls
	} = useMusic(musicTracks);

	useEffect(()=>{
		if(endedMusic)musicControls.randomTrack();
	},[endedMusic]);

	useEffect(() => {
		if(started && !startedMusic)musicControls.randomTrack();
	}, [started,startedMusic]);
	
	return (
		<main>
			{started && <>
				{level && <> 
				{character && (
					<div style={{ display: "flex", width: "100%", height: "100%" }}>
						<Engine
							paused={paused}
							characters={characters}
							character={character}
							textures={textures}
							boundaries={levels[level].boundaries}
							bots={levels[level].bots}
						/>
						{paused && <PauseMenu setPaused={setPaused} setCharacter={setCharacter} setLevel={setLevel}/>}
						{!paused && <div className="fixed top-4 right-4 flex justify-center items-center cursor-pointer" onClick={()=>setPaused(true)}>
						<svg height="70px" width="70px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 271.953 271.953" >
							<g>
								<g>
									<path style={{fill:"white"}} d="M135.977,271.953c75.097,0,135.977-60.879,135.977-135.977S211.074,0,135.977,0S0,60.879,0,135.977    S60.879,271.953,135.977,271.953z M135.977,21.756c62.979,0,114.22,51.241,114.22,114.22s-51.241,114.22-114.22,114.22    s-114.22-51.241-114.22-114.22S72.992,21.756,135.977,21.756z"/>
									<path style={{fill:"white"}} d="M110.707,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598    c-7.511,0-13.598,6.086-13.598,13.598v103.342C97.109,194.028,103.195,200.114,110.707,200.114z"/>
									<path style={{fill:"white"}} d="M165.097,200.114c7.511,0,13.598-6.086,13.598-13.598V83.174c0-7.511-6.086-13.598-13.598-13.598    S151.5,75.663,151.5,83.174v103.342C151.5,194.028,157.586,200.114,165.097,200.114z"/>
								</g>
							</g>
						</svg>
					</div>}
				</div>
				)}
				{!character && (
					<CharacterSelect characters={characters} setCharacter={setCharacter} />
				)}
			</>}
			{!level && <LevelSelect levels={levels} setLevel={setLevel} />}	
		</>}
		{!started && <>
			<Start setStarted={setStarted} />
		</>}
	</main>);
}






