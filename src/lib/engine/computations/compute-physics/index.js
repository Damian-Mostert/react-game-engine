import computeVelocity from "./compute-velocity"
import computePlayerAction from "./compute-player-action";

export default function computePhysics(props){
    const result = computeVelocity(props);
    return {
        ...props,
        ...result,
        ...computePlayerAction({
            ...props,
            ...result,
        })
    }
}