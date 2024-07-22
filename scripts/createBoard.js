import { createIconsArray, createCard } from "./cards.js";
import { startTimer } from "./timer.js";

export function createBoard(count, columns) {

    const gameBoard = document.querySelector(".board__form");
    const template = document.querySelector("#gameTableTemplate").cloneNode(true).content;
    const gameTable = template.querySelector(".table");
    const restartBtn = template.querySelector(".table__button");

    gameBoard.textContent = "";

    gameTable.style = `
        grid-template-columns: repeat(${columns}, 1fr);
        grid-template-rows: repeat(${columns}, 1fr);
    `;

    gameBoard.append(gameTable);

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

    gameBoard.append(restartBtn);


    // выбираем иконки
    createIconsArray(count);

    const icons = createIconsArray(count);
    console.log(icons);

    // добавляем иконки каждой карточке
    icons.forEach((icon) => {
        gameTable.append(createCard(icon));
    });

    // начало отсчета таймера и счетчика шагов
    startTimer();
}