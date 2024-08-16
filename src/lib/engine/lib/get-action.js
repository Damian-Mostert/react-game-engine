

const handleInput = (keys = {}, velocity = {}, attributes= {},lastKeys={},isJumping,dead) => {
    if(dead)return "dead";

    if(attributes.attack){
        if(keys.e){
            if(lastKeys.a){
                return "attack-left";
            }else{
                return "attack"
            }
        }
    }
    if(attributes.jump){
        if (isJumping) {
            return "jump-left";
        }
        if (keys.w && keys.a) {
            return "jump-left";
        }
    }
    if(attributes.slide){
        if (keys.s && keys.a) {
            return "slide-left";
        }
        if (keys.s && keys.d) {
            return "slide";
        }
    }
    if(attributes.jump){
        if (isJumping) {
            if(lastKeys.a)return"jump-left"
            return "jump";
        }
        if (keys.w) {
            if(lastKeys.a)return"jump-left"
            return "jump";
        }
    }
    if(attributes.run){
        if (keys.a) {
            return "run-left";
        }
        if (keys.d) {
            return "run";
        }
    }
    if(attributes.walk){
        if (keys.a) {
            return "walk-left";
        }
        if (keys.d) {
            return "walk";
        }
    }

    if(attributes.slide){
        if (keys.s) {
            return "slide";
        }
    }
    if(lastKeys.a)return"idle-left"
    return "idle";
};
const getAction = (keys,velocity,attributes,lastKeys,isJumping,dead)=>{
    const result = handleInput(keys,velocity,attributes,lastKeys,isJumping,dead);
    return {
        result,
        left:result.endsWith("-left"),
    }
}

export default getAction;
