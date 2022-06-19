import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (options.defaultDate.getTime() >= selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;

    } else {
      startBtn.disabled = false;
    }
  },
};

let intervalId = null;
let dataValue = 0;

flatpickr(input, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace() {
  let deltaTime = convertMs(dataValue.getTime() - new Date().getTime());
  
  daysEl.innerHTML = deltaTime.days;
  hoursEl.innerHTML = deltaTime.hours;
  minutesEl.innerHTML = deltaTime.minutes;
  secondsEl.innerHTML = deltaTime.seconds;

  startBtn.disabled = true;

  if (dataValue.getTime() - new Date().getTime() <= 1000) {
    
    clearInterval(intervalId);

    startBtn.disabled = false;
    input.setAttribute('readonly', false);
  }
};

startBtn.addEventListener('click', startСountdown);

  function startСountdown() {
    dataValue = new Date(input.value);
    input.disabled = true;
    
    updateClockFace();
    
    intervalId = setInterval(updateClockFace, 1000);
};








