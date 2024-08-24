import { useEffect, useState } from "react";

import Engine from "../lib/engine";
import useMusic from "../lib/engine/hooks/use-music";

import {
	characters,
	textures,
	maps,
	config,
	menus,
	steps
} from "./assets";

export default function Game() {

	//game states
	const [step,setStep] = useState(0);

	const [started,setStarted] = useState(false);

	const [paused,setPaused] = useState(false);

	const [map,setMap] = useState(null);

	const [character,setCharacter] = useState(null);

	//load music;
	const {
		track:musicTrack,
		started:startedMusic,
		ended:endedMusic,
		playing:playingMusic,
		controls:musicControls
	} = useMusic(config.musicTracks);

	useEffect(()=>{
		if(step == 1)setStarted(true);
		setPaused(steps[step].paused);
	},[step]);

	useEffect(()=>{
		if(endedMusic)musicControls.randomTrack();
	},[endedMusic]);

	useEffect(() => {
		if(started && !startedMusic)musicControls.randomTrack();
	}, [started,startedMusic]);

	useEffect(()=>{
		character&&console.info("Character selected:",character);
	},[character])

	useEffect(()=>{
		map&&console.info("Map selected:",map);
	},[map])


	const Menu = menus[steps[step].menu];

	return (<main>
		{steps[step].game && <Engine
			config={config}
			characters={characters}
			textures={textures}
			character={character}
			bots={maps[map].bots}
			boundaries={maps[map].boundaries}
			paused={paused}
		/>}
		{paused && <Menu 
			characters={characters} 
			maps={maps}
			setCharacter={setCharacter} 
			setMap={setMap} 
			setStep={setStep} 
			setPaused={setPaused}
		/>}
	</main>);
}






