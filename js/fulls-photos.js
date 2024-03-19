import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');//+
const bodyContainer = document.querySelector('body');//+
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');//+
const commentContainer = bigPicture.querySelector('.social__comments');// сюда добавляем комментарии+
const commentTemplate = document.querySelector('.social__comment'); //+
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');//+кол-во отображаемых комментариев+
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');//+общее кол-во комментариев+
const commentLoaderButton = bigPicture.querySelector('.social__comments-loader');//+загрузка доп. комментариев+

const COUNT_STEP = 5;
let commentsCountShown = 0;
let comments = [];

// Закрываем большое фото
const closeBigPicture = () => {
  commentsCountShown = 0;
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  bodyContainer.classList.remove('modal-open');
};

const onCloseButtonClick = () => {
  closeBigPicture();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Создаем открытое окно с фото
const renderBigPicture = ({ url, description, likes }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
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
  commentsCountShown += COUNT_STEP;
  if (commentsCountShown >= comments.length) {
    commentsCountShown = comments.length;
    commentLoaderButton.classList.add('hidden');
  } else {
    commentLoaderButton.classList.remove('hidden');
  }
  const commentFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsCountShown; i++) {
    const comment = renderComment(comments[i]);
    commentFragment.append(comment);
  }
  commentContainer.innerHTML = '';
  commentContainer.append(commentFragment);
  commentShownCount.textContent = commentsCountShown;
  commentTotalCount.textContent = comments.length;
};

// // Загрузка комментов по кнопке
const onСommentLoaderButtonClick = () => renderComments();


// Открытие полноразмерного фото по нажатию на миниатюру
const openBigPicture = (dataPicture) => {
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  comments = dataPicture.comments;
  if (comments.length >= 0) {
    renderComments();
  }
  renderBigPicture(dataPicture);
};


// Слушатель события клика на кнопку закрытия фото и загрузки комментов
bigPictureClose.addEventListener('click', onCloseButtonClick);
commentLoaderButton.addEventListener('click', onСommentLoaderButtonClick);


export { openBigPicture };
