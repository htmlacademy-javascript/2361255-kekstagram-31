const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const effectsPreview = document.querySelectorAll('.effects__preview');

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];

  if (file && isValidType(file)) {
    preview.src = URL.createObjectURL(file);
    effectsPreview.forEach((miniPreview) => {
      miniPreview.style.backgroundImage = `url('${preview.src}')`;
    });
  }
});
