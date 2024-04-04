import { isEscapeKey } from './util.js';


// Ищем образец сообщений в разметке
const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

// Функция, скрывающая сообщение
const hideMessage = () => {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

// Скрытие сообщения при нажатии на кнопку закрытия
const onCloseButtonClick = () => hideMessage();

// Скрытие сообщения при нажатии на Esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

// Скрытие сообщения при нажатии на область вокруг сообщения
function onBodyClick(evt) {
  if (evt.target.closest('.success__inner') || (evt.target.closest('.error__inner'))) {
    return;
  }

  hideMessage();
}

// Показ сообщения
const showMessage = (element, buttonClass) => {
  document.body.append(element);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
  element.querySelector(buttonClass).addEventListener('click', onCloseButtonClick);
};

// Сообщение с ошибкой
const showErrorMessage = () => {
  showMessage(messageError, '.error__button');
};

// Сообщение с успехом
const showSuccessMessage = () => {
  showMessage(messageSuccess, '.success__button');
};

export { showErrorMessage, showSuccessMessage };
