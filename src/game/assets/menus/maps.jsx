
export default function Maps({maps,setMap,setStep}){
    return <div className="h-screen w-screen flex justify-center items-center">
    <div className="h-min w-full max-w-[1000px] flex">
      <div className="w-full p-4">
      <h1 className="text-3xl pb-8 uppercase">Select a map</h1>
      {Object.keys(maps).map((data_key, key) => {
        return (
          <button className="text-red-600 w-full" key={key} onClick={() => {
            setMap(data_key);
            setStep(3);
          }}>
            {data_key}
          </button>
        );
      })}
      </div>
    </div>
  </div>
}