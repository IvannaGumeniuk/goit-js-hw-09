import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix, { Notify } from 'notiflix';


const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
const timer = document.querySelector('.timer');
// startBtn.addEventListener('click', startСountdown);
let data = new Date();
let selectedDates = 0;

startBtn.disabled = true;

flatpickr(input, {
    enableTime: true,
    time_24hr: true,
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y-m-d",
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < data) {
        Notify.failure("Please choose a date in the future");
        return;
      } 
        startBtn.disabled = false;
      
    //   selectedDates = selectedDates[0];
startBtn.addEventListener('click', startСountdown);
function startСountdown() {
    timer.textContent = `${convertMs(selectedDates - data)}`
    console.log(convertMs(selectedDates - data))
};
      },
});

// function startСountdown() {
//     timer.textContent = `${convertMs(selectedDates - data)}`
//     console.log(convertMs(selectedDates - data))
// };

// function showTimer() {
    
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}