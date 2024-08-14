import DefaultLayout from "./default-layout";

export default function CharacterSelect({characters,setCharacter}){
  return <DefaultLayout title={"select character"} data={characters} setData={setCharacter}/>
}