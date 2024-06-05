import { useEffect, useState } from "react";
import useFramerate from "../use-framerate"

export default function CharacterLoop({
    images,
    width,
    height
}){
    const framerate = useFramerate(6);

    const [imageIndex,setImageIndex] = useState(0);

    useEffect(()=>{
        if(imageIndex === images.length - 1){
            setImageIndex(0);
        }else{
            setImageIndex((OLD)=>OLD+1)
        }
    },[framerate]);

    return <>
        <img src={images[imageIndex]} style={{width,height,objectFit:"contain",objectPosition:"10px 10px"}}/>
    </>
}