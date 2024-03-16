
import { openBigPhoto } from './fulls-photos';
import { arrayPhotos } from './data.js';


// Ищем шаблон
const template = document.querySelector('#picture').content.querySelector('.picture');

// Контейнер, куда складываем фото
const containerUsersPhotos = document.querySelector('.pictures');

// Создаем фрагмент
const photoFragment = document.createDocumentFragment();

// Создаем массив фото
const usersPhotos = arrayPhotos();


usersPhotos.forEach(({ id, url, description, likes, comments }) => {
  const thumbnail = template.cloneNode(true);

  thumbnail.dataset.id = id;
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  photoFragment.appendChild(thumbnail);

  //Открываем большое фото при клике на миниатюру
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    const currentPicture = usersPhotos.find((picture) => evt.currentTarget.dataset.id === picture.id.toString());
    openBigPhoto(currentPicture);
  });
});

containerUsersPhotos.appendChild(photoFragment);

export { containerUsersPhotos, usersPhotos };
