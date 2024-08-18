const computePlayerAction = ({
    action,
    isFalling,
    isAttacking,
    isSliding,
    isJumping,
    isLeft,
    velocity,
    dead,
    keys,
    gravityForce,
    character,
}) =>{

    if(dead){
        action  = "dead"+(isLeft ? "-left":"");
    }else{
        if(keys.s){
            if(velocity.x < -0.5)
                isLeft = true;
            if(velocity.x > 0.5)
                isLeft = false;
            isSliding = true;
            action = "slide"+(isLeft ? "-left":"");
        }else{
            if(isJumping){
                isSliding = false;
                if(velocity.x < -0.5){
                    isLeft = true;
                    action = "jump-left";
                }else{
                    if(velocity.x > 0.5)
                        isLeft = false;
                    action ="jump";
                }
            }else{
                if(velocity.x < -0.5){
                    isLeft = true;
                    action = "run-left";
                }else if(velocity.x > 0.5){
                    if(velocity.x > 0.5)
                        isLeft = false;
                    action = "run";
                }else{
                    if(velocity.y > gravityForce * character.attributes.weight){
                        isFalling = true;
                        action = "fall"+(isLeft ? "-left":"");
                    }else{
                        isSliding = false;
                        isFalling = false;
                        action = "idle"+(isLeft ? "-left":"");
                    }
                }
            }
        }
    }

    return {
        dead,
        action,
        isFalling,
        isAttacking,
        isSliding,
        isJumping,
        isLeft,
    }
}

export default computePlayerAction;