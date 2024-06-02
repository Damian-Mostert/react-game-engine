export default function CharacterSelect({characters,setCharacter}){
    return (
      <div className="h-screen w-screen bg-black flex">
        <div className="m-auto h-min">
          <h1 className="text-3xl pb-8">select character</h1>
          {Object.keys(characters).map((character, key) => {
            return (
              <button className="text-red-600" key={key} onClick={() => setCharacter(character)}>
                {character}
              </button>
            );
          })}
        </div>
      </div>
    );
}