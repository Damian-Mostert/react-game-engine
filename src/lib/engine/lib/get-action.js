const getAction = (keys,swipe,velocity) => {
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

    if (swipe.x&& swipe.x > 70) {
        return "run";
      }else
      if (swipe.y &&  swipe.y < -70 &&  swipe.y > -70) {
        return "jump-left"
      }
      if (swipe.x && swipe.x < -70 && swipe.y &&  swipe.y > -70) {
        return "slide-left"
      }
      if (swipe.x && swipe.x < -70) {
        return "run-left"
      }

      if (swipe.y &&  swipe.y < -70) {
        return "jump"
      }

      if (swipe.y &&  swipe.y > -70) {
        return "slide"
      }
      

    return "idle";
};

export default getAction;