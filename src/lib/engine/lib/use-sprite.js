import CharacterLoop from "../components/character-loop";

export default function useSprite(character,action){
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
    const act = (action.endsWith("-left") ? action.split("-left")[0]: action)
    const images = fullImages[act];
    return <>
    <CharacterLoop
        img={character.box}
        container={character.container}
        images={images}
        left={action.endsWith("-left")}
      />
    </>
    
}