import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const days = document.querySelector('.value[data-days]');
console.log(days);
const hours = document.querySelector('.value[data-hours]');
console.log(hours);
const minutes = document.querySelector('.value[data-minutes]');
console.log(minutes);
const seconds = document.querySelector('.value[data-seconds]');
console.log(seconds);
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
    }
    btn.removeAttribute('disabled');
    const selectTime = selectedDates[0].getTime();
    console.log(selectTime);
    const currentTime = new Date().getTime();
    console.log(currentTime);
    let timeDiferrens = selectTime - currentTime;
    console.log(timeDiferrens);

    console.log(timer);
    btn.addEventListener('click', handlerClick);
    function handlerClick() {
      const timerId = setInterval(() => {
        timer = convertMs((timeDiferrens -= 1000));
        days.textContent = timer.days;
        hours.textContent = timer.hours;
        minutes.textContent = timer.minutes;
        seconds.textContent = timer.seconds;
      }, 1000);
    }
  },
};
const fp = flatpickr('#datetime-picker', options);
console.log(options.defaultDate);
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
