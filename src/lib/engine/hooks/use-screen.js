import { useEffect, useState } from "react"
import framerate from "../../../game/assets/config/framerate.ts";

export default function useScreen(){
    const [{width,height},setDimentions] = useState({width:window.innerWidth,height:window.innerHeight});
    useEffect(()=>{
        let check = setInterval(()=>{
            ((width!= window.innerWidth) || (height!=window.innerHeight))&& setDimentions({width:window.innerWidth,height:window.innerHeight})
        },25);
        return ()=> clearInterval(check);
    },[]);
    return {width,height};
}