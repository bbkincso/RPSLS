const message = document.getElementById('message');
const startGameButton = document.getElementById('startButton');
const infoBlock = document.getElementById('infoBlock');
const backdrop = document.getElementById('backdrop');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const lizard = document.getElementById('lizard');
const spock = document.getElementById('spock');

const playerHandSign = document.getElementById('playerSign');
const computerHandSign = document.getElementById('computerSign');

const loosingSound = document.getElementById('loosingSound');

const signs = [
  { name: 'lizard', defeates: ['paper', 'spock'] },
  { name: 'rock', defeates: ['scissors', 'lizard'] },
  { name: 'paper', defeates: ['rock', 'spock'] },
  { name: 'spock', defeates: ['rock', 'scissors'] },
  { name: 'scissors', defeates: ['paper', 'lizard'] },
];
let signIndex = 0;

//function to get random hand sign for computer
function getRandomHandSign() {
  let random = Math.floor(Math.random() * signs.length);
  return signs[random].name;
}

// function to change the image for the selected hand sign
changeImage = (img, sign) => {
  const newSrc = 'images/' + sign + '.png';
  img.src = newSrc;
};

//function to display images in sequence
rotateImages = (img) => {
  changeImage(img, signs[signIndex].name);
  if (signs.length > signIndex + 1) {
    signIndex++;
  } else {
    signIndex = 0;
  }
};

//function to select winner between player and computer
selectWinner = (player, computer) => {
  console.log('player=' + player + ' computer= ' + computer);
  let display;

  sign = signs.filter((sign) => {
    return sign.name == player;
  });
  if (player == computer) {
    display = "It's a draw!";
  } else if (sign[0].defeates.includes(computer)) {
    display = 'You won!';
  } else {
    display = 'You lost!';
  }

  message.innerHTML = display;
  startGameButton.innerHTML = 'Play again';

  infoBlock.style.display = 'block';
  backdrop.style.display = 'block';
};

//function to play the game
game = (playerChoice) => {
  clearInterval(rotatePlayerHandSign);
  clearInterval(rotateComputerHandSign);
  const computerChoice = getRandomHandSign();
  changeImage(computerHandSign, computerChoice);
  changeImage(playerHandSign, playerChoice);
  selectWinner(playerChoice, computerChoice);
};

// event listeners
document.addEventListener('click', (e) => {
  signs.forEach((sign) => {
    if (e.target.id == sign.name) {
      game(sign.name);
    }
  });
});

startGameButton.addEventListener('click', function () {
  infoBlock.style.display = 'none';
  backdrop.style.display = 'none';
  rotatePlayerHandSign = setInterval(function () {
    rotateImages(playerHandSign);
  }, 300);
  rotateComputerHandSign = setInterval(function () {
    rotateImages(computerHandSign);
  }, 300);
});
