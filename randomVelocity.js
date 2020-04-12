// function to generate random number
export function randomVelocity(vel) {
    
    var velX = Math.random()*vel;
    var velY = Math.sqrt(Math.pow(vel, 2) - Math.pow(velX, 2))

    var velArr = new Array;
    velArr.push(Math.floor(Math.random()*2) == 1 ? velX : velX*-1);
    velArr.push(Math.floor(Math.random()*2) == 1 ? velY : velY*-1);

    return velArr;
}