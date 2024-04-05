const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  [Method.GET]: 'Не удалось загрузить данные. Попробуйте еще раз.',
  [Method.POST]: 'Не удалось отправить данный формы',
};

const load = async (url, method = Method.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText[method]);
  }

  return response.json();
};

const getData = async () => load(BASE_URL + Route.GET_DATA);

const sendData = async (pictureData) => load(BASE_URL + Route.SEND_DATA, Method.POST, pictureData);

export { sendData, getData };

