import { renderThumbnails } from './thumbnails.js';
import { debounce } from './util';

const MAX_PICTURE_COUNT = 10;
const DEBOUNCE_DELAY = 500;

const filterElement = document.querySelector('.img-filters');
const defaultButton = filterElement.querySelector('#filter-default');
const randomButton = filterElement.querySelector('#filter-random');
const discussedButton = filterElement.querySelector('#filter-discussed');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const Filters = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterHandles = {
  [Filters.DEFAULT]: (data) => data,
  [Filters.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_PICTURE_COUNT, data.length);
    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },
  [Filters.DISCUSSED]: (data) => [...data].sort((a, b) => b.comments.length - a.comments.length),
};

let currentFilter = Filters.DEFAULT;

const reRender = (evt, filter, data) => {
  if (currentFilter !== filter) {
    const container = document.querySelector('.pictures');
    const filteredData = filterHandles[filter](data);
    const picrutes = document.querySelectorAll('.picture');
    picrutes.forEach((item) => item.remove());
    renderThumbnails(filteredData, container);
    currentFilter = filter;
  }
};

const debounceRender = debounce(reRender, DEBOUNCE_DELAY);

const activateFilter = () => {
  const currentActiveElement = filterElement.querySelector('.img-filters__button--active');
  currentActiveElement.classList.remove('img-filters__button--active');
};

const configFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRender(evt, Filters.DEFAULT, data);
  });
  randomButton.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRender(evt, Filters.RANDOM, data);
  });
  discussedButton.addEventListener('click', (evt) => {
    activateFilter();
    evt.target.classList.add('img-filters__button--active');
    debounceRender(evt, Filters.DISCUSSED, data);
  });
};

export { configFilter };
