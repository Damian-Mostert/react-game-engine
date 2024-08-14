
const handleInput = (keys = {}, velocity = {}, attributes= {},lastKeys={}) => {
    if (keys.w && keys.a) {
        return "jump-left";
    }
    if (keys.s && keys.a) {
        return "slide-left";
    }
    if (keys.s && keys.d) {
        return "slide";
    }
    if (keys.w) {
        if(lastKeys.a)return"jump-left"
        return "jump";
    }
    if (keys.a) {
        return "run-left";
    }
    if (keys.d) {
        return "run";
    }
    if (keys.s) {
        return "slide";
    }
    if(lastKeys.a)return"idle-left"
    return "idle";
};
const getAction = (keys,velocity,attributes,lastKeys)=>{
    const result = handleInput(keys,velocity,attributes,lastKeys);
    return {
        result,
        left:result.endsWith("-left"),
    }
}

export default getAction;
