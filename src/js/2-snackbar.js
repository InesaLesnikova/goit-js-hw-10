import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.

// Якщо проміс виконується вдало, виводь у консоль наступний рядок, де delay — це значення затримки виклику промісу в мілісекундах.

// `✅ Fulfilled promise in ${delay}ms`;

// Якщо проміс буде відхилено, то виводь у консоль наступний рядок, де delay — це значення затримки промісу в мілісекундах.

// `❌ Rejected promise in ${delay}ms`

const form = document.querySelector('form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputFulfilled = document.querySelector('input[value="fulfilled"]');
const inputRejected = document.querySelector('input[value="rejected"]');

form.addEventListener('submit', sendDelay);

function sendDelay(event) {
  event.preventDefault(); // Запобігає перезавантаженню сторінки

  const delayValue = Number(inputDelay.value);
  const isFulfilled = inputFulfilled.checked; // Перевіряємо, яка кнопка вибрана

  userDelayValue(delayValue, isFulfilled)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        color: 'green',
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        color: 'red',
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
}

function userDelayValue(delay, isFulfilled) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
