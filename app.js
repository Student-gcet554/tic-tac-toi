const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const winningMessage = document.getElementById('winningMessage');
const winnerText = document.getElementById('winner');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(e) {
  const cell = e.target;
  if (cell.classList.contains('taken')) return;

  // Mark the cell
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  // Check for win or draw
  if (checkWin()) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.classList.contains('taken'));
}

function endGame(draw) {
  if (draw) {
    winnerText.textContent = 'It\'s a Draw!';
  } else {
    winnerText.textContent = `${currentPlayer}`;
  }
  winningMessage.classList.remove('hidden');
  restartButton.classList.remove('hidden');
  board.classList.add('finished');
}

function restartGame() {
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
  winningMessage.classList.add('hidden');
  restartButton.classList.add('hidden');
  board.classList.remove('finished');
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
