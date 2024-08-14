export default function PauseMenu({setPaused,setCharacter,setLevel}){
    return <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50" style={{backdropFilter:"blur(15px)"}}>
        <div className="w-full max-w-[1000px] flex">
            <div className="w-full p-4">
            <h2 className="text-3xl pb-4">
                PAUSED
            </h2>
            <button  onClick={()=>{
                setPaused(false);
            }}>
                CONTINUE
            </button>
            <button  onClick={()=>{
                setPaused(false);
                setCharacter(null);
            }}>
                CHARACTER SELECT
            </button>
            <button  onClick={()=>{
                setPaused(false);
                setLevel(null);
                setCharacter(null);
            }}>
                MAP SELECT
            </button>

            </div>
        </div>

    </div>
}