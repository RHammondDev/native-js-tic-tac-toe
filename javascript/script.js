/*
 * File:            script.js
 * Description:     this script file will hold the logic for our tic tac toe game
 * Date:            July 25, 2021.
 * Author:          Robin Hammond.
 * Resources:       https://dev.to/bornasepic/pure-and-simple-tic-tac-toe-with-javascript-4pgn    
*/

// Variable to access the game status element
const statusDisplay = document.querySelector('.game--status');

// 2d array to hold the win conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Variable to hold the game status
let gameActive = true;

// Variable to store current player so we know whos turn it is
let currentPlayer = "X";

// Array which will hold our game state and track which cells have been played 
let gameState = ["", "", "", "", "", "", "", "", ""];

// Custom message functions for player turn, which player has won and if the game ended in a draw
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game has ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Set the message to let players know whose turn it is
statusDisplay.innerHTML = currentPlayerTurn();

// Handle cell played function
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // update the backend game state to reflect the move as well as update the UI to show the played move
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Hande player change function
function handlePlayerChange() {
    // change player using a ternary operator
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // set the game status message to reflect the current player
    statusDisplay.innerHTML = currentPlayerTurn();
}

// Result Validation function
function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // Check whether the game was a draw
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // If the game makes does not meet the roundWon or roundDraw condition then we will continue playing and change the player.
    handlePlayerChange();
}

// Handle cell click function
function handleCellClick(clickedCellEvent) {
    //variable to hold the clicked html element
    const clickedCell = clickedCellEvent.target;

    // Get the data-cell-index of the clicked cell and parse it into an integer since getAttribute will return a string
    const clickedCellIndex = parseInt (clickedCell.getAttribute('data-cell-index'));

    // check to see if cell has been played or if game is paused. If either is true we will ignore the click.
    if(gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    // if everything passed validation we will continue with the game.
    handleCellPlayed( clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Handle restart game function
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//Event Listeners for each of the cells and the restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);