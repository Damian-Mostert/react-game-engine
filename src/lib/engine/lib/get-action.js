const getAction = (keys = {}, swipe = {}, velocity = {}) => {
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

    if (swipe.x && swipe.x > 70) {
        return "run";
    }
    if (swipe.y && swipe.y < -70) {
        return "jump-left";
    }
    if (swipe.x && swipe.x < -70) {
        return "run-left";
    }
    if (swipe.y && swipe.y > 70) {
        return "slide";
    }

    if (velocity.x > 0 && velocity.y === 0) {
        return "run";
    }
    if (velocity.x < 0 && velocity.y === 0) {
        return "run-left";
    }
    if (velocity.y < 0 && velocity.x === 0) {
        return "jump";
    }
    if (velocity.y > 0 && velocity.x === 0) {
        return "slide";
    }
    if (velocity.x < 0 && velocity.y < 0) {
        return "jump-left";
    }
    if (velocity.x < 0 && velocity.y > 0) {
        return "slide-left";
    }

    return "idle";
};

export default getAction;
