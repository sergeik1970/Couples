import { totalFlips } from "./gameLogic.js";

let totalTime = 80;
let intervalId;

function startTimer() {
    let seconds = document.querySelector(".state__time");
    let moves = document.querySelector(".state__moves");

    intervalId = setInterval(() => {
        totalTime--;
        seconds.textContent = `Время: ${totalTime}`;
        moves.textContent = `Шаги:  ${totalFlips}`;

        if (totalTime === 0) {
            clearInterval(intervalId);
            alert("Время вышло!");
        }
    }, 1000);

}

export { startTimer, totalTime, intervalId };