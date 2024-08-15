import CharacterLoop from "../components/character-loop";

export default function useSprite(character,action,left){
    const fullImages = {};
    for(let action of character.actions){
        const images = [];
        for(let i = 1;i<action.frames;i++){
            let img = new Image();
            img.src = `/sprites/${character.name}/${action.slug} (${i}).png`;
            images.push(`/sprites/${character.name}/${action.slug} (${i}).png`);
        }
        fullImages[action.callback] = images;
    }
    const act = (action.endsWith("-left") ? action.split("-left")[0]: action);
    const images = fullImages[act];

    let container = character.container;
    let box = character.box;

    character.actions.map(action=>{
        if(action.callback == act){
            if(action.override){
                if(action.override.container)
                    container = action.override.container
                if(action.override.box)
                    box = action.override.box
            }
        }
    });

    return <>
    <CharacterLoop
        img={box}
        container={container}
        images={images}
        left={left}
      />
    </>
    
}