// function to generate random number
export function randomVelocity(vel) {
    
    var velX = Math.floor(Math.random()*vel) + 1;
    var velY = Math.sqrt(-Math.pow(velX, 2) + Math.pow(vel, 2));
    
    var velArr = new Array;
    velArr.push(Math.floor(Math.random()*2) == 1 ? velX : velX*-1);
    velArr.push(Math.floor(Math.random()*2) == 1 ? velY : velY*-1);

    return velArr;
}