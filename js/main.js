import { createPosts } from './thumbnails.js';
import './upload-form.js';
// import './util.js';
import './scale.js';
import './effects.js';
import { getData } from './api.js';
import './messages.js';
import { showErrorMessage } from './util.js';
// import './data.js';
// import './thumbnails.js';
import './fulls-photos.js';

const bootstrap = async () => {
  try {
    const photos = await getData();
    createPosts(photos);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();


