// checkPosition.js

// Object to store player positions
const playerPositions = {};

// Function to save the current position of a player
const currentPos = (playerNumber, x, y) => {
    playerPositions[playerNumber] = { x, y };
};

// Function to retrieve the current position of a player
const checkPos = (playerNumber) => {
    return playerPositions[playerNumber] || null;
};