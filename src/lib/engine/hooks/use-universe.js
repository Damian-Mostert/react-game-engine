import { useEffect, useState } from "react";
import computePhysics from "../computations/compute-physics";
import useStorage from "./use-storage";
import useKeys from "./use-keys";
import framerate from "../../../game/assets/config/framerate.ts";

function usePhysics({
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

	const [game,setGame] = useState(computePhysics({
		computed_bots:bots.map((bot,id)=>{
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
					health : characters[bot.character].attributes.health,
					addCoins(){

					},
					removeCoins(){

					},
					message:null,
					setMessage(m){

					},
					addHp(amount = 1) {

					},
					removeHp(amount = 1) {
						
					},
					...actions
				},
				position:bot.position ? bot.position : {
					top:0,
					left:0
				},
				velocity:bot.velocity ? bot.velocity : {
					x:0,
					y:0
				},
				keys:bots_keys[id],
			}
		}),
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

export default function useUniverse({
	bots,
	boundaries,
	gravityForce,
	initialPosition,
	initialVelocity,
	airDensity,
	character,
	characters,
	blockSize,
	checkDistance,
	botsSpeed,
}){
	const [storage, store] = useStorage(["coins"]);
	const { keys } = useKeys();
	const [botsKeys, setBotsKeys] = useState(bots.map((bot) => bot.actions[0]));
	const [botActionIndex, setBotActionIndex] = useState(bots.map(() => 0));
  
	const { message, health, maxHealth, game, setGame } = usePhysics({
	  gravityForce,
	  initialPosition,
	  position:initialPosition,
	  initialVelocity,
	  checkDistance,
	  airDensity,
	  store,
	  character: characters[character],
	  keys,
	  boundaries,
	  blockSize,
	  bots,
	  bots_keys: bots.map((bot) => bot.actions[0]),
	  characters,
	  addBoundary: (rules) => {
		try{
		  setGame((game) => ({
			...game,
			boundaries: [...game.boundaries,{...rules,key:game.boundaries.length}],
		  }));
		}catch(E){console.error(E)}
	  },
	  updateBoundaryById : (id, rules) => {
		if (!rules) return;
		try{
		  setGame((game) => ({
			...game,
			boundaries: boundaries.map((__bound) => (__bound?.id === id ? rules : __bound)),
		  }));
		}catch(E){console.error(E)}
	  },
	  updateBoundaryByKey : (id, rules,remove) => {
		if (!rules) return;
		try{
		  setGame((game) => ({
			...game,
			boundaries: boundaries.map((__bound) => (__bound?.key === id ? rules : __bound)),
		  }));
		}catch(E){console.error(E)}
	  },
	  addCoins(amount = 1) {
		store("coins", storage.coins ? storage.coins + amount : amount);
	  },
	  removeCoins(amount = 1) {
		store("coins", storage.coins - amount >= 0 ? storage.coins - amount : 0);
	  },
	});
  
	useEffect(() => {
	  // Function to update game state and bot actions
	  const updateGameState = () => {
		// Update bot action indices and bot keys
		setBotActionIndex((prevIndex) => {
		  // Compute the new bot keys based on the previous action index
		  // Update bots' keys
		  setBotsKeys(()=>{
			const updatedBotKeys = prevIndex.map((index, i) => {
			  const botActions = bots[i].actions;
			
			  const nextActionIndex = (index + 1);
			  if(nextActionIndex == botActions.length - 2){
				prevIndex[i] = 0;
				return botActions[0];
			  }else{
				prevIndex[i] = nextActionIndex;
				return botActions[nextActionIndex];
			  }
		   
			});
		
			// Update game state
			setGame((prevGame) => {
			  const updatedBots = prevGame.computed_bots.map((bot, i) => {
				// Update bot keys from the current botsKeys state
				bot.keys = updatedBotKeys[i];
				return bot;
			  });
		
			  // Preserve previous position
			  window.position = prevGame.position;
			  window.computed_bots = updatedBots;
		
			  // Compute new game state
			  return computePhysics({
				...prevGame,
				keys: prevGame.dead ? { "died": true } : keys,
				computed_bots: window.computed_bots
			  });
  
			});
			return updatedBotKeys;
		  });
	  
	  
		  return prevIndex;
		});
	  };
	  
  
	  // Update game state at 30 FPS
	  const gameInterval = setInterval(updateGameState, 1000 / framerate.game);
  
	  return () => {
		clearInterval(gameInterval);
	  };
	}, [keys, bots, botActionIndex, botsSpeed]);

	return {
		message,
		storage,
		health,
		maxHealth,
		game
	}
}