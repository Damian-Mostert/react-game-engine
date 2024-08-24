export default function PauseMenu({setPaused,setStep}){
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
                setStep(2);
            }}>
                CHARACTER SELECT
            </button>
            <button  onClick={()=>{
                setStep(1);
            }}>
                MAP SELECT
            </button>
            </div>
        </div>

    </div>
}