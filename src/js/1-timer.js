import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('.timer');

let userSelectedDate = {};

buttonEl.addEventListener('click', setTimer);
buttonEl.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates.length > 0) {
      userSelectedDate = selectedDates[0];
      if (userSelectedDate > Date.now()) {
        buttonEl.removeAttribute('disabled');
      } else {
        buttonEl.setAttribute('disabled', 'true');
        iziToast.error({
          color: 'red',
          position: 'topRight',
          message: `Please choose a date in the future`,
        });
      }
    }
  },
};
const calendar = flatpickr('#datetime-picker', options);

function setTimer() {
  const timeMs = userSelectedDate - Date.now();
  const time = convertMs(timeMs);

  const days = timerEl.querySelector('span[data-days]');
  const hours = timerEl.querySelector('span[data-hours]');
  const minutes = timerEl.querySelector('span[data-minutes]');
  const seconds = timerEl.querySelector('span[data-seconds]');

  days.textContent = String(time.days).padStart(2, '0');
  hours.textContent = String(time.hours).padStart(2, '0');
  minutes.textContent = String(time.minutes).padStart(2, '0');
  seconds.textContent = String(time.seconds).padStart(2, '0');

  buttonEl.setAttribute('disabled', 'true');
  inputEl.setAttribute('disabled', 'true');

  startCountdown(timeMs);
}

function startCountdown() {
  let intervalId = setInterval(() => {
    const remainingTime = userSelectedDate - Date.now();
    const time = convertMs(remainingTime);

    timerEl.querySelector('span[data-days]').textContent = String(
      time.days
    ).padStart(2, '0');
    timerEl.querySelector('span[data-hours]').textContent = String(
      time.hours
    ).padStart(2, '0');
    timerEl.querySelector('span[data-minutes]').textContent = String(
      time.minutes
    ).padStart(2, '0');
    timerEl.querySelector('span[data-seconds]').textContent = String(
      time.seconds
    ).padStart(2, '0');

    if (remainingTime <= 1000) {
      clearInterval(intervalId);
      intervalId = null;
      inputEl.removeAttribute('disabled');
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
