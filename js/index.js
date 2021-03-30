const message = document.getElementById('message');
const rule = document.getElementById('rule');
const startGameButton = document.getElementById('startButton');
const infoBlock = document.getElementById('infoBlock');
const backdrop = document.getElementById('backdrop');
const settingsButton1 = document.getElementById('settings-button_mobile');
const settingsButton2 = document.getElementById('settings-button_desktop');

const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const lizard = document.getElementById('lizard');
const spock = document.getElementById('spock');

const playerHandSign = document.getElementById('playerSign');
const computerHandSign = document.getElementById('computerSign');

const pScore = document.getElementById('player-score');
const cScore = document.getElementById('computer-score');
const myMusic = document.getElementById('main');

// FOR SETTINGS BLOCK
const backButton = document.getElementById('back-button');

const ruleShowButton = document.getElementById('rule-right');
const ruleHideButton = document.getElementById('rule-down');
const ruleBlock = document.getElementById('game-rule');

const setColorShowButton = document.getElementById('set-color-right');
const setColorHideButton = document.getElementById('set-color-down');
const setColorBlock = document.getElementById('set-color');

const setSoundShowButton = document.getElementById('set-sound-right');
const setSoundHideButton = document.getElementById('set-sound-down');
const setSoundBlock = document.getElementById('set-sound');

const soundOn = document.getElementById('sound-on');
const soundOff = document.getElementById('sound-off');
soundOn.checked = true;


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


//FUNCTIONS ON "MAIN SCREEN"

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

//function to play the game
game = (playerChoice) => {
  disableEnableClick('none');

  clearInterval(rotatePlayerHandSign);
  clearInterval(rotateComputerHandSign);
  const computerChoice = getRandomHandSign();
  changeImage(computerHandSign, computerChoice);
  changeImage(playerHandSign, playerChoice);
  earnPoints(playerChoice, computerChoice);
  displayRule(playerChoice, computerChoice);
};

//function to change handsigns between clickable and disabled
const disableEnableClick = function (state) {
  const handSigns = document.getElementsByClassName('sign');
  const len = handSigns.length;

  if (state == 'none') {
    for(i = 0 ; i < len; i++){
      handSigns[i].style.pointerEvents = state;
      handSigns[i].style.opacity = '0.3';
    } 
    } else {
      for(i = 0 ; i < len; i++){
        handSigns[i].style.pointerEvents = state;
        handSigns[i].style.opacity = '1';
      }
  }
  
}

//function to continue the game after selecting a sign
const clearGame = function () {
  rotatePlayerHandSign = setInterval(function () {
    rotateImages(playerHandSign);
  }, 300);
  rotateComputerHandSign = setInterval(function () {
    rotateImages(computerHandSign);
  }, 300);
  rule.innerHTML = '';
  disableEnableClick('auto');
};

//function to earn points
  const earnPoints = function (player, computer) {
    const playerScore = pScore.innerText;
    const computerScore = cScore.innerText;
    let playerScoreInt = parseInt(playerScore);
    let computerScoreInt = parseInt(computerScore);

    sign = signs.filter((sign) => {
      return sign.name == player;
    });
    if (player == computer) {
      playerScoreInt = playerScoreInt +1;
      computerScoreInt = computerScoreInt +1;
    } else if (sign[0].defeates.includes(computer)) {
      playerScoreInt = playerScoreInt +1;
    } else {
      computerScoreInt = computerScoreInt +1;
    }

    pScore.innerText = playerScoreInt.toString();
    cScore.innerText = computerScoreInt.toString();

    if (playerScoreInt < 3 && computerScoreInt < 3) {
      setTimeout(() => {clearGame()}, 2500);
    } else {
      selectWinner(playerScoreInt, computerScoreInt);
    }
  };

  //function to select a winner
  selectWinner = (player, computer) => {
    let display;
    let sound;
      if (player == computer) {
        display = "It's a draw!";
        sound = 'draw';
      } else if (player > computer) {
        display = 'You won!';
        sound = 'won';
      } else {
        display = 'You lost!';
        sound = 'lost';
      }
    
      message.innerHTML = display;
      playSound(sound);
      startGameButton.innerHTML = 'Play again';
      infoBlock.style.display = 'block';
      backdrop.style.display = 'block';
  }


//FUNCTIONS FOR SETTINGS BLOCK

//function to hide block
const hideBlock = function (myBlock, imgShow, imgHide) {
  $(myBlock).hide(600);
  imgShow.style.display = 'inline-block';
  imgHide.style.display = 'none';
};

//function to show hidden block
const showBlock = function (myBlock, imgShow, imgHide) {
  $(myBlock).show(600);
  imgShow.style.display = 'inline-block';
  imgHide.style.display = 'none';
};

//function to change color
const changeColor = function (mainColor, mainColor2, changeTextColor) {
  const coloredElements = document.getElementsByClassName('mainColor');
  const coloredElements2 = document.getElementsByClassName('mainColor2');
  const coloredElements3 = document.getElementsByClassName('changeTextColor');

  for(i = 0 ; i < coloredElements.length; i++){
    coloredElements[i].style.backgroundColor = mainColor;
  }

  for(i = 0 ; i < coloredElements2.length; i++){
    coloredElements2[i].style.backgroundColor = mainColor2;
  }

  for(i = 0 ; i < coloredElements3.length; i++){
    coloredElements3[i].style.color = changeTextColor;
  }
};

//function to select playing sound
const playSound = function (sound) {
  const myAudio = document.createElement('audio');
  myAudio.src = "audio/" + sound + ".wav";
  if (soundOn.checked) {
    myAudio.play();
  }
};


// EVENT LISTENERS ON "MAIN SCREEN"
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

startGameButton.addEventListener('click', function () {
  infoBlock.style.display = 'none';
  backdrop.style.display = 'none';
  rule.innerHTML = '';
  pScore.innerHTML = '0';
  cScore.innerHTML = '0';

  disableEnableClick('auto');

  rotatePlayerHandSign = setInterval(function () {
    rotateImages(playerHandSign);
  }, 300);
  rotateComputerHandSign = setInterval(function () {
    rotateImages(computerHandSign);
  }, 300);
});





// EVENT LISTENERS FOR SETTINGS BLOCK

backButton.addEventListener('click', () => {
  document.getElementById('settingsBlock').style.display = 'none';
});

ruleShowButton.addEventListener('click', () => {
  hideBlock(setColorBlock, setColorShowButton, setColorHideButton);
  hideBlock(setSoundBlock, setSoundShowButton, setSoundHideButton);
  showBlock(ruleBlock, ruleHideButton, ruleShowButton);
});

ruleHideButton.addEventListener('click', () => {
  hideBlock(ruleBlock, ruleShowButton, ruleHideButton);
});


setColorShowButton.addEventListener('click', () => {
  hideBlock(ruleBlock, ruleShowButton, ruleHideButton);
  hideBlock(setSoundBlock, setSoundShowButton, setSoundHideButton);
  showBlock(setColorBlock, setColorHideButton, setColorShowButton);
});

setColorHideButton.addEventListener('click', () => {
  hideBlock(setColorBlock, setColorShowButton, setColorHideButton);
});

setSoundShowButton.addEventListener('click', () => {
  hideBlock(ruleBlock, ruleShowButton, ruleHideButton);
  hideBlock(setColorBlock, setColorShowButton, setColorHideButton);
  showBlock(setSoundBlock, setSoundHideButton, setSoundShowButton);
});

setSoundHideButton.addEventListener('click', () => {
  hideBlock(setSoundBlock, setSoundShowButton, setSoundHideButton);
});

document.addEventListener('click', (e) => {
  const colors = [
    { name: 'black', maincolor: '#000000', mainColor2: '#f7f7f7', changeTextColor: '#f7f7f7'},
    { name: 'orange', maincolor: '#fcb110', mainColor2: '#fff5e6', changeTextColor: '#292828'},
    { name: 'blue', maincolor: '#005580', mainColor2: '#f0faff', changeTextColor: '#ffffff'},
  ];

  colors.forEach((color) => {
    if (e.target.id == color.name) {
      changeColor(color.maincolor, color.mainColor2, color.changeTextColor);
    }
  });
});

soundOff.addEventListener('click', () => {
  soundOn.checked = false;
});

soundOn.addEventListener('click', () => {
  soundOn.checked = true;
});


//function to check online status
const checkOnlineStatus = async () => {
  const myUrl = window.location.href;
  console.log(myUrl);
  try {
    const online = await fetch(myUrl + '1x1.png');
      return online.status >= 200 && online.status < 300; 
  } catch (err) {
    return false;
  }
};

// check every few seconds if internet is available
setInterval(async () => {
  const warningMessage = document.getElementById('check-internet');
  const video = document.getElementById('game-rule_video');

  if(await checkOnlineStatus()) {
    warningMessage.style.display = 'none';
    video.style.pointerEvents = 'auto'
  } else {
    warningMessage.style.display = 'block';
    video.style.pointerEvents = 'none'
  }
}, 3000); 

window.addEventListener("load", async (event) => {
  const warningMessage = document.getElementById('check-internet');
  const video = document.getElementById('game-rule_video');

  if(await checkOnlineStatus()) {
    warningMessage.style.display = 'none';
    video.style.pointerEvents = 'auto'
  } else {
    warningMessage.style.display = 'block';
    video.style.pointerEvents = 'none'
  }
});