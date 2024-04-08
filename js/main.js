import './upload-form.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';
import { configFilter } from './filters.js';
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

