// const getRandomInteger = (min, max) => {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomIdGenerator = (min, max) => {
//   const ids = [];
//   return function () {
//     let id = getRandomInteger(min, max);
//     while (ids.includes(id)) {
//       id = getRandomInteger(min, max);
//     }
//     ids.push(id);
//     return id;
//   };
// };

const REMOVE_MESSAGE_TIMEOUT = 5000;
const errorMessageTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

// const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

export { showErrorMessage, isEscapeKey };
