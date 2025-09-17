// superExplode.js
// Function to create and detonate a fireball
function superExplode(playerX, playerY, playerNumber) {
    console.log(`Creating fireball for player ${playerNumber} at (${playerX}, ${playerY})`);

    // Get the gameCanvas element and its position
    const gameCanvas = document.getElementById('gameCanvas');
    const canvasRect = gameCanvas.getBoundingClientRect(); // Get the position and size of the canvas

    // Get the zoom level based on the canvas's scale factor (same as the device's zoom level)
    const zoomLevel = window.innerWidth / document.documentElement.clientWidth;

    // Adjust the player's position based on the zoom level
    const adjustedPosX = (playerX * canvasRect.width) / gameCanvas.width * zoomLevel;
    const adjustedPosY = (playerY * canvasRect.height) / gameCanvas.height * zoomLevel;

    // Create the fireball as an object
    const fireball = {
        element: document.createElement('div'), // Create a new div element for the fireball
        posX: adjustedPosX, // Adjusted X position
        posY: adjustedPosY - 50, // Place the fireball slightly above the player (adjusted for zoom)
        size: 40, // Size of the fireball
    };

    // Set up the fireball's appearance
    fireball.element.style.position = 'absolute';
    fireball.element.style.width = `${fireball.size}px`;
    fireball.element.style.height = `${fireball.size}px`;
    fireball.element.style.borderRadius = '50%';
    fireball.element.style.backgroundColor = 'orange';
    fireball.element.style.boxShadow = '0 0 20px red';
    fireball.element.style.left = `${fireball.posX + canvasRect.left - fireball.size / 2}px`;
    fireball.element.style.top = `${fireball.posY + canvasRect.top - fireball.size / 2}px`;
    fireball.element.style.zIndex = '10';

    // Add the fireball to the document
    document.body.appendChild(fireball.element);

    // Detonate the fireball after 1 second
    setTimeout(() => {
        console.log(`Detonating fireball at (${fireball.posX}, ${fireball.posY})`);

        // Get the opposite player number
        const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;
        const oppositePosition = checkPos(oppositePlayerNumber);

        // Use the isProjectileNear function to detect if the explosion is near the opposite player
        if (isProjectileNearLarge(fireball.posX, fireball.posY, oppositePosition.x, oppositePosition.y, playerNumber)) {
            console.log('Explosion hit the opposite player!');
            knockback(0, -200 , oppositePlayerNumber);
            takeHealth(oppositePlayerNumber, 50); // Apply 50 damage to the opposite player
        }

        // Create the explosion effect
        const explosion = document.createElement('div');
        explosion.style.position = 'absolute';
        explosion.style.width = '250px';
        explosion.style.height = '250px';
        explosion.style.borderRadius = '50%';
        explosion.style.backgroundColor = 'red';
        explosion.style.left = `${fireball.posX + canvasRect.left - 125}px`; // Center the explosion based on fireball
        explosion.style.top = `${fireball.posY + canvasRect.top - 125}px`; // Center the explosion based on fireball
        explosion.style.zIndex = '100';
        explosion.style.transform = 'scale(1)';
        explosion.style.opacity = '1';
        explosion.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

        document.body.appendChild(explosion);
        playSound('https://codehs.com/uploads/4f3445e4daf760122abda93d2883eed5', 3, .07, false);

        // Animate the explosion (grow and fade out)
        setTimeout(() => {
            explosion.style.transform = 'scale(3)';
            explosion.style.opacity = '0';
        }, 0);

        // Remove the explosion and fireball elements after the animation
        setTimeout(() => {
            explosion.remove();
            fireball.element.remove();
        }, 500);

    }, 1000); // 1-second delay
}

// Function to check if the explosion is near the opposite player using distance
function isProjectileNearLarge(x, y, targetX, targetY, direction) {
    const distance = Math.hypot(x -300 - targetX, y -200 - targetY);
    return distance < 300; // Adjust proximity threshold as needed
}