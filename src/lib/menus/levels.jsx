import DefaultLayout from "./default-layout";

export default function LevelSelect({levels,setLevel}){
    return <DefaultLayout title={"select map"} data={levels} setData={setLevel}/>
}