export default function DefaultLayout({title,data,setData}){
    return (
      <div className="h-screen w-screen bg-black flex">
        <div className="m-auto h-min w-full px-64">
          <h1 className="text-3xl pb-8 uppercase">{title}</h1>
          {Object.keys(data).map((data_key, key) => {
            return (
              <button className="text-red-600 w-full" key={key} onClick={() => setData(data_key)}>
                {data_key}
              </button>
            );
          })}
        </div>
      </div>
    );
}