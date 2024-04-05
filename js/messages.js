import { isEscapeKey } from './util.js';

const messageError = document.querySelector('#error').content.querySelector('.error');
const messageSuccess = document.querySelector('#success').content.querySelector('.success');

// Скрываем сообщение
const hideMessage = () => {
  const exitMessage = document.querySelector('.success') || document.querySelector('.error');
  exitMessage.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.removeEventListener('click', onBodyClick);
};

// Скрытие сообщения по кнопке
const onCloseButtonClick = () => hideMessage();

// Скрытие сообщения по Esc
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

// Показываем сообщение
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
