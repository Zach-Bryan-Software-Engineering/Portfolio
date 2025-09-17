// upperCutPunch.js

function upperCutPunch(playerNumber, directionX) {
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;

    
    const playerPosition = checkPos(playerNumber);
    const oppositePosition = checkPos(oppositePlayerNumber);
       
    console.log(playerPosition);
    if (isPlayersNear(playerPosition, oppositePosition)) {
        takeHealth(oppositePlayerNumber, 45, healthBars);
        if (directionX === -1) {
            knockback(0, -500 ,oppositePlayerNumber);
        }
        else {
            knockback(0, -500 , oppositePlayerNumber);
        }
        playSound('https://codehs.com/uploads/6411646fd801668e39f93ded9569851f', 10, .6, false);
    }
    

    
}

function isPlayersNear(playerPosition, oppositePosition) {
    const distance = Math.hypot(
        playerPosition.x - oppositePosition.x,
        playerPosition.y - oppositePosition.y
    );
    console.log(distance);
    return distance < 90; // Adjust the proximity threshold as needed
}