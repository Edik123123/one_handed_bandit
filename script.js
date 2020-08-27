let icons = ['diamond', 'horseshoe', 'seven', 'bell', 'cherry', 'lemon'];
let btn = document.getElementById('spinBtn');
let scoreTab = document.getElementById('score-number');
let score = 100;
const spinCost = 20;

const slotValues = {
  slot1: 0,
  slot2: 0,
  slot3: 0,
};
window.onload = function () {
  renderScore();
  spin('slot1');
  spin('slot2');
  spin('slot3');
};


function renderScore() {
  scoreTab.innerHTML = score;
}

function gameOver() {
  score = 0;
  btn.classList.add('disabled');
  alert('Прости дружок,ты проебал!а теперь иди от сюда, от тебя говной воняет =|');
  window.onclick = function () {
    location.reload();
  }
}

function spin(slotId) {
  const slot = document.getElementById(slotId);
  slot.className = 'slot';
  let number = Math.random() * 20;
  number = Math.round(number);
  while (number > icons.length - 1) {
    number -= icons.length;
  }
  slot.classList.add(icons[number]);
  slotValues[slotId] = number;
}

function scoreCalc() {
  const { slot1, slot2, slot3 } = slotValues;
  let result = -spinCost;
  if (slot1 == slot2 && slot1 == slot3) {
    switch (slot1) {
      case 0:
        result = 1000;
        break;
      case 1:
        result = 800;
        break;
      case 2:
        result = 777;
        break;
      case 3:
        result = 500;
        break;
      case 4:
        result = 150;
        break;
      case 5:
        result = 50;
        break;
    }
  } else {
    const slotArr = [slot1, slot2, slot3];
    if (slotArr.includes(0) && slotArr.includes(1) && slotArr.includes(3)) {
      result = 450;
    }
    if (slotArr.includes(2) && slotArr.includes(4) && slotArr.includes(5)) {
      result = 150;
    }
  }
  score += result;
  if (score < spinCost ) {
    gameOver();
  }
  renderScore(score);
}

btn.onclick = function () {
  setTimeout(spin, 300, 'slot1');
  setTimeout(spin, 500, 'slot2');
  setTimeout(() => {
    spin('slot3');
    scoreCalc();
  }, 700);
};
