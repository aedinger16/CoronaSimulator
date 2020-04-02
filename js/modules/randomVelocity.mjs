// function to generate random number
export function randomVelocity(vel) {
    var velX = 0;
    var velY = 0;

    var random = Math.floor(Math.random()*vel) + 1;
    // random *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

    do{
        
            if(vel % random == 0){
                velX = random;
                velY = vel / velX;
            }
            else{
                random = Math.floor(Math.random()*vel) + 1;
                random *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
            }
    }
    while(velX * velY != vel);
    
    var velArr = new Array;
    velArr.push(Math.floor(Math.random()*2) == 1 ? velX : velX*-1);
    velArr.push(Math.floor(Math.random()*2) == 1 ? velY : velY*-1);

    return velArr;
}