import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './fulls-photos.js';

const container = document.querySelector('.pictures');

const clearGallery = () => {
  container.querySelectorAll('a.picture').forEach((item) => item.remove());
};

const renderGallery = (pictures) => {
  clearGallery();
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const dataPicture = pictures.find(({ id }) => id === thumbnailId);
    openBigPicture(dataPicture);
  });

  renderThumbnails(pictures, container);
};

export { renderGallery };
