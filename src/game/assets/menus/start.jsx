
export default function Start({setStep}){
    return <div className="h-screen w-screen flex justify-center items-center">
    <div className="h-min w-full max-w-[1000px] flex">
      <div className="w-full p-4">
        <button   button className="text-red-600 w-full" onClick={() => {
          setStep(1);
        }}>
            START GAME
          </button>
      </div>
    </div>
  </div>
}