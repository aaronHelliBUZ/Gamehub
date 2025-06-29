const symbols = ['🍎', '🍌', '🍒', '🍇'];
let cards = [...symbols, ...symbols]; // 4 Paare
let flippedCards = [];
let matchedCount = 0;

const gameBoard = document.getElementById('game-board');

// Karten mischen
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(cards);
  cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.textContent = symbol;

    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });
}

function flipCard(card) {
  if (card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkForMatch();
  }
}

function checkForMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCount++;

    if (matchedCount === cards.length / 2) {
      setTimeout(() => {
        alert('🎉 Du hast alle Paare gefunden!');
        location.reload();
      }, 300);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
    }, 800);
  }

  flippedCards = [];
}

createBoard();
