const message = document.getElementById('message');
const rule = document.getElementById('rule');
const startGameButton = document.getElementById('startButton');
const infoBlock = document.getElementById('infoBlock');
const backdrop = document.getElementById('backdrop');
const backButton = document.getElementById('back-button');
const settingsButton1 = document.getElementById('settings-button_mobile');
const settingsButton2 = document.getElementById('settings-button_desktop');

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

const rules = [
  'scissors cuts paper',
  'paper covers rock',
  'rock crushes lizard',
  'lizard poisons spock',
  'spock smashes scissors',
  'scissors decapitates lizard',
  'lizard eats paper',
  'paper disproves spock',
  'spock vaporizes rock',
  'rock crushes scissors'
];

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

// function to display the rule between the selected signs
displayRule = (sign1, sign2) => {
  let display;

  for (i = 0; i < rules.length; i++) {
    if (sign1 == sign2) {
      display = sign1 + ' against ' + sign2;
    } else if (rules[i].includes(sign1) && rules[i].includes(sign2)) {
      display = rules[i];
  }
}
  rule.innerHTML = display;
}

//function to select winner between player and computer
selectWinner = (player, computer) => {
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

  displayRule(player, computer);
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

settingsButton1.addEventListener('click', function () {
  document.getElementById('settingsBlock').style.display = 'block';
});

settingsButton2.addEventListener('click', function() {
  document.getElementById('settingsBlock').style.display = 'block';
});

backButton.addEventListener('click', () => {
  document.getElementById('settingsBlock').style.display = 'none';
});

startGameButton.addEventListener('click', function () {
  infoBlock.style.display = 'none';
  backdrop.style.display = 'none';
  rule.innerHTML = '';
  rotatePlayerHandSign = setInterval(function () {
    rotateImages(playerHandSign);
  }, 300);
  rotateComputerHandSign = setInterval(function () {
    rotateImages(computerHandSign);
  }, 300);
});


const ruleShowButton = document.getElementById('rule-right');
const ruleHideButton = document.getElementById('rule-down');
const ruleBlock = document.getElementById('game-rule');

const setColorShowButton = document.getElementById('set-color-right');
const setColorHideButton = document.getElementById('set-color-down');
const setColorBlock = document.getElementById('set-color');



ruleShowButton.addEventListener('click', () => {
  $(ruleBlock).show(1000);
  ruleShowButton.style.display = 'none';
  ruleHideButton.style.display = 'inline-block';
});

ruleHideButton.addEventListener('click', () => {
  $(ruleBlock).hide(1000);
  ruleShowButton.style.display = 'inline-block';
  ruleHideButton.style.display = 'none';
});

setColorShowButton.addEventListener('click', () => {
  $(setColorBlock).show(1000);
  setColorShowButton.style.display = 'none';
  setColorHideButton.style.display = 'inline-block';
});

setColorHideButton.addEventListener('click', () => {
  $(setColorBlock).hide(1000);
  setColorShowButton.style.display = 'inline-block';
  setColorHideButton.style.display = 'none';
});

