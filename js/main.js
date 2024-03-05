
const NAMES = [
  'Ваня',
  'Вася',
  'Петя',
  'Маша',
  'Витя',
  'Саша',
  'Женя',
  'Юля',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Вся красота мира в одной картинке»',
  'Моменты, которые запечатлены навсегда',
  'Счастье в каждом кадре',
  'Когда слова не нужны, достаточно фотографии',
  'История, рассказанная через объектив',
  'Остановить время в одном кадре',
  'Фотография — это способ улыбнуться в будущем',
  'Сегодня — самый лучший день',
  'Я не доверяю словам. Я доверяю фотографиям',
  'Фотографии — это свидетельство о том, что мы жили',
  'Момент, когда небо и земля сливаются воедино',
  'В объектив всегда видна правда — это как детектор лжи',
  'Сделано объективом и любовью',
];

function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomIdGenerator = (min, max) => {
  const ids = [];
  return function () {
    let id = getRandomInteger(min, max);
    while (ids.includes(id)) {
      id = getRandomInteger(min, max);
    }
    ids.push(id);
    return id;
  };
};

const getIdPhoto = getRandomIdGenerator(1, 25);
const getIdComments = getRandomIdGenerator(1, 500);

const photoArrayCount = 25;

const getComment = () => {
  const idComments = getIdComments();
  return {
    id: idComments,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  };
};

function getPhoto() {
  const idPhoto = getIdPhoto();

  return {
    id: idPhoto,
    url: `photos/${idPhoto}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 20) }, getComment)
  };
}

const arrayPhotos = () => Array.from({ length: photoArrayCount }, getPhoto);

arrayPhotos();
