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
        setImageIndex((OLD)=>OLD >= images.length -1 ? 0  : OLD+ 1)
    },[framerate,width,height]);

    useEffect(()=>{
        console.log(images[imageIndex])
    },[imageIndex]);

    return <>
        <img src={images[imageIndex]} style={{width,height,objectFit:"contain"}}/>
    </>
}