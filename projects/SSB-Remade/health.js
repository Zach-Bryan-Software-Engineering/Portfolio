let player1Health = 300;  // Initial health for Player 1
let player2Health = 300;  // Initial health for Player 2

const createHealthBars = () => {
    // Reference resolution (1920x1080)
    const baseWidth = 1920;
    const baseHeight = 1080;

    // Get screen width and height
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate scaling factors based on actual screen size vs base resolution
    const scaleX = screenWidth / baseWidth;
    const scaleY = screenHeight / baseHeight;

    // Define health bar dimensions in terms of base resolution (1920x1080)
    const barWidth = baseWidth * 0.25; // Health bar width as 25% of the base width
    const barHeight = baseHeight * 0.05; // Health bar height as 5% of the base height

    // Calculate label offset based on base resolution
    const labelOffset = barHeight * 1.5;

    const createHealthBar = (player, alignment, imgSrc, flip = false) => {
        // Create container for the entire health bar
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.bottom = `${baseHeight * 0.1 * scaleY}px`; // Adjusted to place the bar at the bottom
        container.style[alignment] = `${baseWidth * 0.05 * scaleX}px`;
        container.style.width = `${barWidth * scaleX}px`;
        container.style.height = `${barHeight * scaleY}px`;
        container.style.zIndex = '200';

        // Create inner container for the health bar itself (this one will be rotated)
        const healthBarContainer = document.createElement('div');
        if (flip) {
            // Rotate only the health bar container (not the text or image)
            healthBarContainer.style.transform = 'rotate(180deg)';
            healthBarContainer.style.transformOrigin = 'center center'; // Set the rotation point to the center
        }
        healthBarContainer.style.height = '100%';
        healthBarContainer.style.width = '100%';
        container.appendChild(healthBarContainer);

        // Create the health bar itself
        const healthBar = document.createElement('div');
        healthBar.style.height = '100%';
        healthBar.style.width = '100%';
        healthBar.style.backgroundColor = '#53e095'; // Red for health
        healthBarContainer.appendChild(healthBar);

        // Create image overlay
        const overlay = document.createElement('img');
        overlay.src = imgSrc; // Path to the player's image
        overlay.style.position = 'absolute';

        // Increase size slightly (e.g., 1.2 times the bar size)
        const overlayWidth = barWidth * 1.4 * scaleX;
        const overlayHeight = barHeight * 1.9 * scaleY;

        // Offset outward in the X direction (left or right)
        const offsetX = alignment === 'left' ? -overlayWidth * 0.08 : overlayWidth * 0.08; // Move left or right
        const offsetY = 0; // No vertical offset

        // Set dimensions and offset position
        overlay.style.width = `${overlayWidth}px`;
        overlay.style.height = `${overlayHeight}px`;
        overlay.style.left = `calc(50% - ${overlayWidth / 2}px + ${offsetX}px)`; // Adjust horizontal
        overlay.style.top = `calc(50% - ${overlayHeight / 2}px + ${offsetY}px)`; // No change in vertical position

        overlay.style.objectFit = 'fill'; // Ensure the image is fully visible without cropping
        container.appendChild(overlay);

        // Create label
        const label = document.createElement('div');
        label.textContent = player;
        label.style.position = 'absolute';
        label.style.top = `${barHeight * scaleY}px`; // Adjusted label offset below the bar
        label.style.left = '50%';
        label.style.transform = 'translateX(-50%)';
        label.style.fontSize = `${(barHeight * scaleY) * 0.6}px`; // Font size relative to the health bar height
        label.style.fontWeight = 'bold';
        label.style.color = '#fff'; // White text color
        container.appendChild(label);

        document.body.appendChild(container);

        return healthBar;
    };

    // Create health bars for Player 1 and Player 2 (Player 2 will be flipped)
    const healthBar1 = createHealthBar('Player 1', 'left', 'https://codehs.com/uploads/667a781f197948604b5f05cd5749be5c');
    const healthBar2 = createHealthBar('Player 2', 'right', 'https://codehs.com/uploads/047c5a3d2c2ef40f0455e131db785788', true); // Set flip to true

    return { healthBar1, healthBar2 };
};




// Function to reduce health from the specified player

const takeHealth = (player, damageAmount) => {
    if (player === 1) {
        player1Health = Math.max(0, player1Health - damageAmount);

        // Scale health bar width proportionally to the screen size
        const baseWidth = 1920 * 0.25; // 25% of the base width
        const screenWidth = window.innerWidth;
        const scaleX = screenWidth / 1920; // Horizontal scaling factor
        const scaledWidth = baseWidth * scaleX; // Scaled width based on screen size
        if (damageAmount > 0) {
            finalHealthPlayer2 -= damageAmount
        }
        // For Player 1 (on the left), reduce from right to left
        healthBars.healthBar1.style.width = `${(player1Health / 300) * scaledWidth}px`;
        
    } else if (player === 2) {
        player2Health = Math.max(0, player2Health - damageAmount);

        // Scale health bar width proportionally to the screen size
        const baseWidth = 1920 * 0.25; // 25% of the base width
        const screenWidth = window.innerWidth;
        const scaleX = screenWidth / 1920; // Horizontal scaling factor
        const scaledWidth = baseWidth * scaleX; // Scaled width based on screen size
        if (damageAmount > 0) {
            finalHealthPlayer2 -= damageAmount
        }
        // Calculate the new width after taking damage
        const newWidth = (player2Health / 300) * scaledWidth;

        // For Player 2, reduce from left to right by adjusting the width
        healthBars.healthBar2.style.width = `${newWidth}px`;
        healthBars.healthBar2.style.left = `10px`; // Shift to the right to maintain left-to-right shrinking
    }
};




// Function to check the current health of a player
const checkHealth = (player) => {
    if (player === 1) {
        return player1Health;
    } else if (player === 2) {
        return player2Health;
    }
    return 0;  // Return 0 if invalid player is passed
};