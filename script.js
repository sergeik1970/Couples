import { createBoard } from "./scripts/createBoard.js";


const startButton = document.querySelector(".board__button");
const input = document.querySelector(".board__input");
const board = document.getElementById(gameBoard);


startButton.addEventListener("click", (event) => {
    event.preventDefault()
    let columns = input.value;
    let count;
    if ((columns == 2) || (columns == 4) || (columns == 6)) {
        count = columns ** 2;
    }
    else {
        columns = 2;
        count = columns ** 2;
    }

    createBoard(count, columns);
})