import { isEscapeKey } from './util.js';

const descriptionDefault = {
  MAX_LENGTH_COMMENT: 140,
  ERROR_COMMENT: 'Длина комментария больше 140 символов',
};

const hashtagError = {
  MAX_COUNT_HASHTAG: 5,
  MAX_SYMBOLS: 20,
  HASHTAG_SHORT_ERROR: 'Хэштег должен быть длиннее #',
  HASHTAG_START_ERROR: 'Хэштег должен начинаться с #',
  HASHTAG_COUNT_ERROR: 'Использовано максимальное количество хэштегов',
  HASHTAG_SYMBOLS_ERROR: 'Недопустимая длина хэштега',
  HASHTAG_REGEX_ERROR: 'Использованы недопустимые спецсимволы',
  HASHTAG_DUBLICATE_ERROR: 'Хэштеги повторяются'
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorResetButton = uploadForm.querySelector('.img-upload__cancel');
const uploadFile = uploadForm.querySelector('.img-upload__input');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
let hashtagsError = '';
const valideSymbols = /^#[a-zа-яё0-9]{1,19}$/;
const bodyContainer = document.querySelector('body');

//Открывает окно редактора картинки
const openFormUpload = () => {
  uploadOverlay.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onFormEscKeydown);
};

//Закрываем окно редактора картинки
const closeFormUpload = () => {
  uploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  document.removeEventListener('keydown', onFormEscKeydown);
  uploadFileControl.value = '';
};

const onPhotoEditorResetButtonClick = () => closeFormUpload();

// Если фокус находится в поле ввода хэш-тега, отменяет закрытие по Esc.
const isTextFieldFocused = () =>
  document.activeElement === hashtagInput ||
  document.activeElement === commentInput;

// Функция, закрывающая окно при нажатии Esc
function onFormEscKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeFormUpload();
  }
}

const onFileInputChange = (evt) => {
  openFormUpload(evt);
};

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
  errorTextTag: 'div',
});

const isUniqueArray = (array) => new Set(array).size === array.length;

const validateHashtags = (value) => {
  const tags = value.trim().toLowerCase().split(/\s*(?=#)/);

  if (value === '') {
    return true;
  }

  if (tags.length > hashtagError.MAX_COUNT_HASHTAG) {
    hashtagsError = hashtagError.HASHTAG_COUNT_ERROR;
    return false;
  }

  if (!isUniqueArray(tags)) {
    hashtagsError = hashtagError.HASHTAG_DUBLICATE_ERROR;
    return false;
  }

  return tags.every((tag) => {
    if (tag[0] !== '#') {
      hashtagsError = hashtagError.HASHTAG_START_ERROR;
      return false;
    }

    if (tag.length > hashtagError.MAX_SYMBOLS) {
      hashtagsError = hashtagError.HASHTAG_SYMBOLS_ERROR;
      return false;
    }

    if (tag === '#') {
      hashtagsError = hashtagError.HASHTAG_SHORT_ERROR;
      return false;
    }

    if (!valideSymbols.test(tag)) {
      hashtagsError = hashtagError.HASHTAG_REGEX_ERROR;
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

//отправка фото на сервер при успешной валидации
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    uploadForm.submit();
  }
});

//Закрытие по кнопке
photoEditorResetButton.addEventListener('click', onPhotoEditorResetButtonClick);
//Слушатель на загрузку фото в форму
uploadFile.addEventListener('change', onFileInputChange);

