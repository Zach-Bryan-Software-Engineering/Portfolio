// inverseFan.js

function inverseFan(playerNumber, directionX) {
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;

    
    const playerPosition = checkPos(playerNumber);
    const oppositePosition = checkPos(oppositePlayerNumber);
       
    console.log(playerPosition);
    if (isPlayersNear(playerPosition, oppositePosition, directionX)) {
        takeHealth(oppositePlayerNumber, 3, healthBars);
        if (directionX === -1) {
            knockback(-25, 0 ,oppositePlayerNumber);
        }
        else {
            knockback(25, 0, oppositePlayerNumber);
        }
    }
    

    
}

function isPlayersNear(playerPosition, oppositePosition, directionX) {
    if (directionX === -1) {
        const distance = Math.hypot(
        playerPosition.x - oppositePosition.x,
        playerPosition.y - oppositePosition.y
    );
    }
    else {
        const distance = Math.hypot(
        playerPosition.x - oppositePosition.x,
        playerPosition.y - oppositePosition.y
    );
    }
    console.log(distance);
    return distance < 400; // Adjust the proximity threshold as needed
}