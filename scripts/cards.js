import { gameLogic } from "./gameLogic.js";

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

function createIconsArray(initialCount) {
    const cardsIcons = ["compass", "cloud", "play", "bolt", "stop", "cogs", "atom", "basketball-ball", "arrows", "angle-left", "bars", "file", "filter", "gear", "folder", "folder-open", "shield", "scissors", "pen-clip"]

    let cards = cardsIcons.slice(0, initialCount / 2);

    const duobleCards = dublicateElements(cards);

    // Создаем перемешанный массив
    const myShuffleArray = shuffleArray(duobleCards);

    return myShuffleArray;
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
};

function dublicateElements(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(array[i], array[i]);
    }

    return newArray;
}


export { createCard, createIconsArray };