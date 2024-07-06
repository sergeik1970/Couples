const gameBoard = document.querySelector(".board__form");
const startButton = document.querySelector(".board__button");
const input = document.querySelector(".board__input");
const board = document.getElementById(gameBoard);

const couple = {
    first: null,
    second: null,
    firstClickable: true,
    secondClickable: true
}

let totalTime = 60;
let totalFlips = 0;
let intervalId;

// console.log(gameBoard, startButton, input)

function createBoard(count, columns) {
    gameBoard.textContent = "";

    const template = document.querySelector("#gameTableTemplate").cloneNode(true).content;
    const gameTable = template.querySelector(".table");
    const restartBtn = template.querySelector(".table__button");

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

function createCard(flippedIcon) {
    const template = document.querySelector("#cardTemplate").cloneNode(true).content;

    const card = template.querySelector(".card");
    // добавление иконки, название которой передаем через параметр flippedIcon
    card.querySelector("#flippedIcon").classList.add(`fa-${flippedIcon}`);

    // вызываем функцию gameLogic
    card.addEventListener("click", () => gameLogic(card));

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
        columns = 2;
        count = columns ** 2;
    }

    if (columns == 6) {
        totalTime = 80;
    }
    createBoard(count, columns);
})

function createIconsArray(initialCount) {
    const cardsIcons = ["compass", "cloud", "play", "bolt", "stop", "cogs", "atom", "basketball-ball", "arrows", "angle-left", "bars", "file", "filter", "gear", "folder", "folder-open", "shield", "scissors", "pen-clip"]

    let cards = cardsIcons.slice(0, initialCount / 2);

    const duobleCards = dublicateElements(cards);

    // Создаем перемешанный массив
    const myShuffleArray = shuffleArray(duobleCards);

    return myShuffleArray;
}

function dublicateElements(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(array[i], array[i]);
    }

    return newArray;
}
// Функция может перемешать любой массив
function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
        // Отнимаем индекс
        currentIndex = currentIndex - 1;
        // Генерируем рандомный индекс
        const randomIndex = Math.floor(Math.random() * currentIndex);
        //  Сохраняем элемент текущего индекса
        const temp = array[currentIndex];
        // По текущему индексу размещаем элемент по случайному индексу
        array[currentIndex] = array[randomIndex];
        // А на место элемента по случайному индексу ставим сохранённый элемент бывшего текущего индекса
        array[randomIndex] = temp;
    }
    // Возвращаем изменённый массив
    return array;
}

function gameLogic(card) {

    console.log(card, couple)

    if (totalTime === 0) return;


    // Если обе карточки не кликабельны, ничего не делаем
    if (!couple.firstClickable && !couple.secondClickable) return;

    // Переворачиваем карточку
    card.classList.add("flip");
    totalFlips ++;
    console.log(totalFlips)

    // Проверяем, кликнута ли первая карточка
    if (couple.first === null) {
        // Если нет, то сохраняем на нее ссылку и считаем кликнутой
        // card - карточка которую передали в качестве аргумента
        couple.first = card;
        couple.firstClickable = false;
    } else if (couple.second === null && couple.first !== card) {
        // Если да, то проверяем, кликнута ли вторая карточка и не является ли вторая карточка той же самой карточкой, что и первая, и если нет, то сохраняем ссылку на эту карточку и считаем ее кликнутой
        couple.second = card;
        couple.secondClickable = false;
    }

    // Если какой-либо карточки не кликнуто, ничего не делаем
    if (couple.first === null || couple.second === null) return;

    // Сравниваем классы двух карточек и сохраняем логический результат в переменную (это для повышения читабельности)
    const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

    // Если классы одинаковы
    if (isEqual) {
        setTimeout(() => {
            // То перекрашиваем их в зеленый с задержкой в 1 секунду
            couple.first.classList.add('successfully');
            couple.second.classList.add('successfully');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    } else {
        setTimeout(() => {
            // Иначе переворачиваем карточки обратно с задержкой в 1 секунду
            couple.first.classList.remove('flip');
            couple.second.classList.remove('flip');

            // Сбрасываем все ссылки и состояния
            refresh();
        }, 1000);
    }

    // Функция сброса ссылок и состояний
    function refresh() {
        couple.first = null;
        couple.second = null;
        couple.firstClickable = true;
        couple.secondClickable = true;
    }

    isWin();
}

function isWin() {
    const gameTable = document.querySelector('.table');
    if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
      setTimeout(() => {
        alert("Поздравляем! Вы выиграли!");
        clearInterval(intervalId);
      }, 2000)
    }
  }

function startTimer() {
    let seconds = document.querySelector(".state__time");
    let moves = document.querySelector(".state__moves");

    intervalId = setInterval(() => {
        totalTime--;
        seconds.textContent = `Время: ${totalTime}`;
        moves.textContent = `Шаги:  ${totalFlips}`;

        if (totalTime ===  0)  {
            clearInterval(intervalId);
            alert("Время вышло!");
        }
    }, 1000);

}