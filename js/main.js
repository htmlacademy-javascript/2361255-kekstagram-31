import './upload-form.js';
// import './render-gallery.js';
// import './util.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import './messages.js';
import { showErrorMessage } from './util.js';
// import './data.js';
// import './thumbnails.js';
import './fulls-photos.js';
import './filters.js';
import { configFilter } from './filters.js';
// import { renderThumbnails } from './thumbnails.js';
import { renderGallery } from './render-gallery.js';
import './upload-pictutre.js';

const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
    configFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();

