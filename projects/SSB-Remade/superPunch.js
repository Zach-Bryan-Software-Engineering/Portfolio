// superPunch.js

function superPunch(playerNumber, directionX) {
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;

    
    const playerPosition = checkPos(playerNumber);
    const oppositePosition = checkPos(oppositePlayerNumber);
       
    console.log(playerPosition);
    if (isPlayersNear(playerPosition, oppositePosition)) {
        takeHealth(oppositePlayerNumber, 25, healthBars);
        if (directionX === -1) {
            knockback(-200, -200 ,oppositePlayerNumber);
        }
        else {
            knockback(200, -200 , oppositePlayerNumber);
        }
        playSound('https://codehs.com/uploads/c80fb0d04c2e43fa8460c94418d417ab', 10, .6, false);
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