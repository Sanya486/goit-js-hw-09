import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  startBtn: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  daysUi: document.querySelector('[data-days]'),
  hoursUi: document.querySelector('[data-hours]'),
  minutesUi: document.querySelector('[data-minutes]'),
  secondsUi: document.querySelector('[data-seconds]'),
};

let selectedPeriod = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0] <= new Date()) {
          isStartBtnDisabled(true);
          Notify.failure('Please choose a date in the future');
      }
      else {
          isStartBtnDisabled(false);
          selectedPeriod = selectedDates[0] - new Date()
      }
  },
};

flatpickr(refs.inputEl, options);

refs.startBtn.addEventListener('click', () => {
  isInputDisabled(true);
  isStartBtnDisabled(true);
  
    timerUi(selectedPeriod);
    const timerId = setInterval(() => {
        if (selectedPeriod >= 1000) {
           selectedPeriod -= 1000;
           timerUi(selectedPeriod); 
        }
        else {
            clearInterval(timerId);
        }
        
    }, 1000)
})



function isStartBtnDisabled(boolean) {
    refs.startBtn.disabled = boolean;
}

function isInputDisabled(boolean) {
  refs.inputEl.disabled = boolean;
}

function timerUi(selectedPeriod) {
    const { days, hours, minutes, seconds } = convertMs(selectedPeriod);
    refs.daysUi.textContent = days;
    refs.hoursUi.textContent = hours;
    refs.minutesUi.textContent = minutes;
    refs.secondsUi.textContent = seconds;
};

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
};