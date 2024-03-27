const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const imgUpload = document.querySelector('.img-upload');
const smallerButton = imgUpload.querySelector('.scale__control--smaller');
const biggerButton = imgUpload.querySelector('.scale__control--bigger');
const scaleControlInput = imgUpload.querySelector('.scale__control--value');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  imgUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlInput.value = `${value}%`;
};

const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleControlInput.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};

const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleControlInput.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};

// Сброс масштабирования до дефолта
const resetScale = () => scaleImage(DEFAULT_SCALE);

// Cушатель событий на кнопки
smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
