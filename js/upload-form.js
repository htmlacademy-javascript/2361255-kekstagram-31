import { isEscapeKey } from './util.js';
import { initEffect, resetEffect } from './effects.js';
import { resetScale } from './scale.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';
import { sendData } from './api.js';

const descriptionDefault = {
  MAX_LENGTH_COMMENT: 140,
  ERROR_COMMENT: 'Длина комментария больше 140 символов',
};

const hashtagError = {
  MAX_COUNT_HASHTAG: 5,
  MAX_SYMBOLS: 20,
};


const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
// const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorResetButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFile = uploadForm.querySelector('.img-upload__input');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
let hashtagsError = '';
const valideSymbols = /^#[a-zа-яё0-9]{1,19}$/;
const bodyContainer = document.querySelector('body');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

//Закрываем окно
const closeForm = () => {
  resetEffect();
  pristine.reset();
  uploadForm.reset();
  resetScale();
};

//Закрываем окно редактора картинки
const onCloseFormUpload = () => {
  uploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
};

//Открываем окно редактора картинки
const openFormUpload = () => {
  uploadOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

//Нажатие на кнопку закрытия
const onPhotoEditorResetButtonClick = () => closeForm();

// Если фокус находится в поле ввода хэш-тега, отменяет закрытие по Esc.
const isTextFieldFocused = () =>
  document.activeElement === hashtagInput || document.activeElement === commentInput;

// Функция, закрывающая окно при нажатии Esc
function onFormEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const onFileInputChange = (evt) => {
  openFormUpload(evt);
};

const hashtagsArray = (array) => new Set(array).size === array.length;

const validateHashtags = (value) => {
  const tags = value.trim().toLowerCase().split(/\s*(?=#)/);

  if (value === '') {
    return true;
  }

  if (tags.length > hashtagError.MAX_COUNT_HASHTAG) {
    hashtagsError = 'Использовано максимальное количество хэштегов';
    return false;
  }

  if (!hashtagsArray(tags)) {
    hashtagsError = 'Хэштеги повторяются';
    return false;
  }

  return tags.every((tag) => {
    if (tag[0] !== '#') {
      hashtagsError = 'Хэштег должен начинаться с #';
      return false;
    }

    if (tag.length > hashtagError.MAX_SYMBOLS) {
      hashtagsError = 'Недопустимая длина хэштега';
      return false;
    }

    if (tag === '#') {
      hashtagsError = 'Хэштег должен быть длиннее #';
      return false;
    }

    if (!valideSymbols.test(tag)) {
      hashtagsError = 'Использованы недопустимые спецсимволы';
      return false;
    }

    return true;
  });
};

pristine.addValidator(hashtagInput, validateHashtags, () => hashtagsError);
pristine.addValidator(
  commentInput,
  (value) => value.length <= descriptionDefault.MAX_LENGTH_COMMENT,
  descriptionDefault.ERROR_COMMENT
);

const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};
//отправка фото на сервер
const onFormSubmit = async (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }

  try {
    toggleSubmitButton(true);
    await sendData(new FormData(uploadForm));
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    toggleSubmitButton(false);
  }
};

uploadForm.addEventListener('submit', onFormSubmit);
//Закрытие по кнопке
photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
//Слушатель на загрузку фото
uploadFile.addEventListener('change', onFileInputChange);
uploadForm.addEventListener('reset', onCloseFormUpload);

initEffect();


