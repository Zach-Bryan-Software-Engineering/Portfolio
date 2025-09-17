// Function to create and shoot the projectile with offset based on direction
function shootProjectile(x, y, directionX, directionY, playerNumber) {
    console.log(`Shooting projectile from (${x}, ${y}) towards player ${playerNumber}`);

    // Get the gameCanvas element
    const gameCanvas = document.getElementById('gameCanvas');
    const canvasRect = gameCanvas.getBoundingClientRect(); // Get the canvas position and size

    // Get the zoom level based on the canvas's scale factor (we assume it's the same as the device's zoom level)
    const zoomLevel = window.innerWidth / document.documentElement.clientWidth;

    // Offset distance to apply based on direction
    const offsetDistance = 20; // You can adjust this value based on how far you want the offset to be

    // Calculate the offset for the direction (scaled by zoom level)
    const offsetX = directionX * offsetDistance * zoomLevel;
    const offsetY = directionY * offsetDistance * zoomLevel;

    // Adjust the starting position of the projectile based on the zoom level and direction offsets
    const adjustedPosX = (x * canvasRect.width) / gameCanvas.width * zoomLevel + offsetX;
    const adjustedPosY = (y * canvasRect.height) / gameCanvas.height * zoomLevel + offsetY;

    // Create the projectile as a JavaScript object
    const projectile = {
        element: document.createElement('div'),
        posX: adjustedPosX, // Adjusted starting position with zoom level and offset
        posY: adjustedPosY, // Adjusted starting position with zoom level and offset
        speed: 15,
        directionX: directionX,
        directionY: directionY,
    };

    // Set up the projectile's appearance
    projectile.element.style.position = 'absolute';
    projectile.element.style.width = '20px';
    projectile.element.style.height = '20px';
    projectile.element.style.borderRadius = '50%';
    projectile.element.style.backgroundColor = 'red';
    projectile.element.style.zIndex = '10';

    // Set the projectile's position relative to the gameCanvas
    projectile.element.style.left = `${projectile.posX + canvasRect.left}px`;
    projectile.element.style.top = `${projectile.posY + canvasRect.top}px`;

    // Add the projectile to the document
    document.body.appendChild(projectile.element);

    // Determine the opposite player
    const oppositePlayerNumber = playerNumber === 1 ? 2 : 1;
    console.log(`Opposite player is ${oppositePlayerNumber}`);

    // Move the projectile
    const moveInterval = setInterval(() => {
        // Update the projectile's position
        projectile.posX += projectile.directionX * projectile.speed;
        projectile.posY += projectile.directionY * projectile.speed;

        // Adjust the position based on the zoom level
        const scaledPosX = projectile.posX * zoomLevel;
        const scaledPosY = projectile.posY * zoomLevel;

        // Update the position in the DOM using left/top properties
        projectile.element.style.left = `${scaledPosX + canvasRect.left}px`;
        projectile.element.style.top = `${scaledPosY + canvasRect.top}px`;

        console.log(`Projectile position: (${scaledPosX}, ${scaledPosY})`);

        // Check if the projectile is near the opposite player
        const oppositePosition = checkPos(oppositePlayerNumber); // Get position of the opposite player
        console.log(`Opposite player's position: (${oppositePosition.x}, ${oppositePosition.y})`);

        if (isProjectileNear(scaledPosX, scaledPosY, ((oppositePosition.x  * canvasRect.width) / gameCanvas.width * zoomLevel + offsetX), ((oppositePosition.y * canvasRect.height) / gameCanvas.height * zoomLevel + offsetY))) {
            console.log(`Projectile hit the opposite player!`);
            if (directionX === -1) {
                knockback(-50, 0 ,oppositePlayerNumber);
            }
            else {
                knockback(50, 0 , oppositePlayerNumber);
            }
            playSound('https://codehs.com/uploads/8223ecdeaa580fdb84b2652f84a49e95', 10, .2, false);
            takeHealth(oppositePlayerNumber, 25); // Apply damage to the opposite player
            triggerExplosion(scaledPosX, scaledPosY); // Trigger explosion on hit
            clearInterval(moveInterval); // Stop the projectile movement
            projectile.element.remove(); // Remove the projectile from the DOM
        }

        // Check for collisions with the screen edges
        if (detectCollision(scaledPosX, scaledPosY)) {
            console.log(`Projectile hit the edge of the screen!`);
            clearInterval(moveInterval); // Stop the projectile movement
            projectile.element.remove(); // Remove the projectile from the DOM
        }
    }, 16); // 60 FPS
}



// Function to detect collisions with the screen edges
function detectCollision(x, y) {
    // Check if the projectile is outside the screen boundaries (left, right, top, or bottom)
    const collision = x > window.innerWidth || x < 0 || y > window.innerHeight || y < 0;
    if (collision) {
        console.log(`Collision detected at (${x}, ${y})`);
    }
    return collision;
}

  
function isProjectileNear(x, y, targetX, targetY, direction) {
    const distance = Math.hypot(x -60 - targetX, y - 70  - targetY);
    console.log(distance)
    return distance < 50; // Adjust proximity threshold as needed
}
// Function to trigger an explosion at the projectile's position
function triggerExplosion(x, y) {
    console.log(`Triggering explosion at (${x}, ${y})`);

    // Get the gameCanvas element
    const gameCanvas = document.getElementById('gameCanvas');
    const canvasRect = gameCanvas.getBoundingClientRect(); // Get the position and size of the canvas

    // Create a new div element for the explosion
    const explosion = document.createElement('div');
    explosion.style.position = 'absolute';
    explosion.style.width = '100px';
    explosion.style.height = '100px';
    explosion.style.borderRadius = '50%';
    explosion.style.backgroundColor = 'orange'; // Set explosion color
    explosion.style.left = `${x - 50 + canvasRect.left}px`; // Adjust for center
    explosion.style.top = `${y - 50 + canvasRect.top}px`;  // Adjust for center
    explosion.style.zIndex = '100'; // Ensure it's above the projectile
    explosion.style.transform = 'scale(1)'; // Initial scale (small)
    explosion.style.opacity = '1'; // Fully visible
    explosion.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'; // Animation

    // Add the explosion to the document
    document.body.appendChild(explosion);

    // Animate the explosion (grow and fade out)
    setTimeout(() => {
        explosion.style.transform = 'scale(3)'; // Expand the explosion
        explosion.style.opacity = '0'; // Fade out
    }, 0);

    // Remove the explosion element after the animation completes
    setTimeout(() => explosion.remove(), 500);
}