
export default function LevelSelect({levels,setLevel}){
    const data = levels;
    const setData = setLevel;
    return <div className="h-screen w-screen flex justify-center items-center">
    <div className="h-min w-full max-w-[1000px] flex">
      <div className="w-full p-4">
      <h1 className="text-3xl pb-8 uppercase">Level select</h1>
      {Object.keys(data).map((data_key, key) => {
        return (
          <button className="text-red-600 w-full" key={key} onClick={() => setData(data_key)}>
            {data_key}
          </button>
        );
      })}
      </div>
    </div>
  </div>
}