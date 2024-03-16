import { isEscapeKey } from './util.js';

const bigPhoto = document.querySelector('.big-picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const body = document.body;


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

//создаем шаблон для комментария
const createCommentTemplate = (({ avatar, name, message }) => {
  const comment = document.createElement('li');

  comment.innerHTML = (
    `<li class="social__comment">
      <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
      <p class="social__text">${message}</p>
    </li>`
  );

  return comment;
});

const createCommentsFragment = (comments) => {
  //создаем фрагмент
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => commentsFragment.appendChild(createCommentTemplate(comment)));
  // Возвращаем комментарии
  return commentsFragment;
};

// Открываем большое фото
function openBigPhoto(currentPicture) {
  // //  Удаляем класс для видимости
  bigPhoto.classList.remove('hidden');
  // Адрес изображения url  = src изображения внутри блока.big - picture__img.
  bigPhoto.querySelector('.big-picture__img img').src = currentPicture.url;
  //  Описание фотографии description вставьте строкой в блок .social__caption.
  bigPhoto.querySelector('.social__caption').textContent = currentPicture.description;
  //  Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.
  bigPhoto.querySelector('.social__comment-shown-count').textContent = currentPicture.comments.length;
  //  Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.
  bigPhoto.querySelector('.social__comment-total-count').textContent = currentPicture.comments.length;
  bigPhoto.querySelector('.social__comments').innerHTML = '';
  bigPhoto.querySelector('.social__comments').appendChild(createCommentsFragment(currentPicture.comments));// * Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments.
  document.addEventListener('keydown', onDocumentKeydown);
  // Прячем  счётчик комментариев.social__comment - count
  const commentsCount = bigPhoto.querySelector('.social__comment-count');
  commentsCount.classList.add('hidden');
  // Прячем блок загрузки новых комментариев
  const commentsLoader = bigPhoto.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
}

// Закрываем окно
function closeBigPhoto() {
  bigPhoto.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  body.classList.remove('modal-open');
}

closeButton.addEventListener('click', () => {
  closeBigPhoto();
});


export { openBigPhoto };
