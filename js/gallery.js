import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './fulls-photos.js';

// Ищет родителя для будущих фотографий в разметке
const photosContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  photosContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);
    openBigPicture(pictureData);
  });

  renderThumbnails(pictures, photosContainer);
};

export { renderGallery };

// // Создаем один коммент по образцу
// const renderComment = ({ avatar, name, message }) => {
//   const comment = commentTemplate.cloneNode(true);
//   comment.querySelector('.social__picture').src = avatar;
//   comment.querySelector('.social__picture').alt = name;
//   comment.querySelector('.social__text').textContent = message;

//   return comment;
// };

// // Очищаем список и создаем комменты из предлагаемого массива
// const renderComments = (commentsArray) => {
//   commentContainer.innerHTML = '';
//   const commentFragment = document.createDocumentFragment();
//   commentsArray.forEach((commentItem) => {
//     const comment = renderComment(commentItem);
//     commentFragment.append(comment);
//   });
//   return commentFragment;
// };

// export { renderComments };

// // Показывает фотографии при нажатии на миниатюру с нужным id
// const renderGallery = (photos) => {
//   photosContainer.addEventListener('click', (evt) => {
//     const photo = evt.target.closest('[data-photo-id]');
//     if (!photo) {
//       return;
//     }
//     evt.preventDefault();
//     const photoId = +photo.dataset.photoId;
//     const photoData = photos.find(({ id }) => id === photoId);
//     openBigPicture(photoData);
//   });
//   renderPhotos(photos, photosContainer);
// };

// export { renderGallery };







// //создаем шаблон для комментария
// const createCommentTemplate = (({ avatar, name, message }) => {
//   const comment = document.createElement('li');

//   comment.innerHTML = (
//     `<li class="social__comment">
//       <img
//         class="social__picture"
//         src="${avatar}"
//         alt="${name}"
//         width="35" height="35">
//       <p class="social__text">${message}</p>
//     </li>`
//   );

//   return comment;
// });


// const createCommentsFragment = (comments) => {
//   //создаем фрагмент
//   const commentsFragment = document.createDocumentFragment();

//   comments.forEach((comment) => commentsFragment.appendChild(createCommentTemplate(comment)));
//   // Возвращаем комментарии
//   return commentsFragment;
// };


// export { createCommentsFragment };
