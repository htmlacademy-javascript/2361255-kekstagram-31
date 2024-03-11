
import { arrayPhotos } from "/js/data.js";

// Ищем шаблон
const template = document.querySelector('#picture').content.querySelector('.picture');

// Контейнер, куда складываем фото
const containerUsersPhotos = document.querySelector('.pictures');

// Создаем массив фото
const usersPhotos = arrayPhotos();

// Создаем фрагмент
const photoFragment = document.createDocumentFragment();

usersPhotos.forEach(({ url, description, likes, comments }) => {
  const thumbnail = template.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;

  photoFragment.appendChild(thumbnail);
});

containerUsersPhotos.appendChild(photoFragment);

