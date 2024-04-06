import { renderGallery } from './render-gallery.js';
import { debounce } from './util';
// import { renderThumbnails } from './thumbnails.js';

const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length
};

let currentFilter = Filters.DEFAULT;
let pictures = [];

const debounceRender = debounce(renderGallery);

const onFilterChange = (evt) => {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }
  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
};

function applyFilter() {
  let filteredPictures = [];
  if (currentFilter === Filters.DEFAULT) {
    filteredPictures = pictures;
  }
  if (currentFilter === Filters.RANDOM) {
    filteredPictures = pictures.toSorted(SORTFUNC.random).slice(0, 10);
  }
  if (currentFilter === Filters.DISCUSSED) {
    filteredPictures = pictures.toSorted(SORTFUNC.discussed);
  }
  debounceRender(filteredPictures);
}

const configFilter = (picturesData) => {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  pictures = picturesData;
};

export { configFilter };
