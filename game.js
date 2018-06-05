
const cardColors = ["red", "red", "green", "green", "blue", "blue", "brown", "brown", "yellow", "yellow", "gray", "gray", "cadetblue", "cadetblue", "violet", "violet", "lightgreen", "lightgreen"];

let cardsNode = document.querySelectorAll('div');

const cards = [];
const startGame = new Date().getTime();

let activeCard = '';
let activeCards = [];

const gamePairs = 9;

let gameResult = 0;


function clickCard() {
    activeCard = this;
    this.classList.remove('hidden');

    if (activeCards[0] == activeCard) {
        return;
    }
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach(card => card.removeEventListener('click', clickCard))
        activeCards[1] = activeCard;
        setTimeout(() => {
            if (activeCards[0].className === activeCards[1].className) {

                activeCards.forEach(cardClassName => cardClassName.classList.add('off'));
                gameResult += 1;
                if (gameResult == gamePairs) {
                    let endGameTime = new Date().getTime();
                    var endGame = (endGameTime - startGame) / 1000;
                    alert(`Wygrałeś grę! Zajęło Ci to ${endGame} sekund`)
                    location.reload();
                }

            } else {
                activeCards.forEach(cardClassName => cardClassName.classList.add('hidden'))
            }
            cards.forEach(card => card.addEventListener('click', clickCard));
            activeCard = '';
            activeCards.length = 0;
        }, 1000)

    }
}

cardsNode.forEach(value => cards.push(value));

cards.forEach(card => {
    const position = Math.floor(Math.random() * cardColors.length);

    card.classList.add(cardColors[position])

    cardColors.splice(position, 1);

    setTimeout(function () {
        card.classList.add('hidden');
    }, 1000)
    setTimeout(function () {
        card.classList.remove('hidden');
    }, 2000)
    setTimeout(function () {
        card.classList.add('hidden');
        cards.forEach(card => card.addEventListener('click', clickCard))
    }, 3000)
});


