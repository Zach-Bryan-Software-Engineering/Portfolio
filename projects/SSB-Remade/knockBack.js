let beganKnockBack = 0;
let playerNumberForKnockBack = 0;
let distanceKnockBackX = 0;
let distanceKnockBackY = 0;
function knockback(distanceX, distnaceY, functionplayerNumber) {
    beganKnockBack = 1;
    distanceKnockBackX = distanceX;
    distanceKnockBackY = distnaceY;
    playerNumberForKnockBack = functionplayerNumber;
    console.log("trigger knock back")
}