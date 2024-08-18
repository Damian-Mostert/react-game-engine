import { useEffect, useState } from "react";
import computePhysics from "../computations/compute-physics";

export default function useUniverse({
    character,
    keys,
    id = "main",
    updateBoundary,
    gravityForce,
    initialPosition,
    initialVelocity,
    checkDistance,
    airDensity,
    blockSize,
    boundaries,
    addCoins = ()=>{},
    removeCoins = ()=>{},
	characters,
	bots = [],
	bots_keys = [],
    ...actions
}){
    const [message, setMessage] = useState(null);
	const [health, setHp] = useState(character?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(character?.attributes?.health);

	const computed_bots = bots.map((bot,id)=>{
		return{
			computed_bots:[],
			action:"idle",
			blockSize,
			gravityForce,
			initialPosition,
			initialVelocity,
			checkDistance,
			airDensity,
			boundaries, 
			character:characters[bot.character],
			updateBoundary, 
			attributes:characters[bot.character].attributes,
			bots,
			dead:false,
			bot:{
				id,
				updateBoundary,
				setHp,
				health,
				addCoins,
				removeCoins,
				setMessage(m){setMessage(m)},
				addHp(amount = 1) {setHp((health) => Math.min(health + amount, maxHealth));},
				removeHp(amount = 1) {setHp((health) => ((health - amount) >= 0) ? (health - amount) : 0);},
				...actions
			},
			position:{
				top:0,
				left:0
			},
			velocity:{
				x:0,
				y:0
			},
			keys:bots_keys[id],
		}
	});

	const [game,setGame] = useState(computePhysics({
		computed_bots,
		action:"idle",
		blockSize,
		gravityForce,
		initialPosition,
		initialVelocity,
		checkDistance,
		airDensity,
		boundaries, 
		character:character,
		updateBoundary, 
		attributes:character.attributes,
		bots,
		dead:false,
		bot:{
            id,
			updateBoundary,
			setHp,
			health,
            addCoins,
            removeCoins,
            setMessage(m){setMessage(m)},
			addHp(amount = 1) {setHp((health) => Math.min(health + amount, maxHealth));},
			removeHp(amount = 1) {setHp((health) => ((health - amount) >= 0) ? (health - amount) : 0);},
            ...actions
		},
		position:{
			top:0,
			left:0
		},
		velocity:{
			x:0,
			y:0
		},
		keys:{},
		bots_keys
	}));

	useEffect(() => {
		if (character) {
			setHp(character?.attributes?.health);
			setMaxHp(character?.attributes?.health);
		}
	}, [character]);


	useEffect(() => {
		if (health === 0) setGame(game=>({...game,keys:keys?keys:game.keys,dead:true}));
	}, [health]);

    
    return {
        game,
        setGame,
		message,
		setMessage,
		health,
		maxHealth,
		setHp,
    }
}