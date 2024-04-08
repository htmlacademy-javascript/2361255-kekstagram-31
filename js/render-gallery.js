import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './fulls-photos.js';

const fotoContainer = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  fotoContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const dataPicture = pictures.find(({ id }) => id === thumbnailId);
    openBigPicture(dataPicture);
  });

  renderThumbnails(pictures, fotoContainer);
};

export { renderGallery, };

