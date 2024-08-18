const computePlayerAction = ({
    action,
    isFalling,
    isAttacking,
    isSliding,
    isJumping,
    isJumpAttacking,
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
        if(keys.e){
            if(character.attributes.attack){
                if(velocity.x < -0.5)
                    isLeft = true;
                if(velocity.x > 0.5)
                    isLeft = false;
                isAttacking = true;
                action = "attack"+(isLeft ? "-left":"");
                if(character.attributes.jumpAttack && isJumping){
                    if(velocity.x < -0.5)
                        isLeft = true;
                    if(velocity.x > 0.5)
                        isLeft = false;
                    isJumpAttacking = true;
                    action = "jump-attack"+(isLeft ? "-left":"");
                }else{
                    isJumpAttacking = false;
                }
            }
        }else if(keys.s){
            if(character.attributes.slide){
                if(velocity.x < -0.5)
                    isLeft = true;
                if(velocity.x > 0.5)
                    isLeft = false;
                isSliding = true;
                action = "slide"+(isLeft ? "-left":"");
            }
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
        isJumpAttacking,
    }
}

export default computePlayerAction;