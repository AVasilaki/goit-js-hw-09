import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');
const btn = document.querySelector('button');
btn.setAttribute('disabled', 'true');
let timer = {};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      alert('Please choose a date in the future');
    } else {
      btn.removeAttribute('disabled');
    }
    const selectTime = selectedDates[0].getTime();
    const currentTime = new Date().getTime();
    let timeDiferrens = selectTime - currentTime;

    btn.addEventListener('click', handlerClick);
    function handlerClick() {
      const timerId = setInterval(() => {
        timer = convertMs((timeDiferrens -= 1000));
        days.textContent = addLeadingZero(timer.days);
        hours.textContent = addLeadingZero(timer.hours);
        minutes.textContent = addLeadingZero(timer.minutes);
        seconds.textContent = addLeadingZero(timer.seconds);
      }, 1000);
    }
  },
};
const fp = flatpickr('#datetime-picker', options);

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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
