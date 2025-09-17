// clock.js
let finalHealthPlayer1 = 900;
let finalHealthPlayer2 = 900;
let timerInterval = null;
let timeRemaining = 126; // 3 minutes in seconds

/**
 * Starts the timer and displays it on the top of the screen.
 */
function startTimer() {
    // Create and style the timer display if it doesn't exist
    let timerDisplay = document.getElementById("timerDisplay");
    if (!timerDisplay) {
        timerDisplay = document.createElement("div");
        timerDisplay.id = "timerDisplay";
        timerDisplay.style.position = "fixed";
        timerDisplay.style.bottom = "10px";
        timerDisplay.style.left = "50%";
        timerDisplay.style.transform = "translateX(-50%)";
        timerDisplay.style.backgroundColor = "#000";
        timerDisplay.style.color = "#fff";
        timerDisplay.style.padding = "10px 20px";
        timerDisplay.style.borderRadius = "8px";
        timerDisplay.style.fontSize = "40px";
        timerDisplay.style.fontWeight = "bold";
        timerDisplay.style.zIndex = "1000";
        document.body.appendChild(timerDisplay);
    }

    // Function to update the display
    function updateDisplay() {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // Clear any existing interval to prevent multiple timers
    clearInterval(timerInterval);

    // Start the timer
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "Time's up!";
            console.log(finalHealthPlayer1);
            console.log(finalHealthPlayer2);
            if (finalHealthPlayer1 > 0 && finalHealthPlayer2 > 0) {
                if (finalHealthPlayer1 > finalHealthPlayer2) {
                    createPlayerScreen(1, 1, characterName1);
                }
                else {
                    createPlayerScreen(2, 1, characterName2);
                }
            }
        } else {
            timeRemaining--;
            updateDisplay();
        }
    }, 1000);

    // Initialize the display
    updateDisplay();
}

/**
 * Checks the remaining time.
 * @returns {number} The remaining time in seconds.
 */
function checkTime() {
    return timeRemaining;
}