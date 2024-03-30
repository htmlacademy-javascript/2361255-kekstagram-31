import { arrayPhotos } from './data.js';
import { openBigPicture } from './fulls-photos.js';

// Ищем шаблон
const templateUserPicture = document.querySelector('#picture').content.querySelector('.picture');

//контейнер
const containerUsersPictures = document.querySelector('.pictures');

const usersPicturesFragment = document.createDocumentFragment();

const usersPictures = arrayPhotos();

usersPictures.forEach(({ url, description, likes, comments, id }) => {
  //клон шаблона
  const userPicture = templateUserPicture.cloneNode(true);

  //вставляем данные в шаблон
  userPicture.querySelector('.picture__img').src = url;
  userPicture.querySelector('.picture__img').alt = description;
  userPicture.querySelector('.picture__likes').textContent = likes;
  userPicture.querySelector('.picture__comments').textContent = comments.length;
  userPicture.dataset.id = id;

  usersPicturesFragment.appendChild(userPicture);
});

containerUsersPictures.appendChild(usersPicturesFragment);


containerUsersPictures.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if (picture) {
    evt.preventDefault();
    //в массиве находим фото, id = id, по которому произошел клик
    const dataPicture = usersPictures.find((item) => picture.dataset.id === item.id.toString());

    openBigPicture(dataPicture);
  }
});

