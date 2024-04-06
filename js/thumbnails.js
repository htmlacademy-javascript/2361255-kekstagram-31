// import { openBigPicture } from './fulls-photos.js';
//
//   containerUsersPictures.addEventListener('click', (evt) => {
//     const picture = evt.target.closest('.picture');

//     // if (picture) {
//     //   evt.preventDefault();
//     //   //в массиве находим фото, id = id, по которому произошел клик
//     //   const dataPicture = usersPictures.find((item) => picture.dataset.id === item.id.toString());

//       openBigPicture(dataPicture);
//     // }
//   });
// // };

// Ищем шаблон
const templateUserPicture = document.querySelector('#picture').content.querySelector('.picture');

//контейнер
const containerUsersPictures = document.querySelector('.pictures');

const renderThumbnails = (usersPictures) => {
  const usersPicturesFragment = document.createDocumentFragment();
  usersPictures.forEach(({ url, description, likes, comments, id }) => {
    const userPicture = templateUserPicture.cloneNode(true);

    userPicture.querySelector('.picture__img').src = url;
    userPicture.querySelector('.picture__img').alt = description;
    userPicture.querySelector('.picture__likes').textContent = likes;
    userPicture.querySelector('.picture__comments').textContent = comments.length;
    userPicture.dataset.thumbnailId = id;

    usersPicturesFragment.appendChild(userPicture);
  });

  containerUsersPictures.appendChild(usersPicturesFragment);
};


export { renderThumbnails, containerUsersPictures };
