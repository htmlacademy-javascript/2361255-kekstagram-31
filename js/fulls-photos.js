import { isEscapeKey } from './util.js';


const bodyContainer = document.querySelector('body');//+
const bigPicture = document.querySelector('.big-picture');//+
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');//+
const commentContainer = bigPicture.querySelector('.social__comments');//+ сюда добавляем комментарии

const commentCount = bigPicture.querySelector('.social__comment-count');//счетчик кооментариев
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');//+кол-во отображаемых комментариев
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');//+общее кол-во комментариев
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');//+загрузка доп. комментариев

const COUNT_STEP = 5;
let commentsCountShow = 0;
let comments = [];

// Закрываем большое фото
const closeBigPicture = () => {
  commentsCountShow = 0;
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.remove('modal-open');
};

// Функция-обработчик для нажатия на кнопку закрытия
const onCloseButtonClick = () => {
  closeBigPicture();
};

// Закрываем по Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}


// Создаем открытое окно с фото
const renderFullPhotos = ({ url, description, likes }) => {
  const fullPhoto = bigPicture.querySelector('.big-picture__img img');
  fullPhoto.src = url;
  fullPhoto.alt = description;
  fullPhoto.querySelector('.social__caption').textContent = description;
  fullPhoto.querySelector('.likes-count').textContent = likes;
};

// Создаем один коммент по образцу
const renderComment = ({ avatar, name, message }) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

// Создаем комментарий
const renderComments = () => {
  commentsCountShow += COUNT_STEP;
  if (commentsCountShow >= comments.length) {
    commentsCountShow = comments.length;
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShow; i++) {
    const comment = renderComment(comments[i]);
    commentFragment.append(comment);
  }
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
  commentShownCount.textContent = commentsQuantity;
  commentTotalCount.textContent = comments.length;
};

// // Загрузка комментов по кнопке
const onСommentLoaderButtonClick = () => renderComments();


// Открытие полноразмерного фото по нажатию на миниатюру
const openBigPicture = (pictureData) => {
  commentsCountShow = 0;
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  // Добавляем слушатель на Esc
  document.addEventListener('keydown', onDocumentKeydown);
  // Добавляем комментарии
  comments = pictureData.comments;
  if (comments.length > 0) {
    renderComments();
  } else {
    commentContainer.innerHTML = '';
    commentLoaderButton.classList.add('hidden');
    commentCount.innerHTML = 'К этой фотографии нет комментариев.';
  }
  renderFullPhotos(pictureData);
};

// Слушатель события клика на кнопку закрытия фото и загрузки комментов
bigPictureClose.addEventListener('click', onCloseButtonClick);
commentLoaderButton.addEventListener('click', onСommentLoaderButtonClick);


export { openBigPicture };
