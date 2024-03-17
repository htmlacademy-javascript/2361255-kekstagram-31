
// Ищем шаблон
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Создаем 1 фото
const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = photoTemplate.cloneNode(true);
  const pictureImg = thumbnail.querySelector('.picture__img');
  pictureImg.querySelector('.picture__img').src = url;
  pictureImg.querySelector('.picture__img').alt = description;
  pictureImg.querySelector('.picture__likes').textContent = likes;
  pictureImg.querySelector('.picture__comments').textContent = comments.length;
  pictureImg.dataset.thumbnailId = id;
  return thumbnail;
};

// Добавляем фото во фрагмент
const renderThumbnails = (pictures, photosContainer) => {
  const photoFragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    photoFragment.append(thumbnail);
  });

  photosContainer.append(photoFragment);
};

export { renderThumbnails };

// // Контейнер, куда складываем фото
// const containerUsersPhotos = document.querySelector('.pictures');

// // Создаем фрагмент
// const photoFragment = document.createDocumentFragment();

// // Создаем массив фото
// const usersPhotos = arrayPhotos();

// usersPhotos.forEach(({ id, url, description, likes, comments }) => {
//   const thumbnail = template.cloneNode(true);

//   thumbnail.dataset.id = id;
//   thumbnail.querySelector('.picture__img').src = url;
//   thumbnail.querySelector('.picture__img').alt = description;
//   thumbnail.querySelector('.picture__likes').textContent = likes;
//   thumbnail.querySelector('.picture__comments').textContent = comments.length;

//   photoFragment.appendChild(thumbnail);

//   //Открываем большое фото при клике на миниатюру
//   thumbnail.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     const currentPicture = usersPhotos.find((picture) => evt.currentTarget.dataset.id === picture.id.toString());
//     openBigPhoto(currentPicture);
//   });
// });

// containerUsersPhotos.appendChild(photoFragment);


