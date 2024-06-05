import { useEffect, useState } from "react";
import useFramerate from "../use-framerate"

export default function CharacterLoop({
    images,
    container,
}){
    const framerate = useFramerate(6);

    const [imageIndex,setImageIndex] = useState(6);

    useEffect(()=>{
        setImageIndex((OLD)=>OLD >= images.length -1 ? 0  : OLD+ 1)
    },[framerate]);


    return <img src={images[imageIndex]} style={{...container,objectFit:"cover"}}/>
}