const getAction = (keys,swipe) => {
    if(keys.w && keys.a){
        return "jump-left"
    }
    if(keys.s && keys.a){
        return "slide-left"
    }
    if(keys.s && keys.d){
        return "slide"
    }
    if(keys.w){
        return "jump"
    }
    if(keys.a){
        return "run-left"
    }
    if(keys.d){
        return "run"
    }
    if(keys.s){
        return "slide"
    }

    return "idle";
};

export default getAction;