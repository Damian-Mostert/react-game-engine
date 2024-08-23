import computeVelocity from "./compute-velocity"
import computePlayerAction from "./compute-player-action";

export default function computePhysics({position,...props}){
    const result = computeVelocity({position,...props});
    return {
        ...props,
        ...result,
        ...computePlayerAction({
            position:result.position,
            ...props,
            ...result,
        }),
    };
}