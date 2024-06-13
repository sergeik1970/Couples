const gameBoard = document.querySelector(".board__form")
const startButton = document.querySelector(".board__button")
const input = document.querySelector(".board__input")
const board = document.getElementById(gameBoard)

// console.log(gameBoard, startButton, input)

function createBoard(count, columns) {
    gameBoard.textContent = "";

    const template = document.querySelector("#gameTableTemplate").cloneNode(true).content;
    const gameTable = template.querySelector(".table");
    const restartBtn = template.querySelector(".table__button");

    for (let i = 0; i < count; i++) {
        gameTable.append(createCard())
    }

    gameTable.style = `
        grid-template-columns: repeat(${columns}, 1fr);
        grid-template-rows: repeat(${columns}, 1fr);
    `;

    gameBoard.append(gameTable);

    restartBtn.addEventListener("click", () => {
        location.reload();
    });

    gameBoard.append(restartBtn);
}

function createCard(flippedIcon) {
    const template = document.querySelector("#cardTemplate").cloneNode(true).content;

    const card = template.querySelector(".card");
    // добавление иконки, название которой передаем через параметр flippedIcon
    card.querySelector("#flippedIcon").classList.add(`fa-${flippedIcon}`)

    // return card означает, что получившийся объект выбрасывается в то место, где будет вызвана функция createCard
    return card;
}

startButton.addEventListener("click", (event) => {
    event.preventDefault()
    let columns = input.value;
    let count;
    if ((columns == 2) || (columns == 4) || (columns == 6)) {
        count = columns ** 2;
    }
    else {
        count = 4;
    }
    console.log(count)
    createBoard()
})