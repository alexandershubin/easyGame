const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['red', 'orange', 'blue', 'green', 'yellow', 'white'];
let time = 0;
let score = 0

const winTheGame = () => {
  const kill = () => {
    const circle = document.querySelector('.circle')
    if (circle) {
      circle.click()
    }
  }

  setInterval(kill, 75)
}

// winTheGame();

const setTime = (value) => {
  timeEl.innerHTML = `00:${value}`
}

const getColoros = () => {
  return colors[Math.floor(Math.random() * colors.length)];
}

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const createRandomCircle = () => {
  const size = getRandomNumber(0, 50);
  const circle = document.createElement('div');
  circle.classList.add('circle');

  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getColoros();

  board.append(circle);
}

const finishGame = () => {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

const decreaseTime = () => {
  if (time === 0 ) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current);
  }
}

const startGame = () => {
  setInterval(decreaseTime, 1000)
  timeEl.innerHTML = `00:${time}`;
  setTime(time);
  createRandomCircle();
}

startBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', ({target}) => {
  if (target.classList.contains('time-btn')) {
    time = Number(target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame()
  }
});

board.addEventListener('click', ({target}) => {
  if (target.classList.contains('circle')) {
    score++
    target.remove();
    createRandomCircle();
  }
})
