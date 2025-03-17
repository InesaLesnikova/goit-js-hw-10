import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`;

// Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`

const inputDelay = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');
const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.addEventListener('click', sendDelay);
function sendDelay(event) {
  event.preventDefault();

  const delayValue = Number(inputDelay.value);
  const isInputFulfilled = inputFulfilled.checked;

  return userDelayValue(delayValue, isInputFulfilled);
}

function userDelayValue(delayValue, isInputFulfilled) {
  let promise = new Promise((resolve, reject) => {
    if (isInputFulfilled) {
      setTimeout(() => {
        resolve(delayValue);
      }, delayValue);
    }
    if (reject) {
      setTimeout(() => {
        reject(delayValue);
      }, delayValue);
    }
  });

  promise
    .then(resolve => {
      iziToast.success({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delayValue}ms`,
      });
    })
    .catch(reject => {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${delayValue}ms`,
      });
    });
}
