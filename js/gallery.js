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
