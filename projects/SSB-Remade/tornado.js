// tornado.js

function tornado(playerNumber, directionX) {
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;

    
    const playerPosition = checkPos(playerNumber);
    const oppositePosition = checkPos(oppositePlayerNumber);
       
    console.log(playerPosition);
    if (isPlayersNear(playerPosition, oppositePosition)) {
        takeHealth(oppositePlayerNumber, 3, healthBars);
        if (directionX === -1) {
            knockback(-25, -100 ,oppositePlayerNumber);
        }
        else {
            knockback(25, -100, oppositePlayerNumber);
        }
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