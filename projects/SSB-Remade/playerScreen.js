function createPlayerScreen(playerNumber, functionNumber, character) {
    // Hide health UI when this function is triggered
    playSound('https://codehs.com/uploads/c921b04a2048997816e43a0de16cafe9', 208, .2, true, true);
    playSound('https://codehs.com/uploads/b60b464900ab22aac350e2d0dcabe831', 10, .2, false);
    const healthBars = document.querySelectorAll('.health-bar-container');
    healthBars.forEach(bar => {
        bar.style.display = 'none'; // Hide each health bar container
    });

    // Create the game over animation container
    const gameOverContainer = document.createElement('div');
    gameOverContainer.className = 'game-over-container';
    gameOverContainer.style.display = 'flex';
    gameOverContainer.style.justifyContent = 'center';
    gameOverContainer.style.alignItems = 'center';
    gameOverContainer.style.position = 'fixed';
    gameOverContainer.style.top = '0';
    gameOverContainer.style.left = '0';
    gameOverContainer.style.width = '100vw';
    gameOverContainer.style.height = '100vh';
    gameOverContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    gameOverContainer.style.zIndex = '100000';
    document.body.appendChild(gameOverContainer);

    // Create and animate "GAME!"
    const gameText = document.createElement('div');
    gameText.className = 'game-text';
    gameText.textContent = 'GAME!';
    gameText.style.position = 'absolute';
    gameText.style.top = '-250px';
    gameText.style.left = '50%';
    gameText.style.transform = 'translateX(-50%)';
    gameText.style.fontSize = '10vw'; // 10% of the viewport width
    gameText.style.fontWeight = 'bold';
    gameText.style.color = '#fff';
    gameText.style.zIndex = '100000';
    gameOverContainer.appendChild(gameText);

    // Animate "GAME!" falling
    setTimeout(() => {
        gameText.style.transition = 'top 1s ease-out';
        gameText.style.top = '30vh'; // 30% of the viewport height
        playSound('https://codehs.com/uploads/1fe43809c30f4e03849bfca5e4a556f1', 4, .2, false);
    }, 3100);

    // Create and animate "OVER!"
    const overText = document.createElement('div');
    overText.className = 'over-text';
    overText.textContent = 'OVER!';
    overText.style.position = 'absolute';
    overText.style.top = 'calc(50% + 16vh)'; // 50% of viewport height + offset
    overText.style.left = '50%';
    overText.style.transform = 'translateX(-50%)';
    overText.style.fontSize = '12vw'; // 12% of the viewport width
    overText.style.fontWeight = 'bold';
    overText.style.color = '#fff';
    overText.style.opacity = '0';
    overText.style.zIndex = '100000';
    gameOverContainer.appendChild(overText);

    // Fade in "OVER!" after "GAME!" falls
    setTimeout(() => {
        overText.style.transition = 'opacity 1s ease-in';
        overText.style.opacity = '1';
        gameText.style.top = '6vh'; // Adjust top position for "GAME!"
        overText.style.top = 'calc(20vh + 16vh)'; // Adjust top position for "OVER!"
    }, 4100);

    // Fade out "GAME!" and "OVER!" before showing the player screen
    setTimeout(() => {
        gameText.style.transition = 'opacity 1s ease-out';
        overText.style.transition = 'opacity 1s ease-out';
        gameText.style.opacity = '0';
        overText.style.opacity = '0';
        displayPlayerScreen(playerNumber, functionNumber, character); // Display the main player screen content
        playSound('https://codehs.com/uploads/dd698e18f6b213b09d737062af6fbd11', 180, .2, false);
    }, 6000);

    // After "GAME!" and "OVER!" disappear, show the player screen
    setTimeout(() => {
        gameOverContainer.remove(); // Remove the game over animation
    }, 7000);
}

function displayPlayerScreen(playerNumber, functionNumber, character) {
    // Define the character images based on the character type
    const characterImages = {
        'MegaMan': 'https://codehs.com/uploads/fc0345455ba24502831e6df3fab01913',
        'Knuckles': 'https://codehs.com/uploads/2aedd665e61eb1f11d353f436d298855',
        'Kirby': 'https://codehs.com/uploads/6f750433dc07723d7eb693eec42cdfc3'
    };

    // Create the player screen container
    const screen = document.createElement('div');
    screen.className = 'player-screen';
    screen.style.display = 'flex';
    screen.style.flexDirection = 'column';
    screen.style.justifyContent = 'center';
    screen.style.alignItems = 'center';
    screen.style.position = 'fixed';
    screen.style.top = '0';
    screen.style.left = '0';
    screen.style.width = '100vw';
    screen.style.height = '100vh';
    screen.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

    // Create the player title
    const title = document.createElement('div');
    title.className = 'player-title';
    title.textContent = `Congrats! Player ${playerNumber}`;
    title.style.fontSize = '5vw'; // 5% of the viewport width
    title.style.color = '#fff';
    title.style.marginBottom = '5vh'; // 5% of the viewport height
    screen.appendChild(title);

    // Get the image based on the character
    const characterImageSrc = characterImages[character];
    if (!characterImageSrc) {
        console.error('Character image not found for', character);
        return;
    }

    // Create winner display
    const winnerDisplay = document.createElement('div');
    winnerDisplay.className = 'winner-display';
    const winnerImage = document.createElement('img');
    winnerImage.src = characterImageSrc;
    winnerImage.alt = character;
    winnerImage.style.width = '20vw'; // 20% of the viewport width
    winnerImage.style.height = 'auto';
    winnerDisplay.appendChild(winnerImage);
    screen.appendChild(winnerDisplay);

    // Fade in the player screen
    screen.style.opacity = '0';
    screen.style.transition = 'opacity 2s ease-in';
    document.body.appendChild(screen);
    setTimeout(() => {
        screen.style.opacity = '1';
    }, 100);
    const createConfetti = () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`; // Corrected to use template literals properly
        confetti.style.setProperty('--color', getRandomColor()); // Random color
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random duration between 3s and 5s
        confetti.style.animationDelay = `${Math.random()}s`; // Random delay between 0s and 1s
    
        document.body.appendChild(confetti);
    
        // Remove confetti after animation ends
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    };
    
    // Generate multiple confetti at intervals
    const confettiInterval = setInterval(createConfetti, 100);

}

function getRandomColor() {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A6', '#FFD700', '#00FFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}