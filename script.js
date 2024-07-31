const gameBoard = document.getElementById('gameBoard');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

const images = [
    'apple.jpg', 'banana.png', 'cherry.png', 'grape.png',
    'orange.png', 'pear.png', 'pineapple.png', 'strawberry.png'
];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timer = 0;
let intervalId = null;

function startGame() {
    gameBoard.innerHTML = '';
    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    score = 0;
    timer = 0;

    clearInterval(intervalId);
    timerElement.textContent = `Tempo: ${timer}s`;
    scoreElement.textContent = `Pontuação: ${score}`;

    const cardImages = [...images, ...images];
    cardImages.sort(() => Math.random() - 0.5);

    cardImages.forEach(imgSrc => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        const front = document.createElement('img');
        front.src = imgSrc;

        card.appendChild(front);
        card.addEventListener('click', flipCard);

        gameBoard.appendChild(card);
        cards.push(card);
    });

    intervalId = setInterval(updateTimer, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        score++;
        scoreElement.textContent = `Pontuação: ${score}`;
        resetBoard();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    if (cards.every(card => card.classList.contains('flipped'))) {
        setTimeout(() => {
            clearInterval(intervalId);
            alert(`Jogo finalizado! Sua pontuação: ${score}`);
        }, 500);
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateTimer() {
    timer++;
    timerElement.textContent = `Tempo: ${timer}s`;
}

startGame();
