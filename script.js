let icons = ['diamond', 'horseshoe', 'seven', 'bell', 'cherry', 'lemon'];
let btn = document.getElementById('spinBtn');
let scoreTab = document.getElementById('score-number');
let score = 100;
const spinCost = 20;

window.onload = function () {
  renderScore();
  Slot1.spin();
  Slot2.spin();
  Slot3.spin();
};

const slotValues = {
  slot1 : 0,
  slot2 : 0,
  slot3 : 0
};
class Components {
  constructor(selector) {
    this.$el = document.getElementById(selector);
    
  }
  spin() {
    this.$el.className = 'slot';
    let number = Math.random() * 20;
    number = Math.round(number);
    while (number > icons.length - 1) {
      number -= icons.length;
    }
    this.$el.classList.add(icons[number]);
    slotValues[this.$el.id] = number;
  }
}
class Slot extends Components {
  constructor(options) {
    super(options.selector);
  }
}


const Slot1 = new Slot({
  selector: 'slot1',
});

Slot1.spin();

const Slot2 = new Slot({
  selector: 'slot2',
});

const Slot3 = new Slot({
  selector: 'slot3',
});

function renderScore() {
  scoreTab.innerHTML = score;
}

function gameOver() {
  score = 0;
  btn.classList.add('disabled');
  alert(
    'Прости дружок,у тебя кончились кредиты!'
  );
  window.onclick = function () {
    location.reload();
  };
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
  if (score < spinCost) {
    gameOver();
  }
  renderScore(score);
}

btn.onclick = function () {
  setTimeout(() => {
    Slot1.spin();
  }, 300);
  setTimeout(() => {
    Slot2.spin();
  }, 500);
  setTimeout(() => {
    Slot3.spin();
    scoreCalc();
  }, 700);
};
