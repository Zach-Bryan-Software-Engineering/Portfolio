// superKick.js

function superKick(playerNumber, directionX) {
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;

    
    const playerPosition = checkPos(playerNumber);
    const oppositePosition = checkPos(oppositePlayerNumber);
       
    console.log(playerPosition);
    if (isPlayersNear(playerPosition, oppositePosition)) {
        takeHealth(oppositePlayerNumber, 50, healthBars);
        if (directionX === -1) {
            knockback(0, -250 ,oppositePlayerNumber);
        }
        else {
            knockback(0, -250 , oppositePlayerNumber);
        }
        playSound('https://codehs.com/uploads/af9f78665c9cf31b9eacaa46c947fd96', 10, .6, false);
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