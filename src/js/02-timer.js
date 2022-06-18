import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const daysData = document.querySelector('.value[data-days]');
const hoursData = document.querySelector('.value[data-hours]');
const minutesData = document.querySelector('.value[data-minutes]');
const secondsData = document.querySelector('.value[data-seconds]');

// flatpickr(input, {
//     enableTime: true,
//     time_24hr: true,
//     altInput: true,
//     altFormat: "F j, Y",
//     dateFormat: "Y-m-d",
//     defaultDate: new Date(),
//     minuteIncrement: 1,
    
//     onClose(selectedDate) {
//       console.log(selectedDate[0]);
//       if (selectedDate[0].getTime() <= this.defaultDate.getTime()) {
//         Notify.failure("Please choose a date in the future");
//         startBtn.disabled = true;
//         // return;
//     }
//     startBtn.disabled = false;
//   }
// },
// );

// let timer = 0;
// let dataVal = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (options.defaultDate.getTime() >= selectedDates[0].getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      Notiflix.Notify.success("Great! Let's go to start!");
     startBtn.disabled = false;
    }
  },
};
let timer = null;
let dataVal = 0;

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function writeNewTime() {
  let deltaTime = convertMs(dataVal.getTime() - new Date().getTime());
  daysData.innerHTML = deltaTime.days;
  hoursData.innerHTML = deltaTime.hours;
  minutesData.innerHTML = deltaTime.minutes;
  secondsData.innerHTML = deltaTime.seconds;

  // let time = convertMs(deltaTime);
  // updateClockFace(time);
  startBtn.disabled = true;

  if (dataVal.getTime() - new Date().getTime() <= 1000) {
    clearInterval(timer);
    startBtn.disabled = false;
    input.setAttribute('readonly', false);
  }
};



startBtn.addEventListener('click', startСountdown);

  function startСountdown() {
  dataVal = new Date(input.value);
  input.disabled = true;
    writeNewTime();
  timer = setInterval(writeNewTime, 1000);
  // timer.start();
};


// const timer = {
//   start() {
//     const startTime = Date.now();

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = currentTime - startTime;
//       const time = convertMs(deltaTime);

//       updateClockFace(time);
//       // console.log(`${days}:${hours}:${minutes}:${seconds}`);
// }, 1000);
//   },
// };









// function updateClockFace({ days, hours, minutes, seconds }) {
//   daysData.textContent = `${days}`;
//   hoursData.textContent = `${hours}`;
//   minutesData.textContent = `${minutes}`;
//   secondsData.textContent = `${seconds}`;
// }
