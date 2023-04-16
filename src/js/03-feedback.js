//* Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".
//* При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. В противном случае поля должны быть пустыми.
//* При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
//* Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

import throttle from 'lodash.throttle';

const feedbackFormElement = document.querySelector('.feedback-form');
const emailInputElement = document.querySelector("input[name='email']");
const textAreaElement = document.querySelector("textarea[name='message']");
let feedbackDataObj = localStorage.getItem('feedback-form-state');

document.addEventListener('DOMContentLoaded', checkLocalStorage);
feedbackFormElement.addEventListener('input', throttle(onFormInput, 500));
feedbackFormElement.addEventListener('submit', onFeedbackFormSubmit);

function onFormInput(event) {
  feedbackDataObj = {
    email: emailInputElement.value,
    message: textAreaElement.value,
  };

  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackDataObj));
}

function checkLocalStorage() {
  if (feedbackDataObj === null) {
    return;
  }

  emailInputElement.value = JSON.parse(feedbackDataObj).email;
  textAreaElement.value = JSON.parse(feedbackDataObj).message;
}

function onFeedbackFormSubmit(event) {
  event.preventDefault();

  feedbackFormElement.reset();

  console.log(
    `email: ${feedbackDataObj.email} \nmessage: ${feedbackDataObj.message})`
  );

  localStorage.removeItem('feedback-form-state');
}
