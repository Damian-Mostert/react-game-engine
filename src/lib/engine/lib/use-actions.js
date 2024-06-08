import { useEffect, useState } from "react"

export default function useActions({keys,swipe,velocity}){
    const [action,setAction] = useState("Idle");

    const onSwipe = ({x,y}) => {

    };

    const onKeys = ({a,w,s,d}) => {
        if(a){

        }
        if(w){

        }
        if(s){

        }
    };

    useEffect(()=>{
       onSwipe(swipe);
    },[swipe]);

    useEffect(()=>{
       onKeys(keys);
    },[keys]);

    return action;
}