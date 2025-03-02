// Accessing all the boxes, buttons, and containers
let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");


let turnX = true;  // Tracks whose turn it is (X or O)
let count = 0; // Tracks the number of moves

let scoreX = 0;
let scoreO = 0;


// Winning patterns for Tic-Tac-Toe
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6]
];


// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        if (turnX === true) {
            box.innerText = 'X';
            box.classList.add('playerX');
            box.classList.remove('playerO');

            turnX = false;
        }
        else {
            box.innerText = 'O';
            box.classList.add('playerO');
            box.classList.remove('playerX');

            turnX = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


// Function to check for a winner
const checkWinner = () => {

    for (const pattern of winPatterns) {

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {

            if (pos1val === pos2val && pos2val === pos3val) {

                showWinner(pos1val);
            }
        }
    }
}


// Function to display the winner
const showWinner = (winner) => {

    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    if (winner === 'X') {
        scoreX++;
    } else {
        scoreO++;
    }
    updateScoreboard();
}


// Function to update scoreboard
const updateScoreboard = () => {
    document.querySelector('#score-x').innerText = `X : ${scoreX}`;
    document.querySelector('#score-o').innerText = `O : ${scoreO}`;
};


// Function to handle a draw
const gameDraw = () => {

    msg.innerText = `Game Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};


// Function to reset the game
const resetGame = () => {

    turnX = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}


// Function to disable all boxes
const disableBoxes = () => {

    for (let box of boxes) {
        box.disabled = true;
    }
}


// Function to enable all boxes
const enableBoxes = () => {

    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove('playerX', 'playerO');
    }
}


// Event listeners for New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);