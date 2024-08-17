import useSprite,{CharacterLoop} from "../engine/components/sprite";

export default function CharacterSelect({characters,setCharacter}){
    const data = characters;
    const setData = setCharacter;
    const sprites = {};

    return <div className="h-screen w-screen flex justify-center items-center">
    <div className="h-min w-full max-w-[1000px] flex">
      <div className="w-full p-4">
      <h1 className="text-3xl pb-8 uppercase text-red-700">Who do you want to be?</h1>
      <div className="w-full flex flex-wrap justify-center" style={{maxHeight:600,overflow:"auto"}}>
      {Object.keys(data).map((data_key, key) => {
            const character=data[data_key]
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
            const act = "idle";
            const images = fullImages[act];
        return (
          <button className="relative text-red-600 w-32 h-32 m-8 flex align-center items-center justify-center cursor-pointer hover:bg-slate-800 transition-all hover:scale-150" key={key} onClick={() => setData(data_key)}>
            <div className="absolute bottom-full w-max text-white text-[0.8rem]">
            {data_key}
            </div>
            <div className="absolute">
            <CharacterLoop container={character.container} images={images} left={true} img={character.box} character={data[data_key]}/>
            </div>
          </button>
        );
      })}
      </div>
      </div>
    </div>
  </div>
}