import { useEffect, useState } from "react";

export default function useCharacter({
    character,
    keys,
    id,
    updateBoundary,
    addCoins = ()=>{},
    removeCoins = ()=>{},
    ...actions
}){
    const [message, setMessage] = useState(null);
	const [health, setHp] = useState(character?.attributes?.health);
	const [maxHealth, setMaxHp] = useState(character?.attributes?.health);


	useEffect(() => {
		if (character) {
			setHp(character?.attributes?.health);
			setMaxHp(character?.attributes?.health);
		}
	}, [character]);

	useEffect(() => {
		const t = setTimeout(() => {
			if (message) setMessage(null);
		}, 3000);
		return () => clearTimeout(t);
	}, [message]);


	useEffect(() => {
        if(!window.setGame)window.setGame = () => {};
		if (health === 0) (window.setGame[id] ? window.setGame[id] : window.setGame)(game=>({...game,keys:keys?keys:game.keys,dead:true}));
	}, [health]);

    return {
		message,
		setMessage,
		health,
		maxHealth,
		setHp,
        bot:{
			updateBoundary,
			setHp,
			health,
            addCoins,
            removeCoins,
			updateMessage(message) {
				setMessage(message);
			},
			addHp(amount = 1) {
				setHp((health) => Math.min(health + amount, maxHealth));
			},
			removeHp(amount = 1) {
				setHp((health) => Math.min(health - amount, 0));
			},
            ...actions
		}
    }
}