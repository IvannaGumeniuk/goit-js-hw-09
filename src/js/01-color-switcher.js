const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

btnStart.addEventListener('click', clickButtonStart);
btnStop.addEventListener('click', clickButtonStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
    body.style.background = getRandomHexColor();
}

function clickButtonStart(event) {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(changeBodyColor, 1000);
};
    

function clickButtonStop(event) {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId); 
}