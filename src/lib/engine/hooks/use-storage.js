import { useEffect, useState } from "react";

export default function useStorage(keys){

    const [storage,setStorage] = useState({});

    const store = (key,value)=>{
        if(value == null)
            localStorage.removeItem(key);
        else if(typeof value == "object")
            localStorage.setItem(key,JSON.stringify(value));
        else localStorage.setItem(key,value);
        setStorage((stor)=>{
            stor[key] = typeof value == "function"? value(stor[key]) : value;
            return {...stor};
        })
    }
    
    useEffect(()=>{
        const initialStorage = {};
        keys.forEach((key) => {
          const item = localStorage.getItem(key);
          try{
              initialStorage[key] = JSON.parse(item);
          }catch(e){
                initialStorage[key] = item;
          }
        });
        setStorage(initialStorage);
    },[]);

    return [
        storage,
        store
    ]
}