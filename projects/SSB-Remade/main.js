// main.js
const game = new GameCore('gameCanvas');

const playerSelection = document.getElementById('player-selection');
const selectionimage = document.getElementById('selection-image');
let player1Character = null;
let player2Character = null;
let characterName1 = null;
let characterName2 = null;

let healthBars;  // Declare healthBars as a global variable for the game

const startGame = () => {
    // Make the canvas visible
    document.getElementById('gameCanvas').style.display = 'block';

    // Create player instances based on their selected character classes
    const player1 = new player1Character(450, 100, 'a', 'd', 'w',1, '1', '2', '3');
    const player2 = new player2Character(650, 100, 'ArrowLeft', 'ArrowRight', 'ArrowUp',2, ',', '.', '/');

    // Add players and their health bars to the game
    game.addPlayer(player1);
    game.addPlayer(player2);

    // Set the game's background image
    game.setBackgroundImage("https://codehs.com/uploads/f41cb6e2df4e497c0a2317442b385dc5");
    startTimer();
    playSound('https://codehs.com/uploads/6d99cbbadaa74c41b731a3004bd20aec', 300, .8, true, true);
    playSound('https://codehs.com/uploads/c921b04a2048997816e43a0de16cafe9', 208, .07, true);
    // Hide the player selection interface
    playerSelection.style.display = 'none';
    selectionimage.style.display = 'none';

    // Initialize health bars and store the reference in the global variable
    healthBars = createHealthBars();

    // Start the game loop
    game.start();
};

// Event listener for character selection buttons
document.querySelectorAll('.character-btn').forEach(button => {
    button.addEventListener('click', () => {
        const player = button.dataset.player;
        const character = button.dataset.character;

        console.log("ButtonClick");

        // Assign selected character class to the corresponding player
        if (player === '1') {
            player1Character = character === 'megaMan' ? MegaMan : character === 'knuckles' ? Knuckles : Kirby;
            characterName1 = character === 'megaMan' ? "MegaMan" : character === 'knuckles' ? "Knuckles" : "Kirby";
        } else {
            player2Character = character === 'megaMan' ? MegaMan : character === 'knuckles' ? Knuckles : Kirby;
            characterName2 = character === 'megaMan' ? "MegaMan" : character === 'knuckles' ? "Knuckles" : "Kirby";
        }

        // Start game when both players have selected a character
        if (player1Character && player2Character) {
            startGame();
        }
    });
});