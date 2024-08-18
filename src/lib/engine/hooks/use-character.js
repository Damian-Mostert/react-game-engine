import { useEffect, useState } from "react";
import computePhysics from "../computations/compute-physics";

export default function useCharacter({
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
    ...actions
}){
    const [message, setMessage] = useState(null);
	const [health, setHp] = useState(character?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(character?.attributes?.health);

    const [game,setGame] = useState(computePhysics({
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
	}))
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