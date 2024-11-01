const apiBaseUrl = 'https://nomoreparties.co/v1/wff-cohort-25';
const headers = {
  authorization: '7d9bcc84-48cb-4d2a-a1c9-d8f292e45e96',
  'Content-Type': 'application/json',
};

// Функция для обработки ответа от сервера
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных пользователя
const getUserInfo = () =>
  fetch(`${apiBaseUrl}/users/me`, {
    headers,
  }).then(handleResponse);

// Обновление данных пользователя
const changeUserInfo = ({ name, description }) =>
  fetch(`${apiBaseUrl}/users/me`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleResponse);

// Обновление аватара пользователя
const changeUserAvatar = (avatar) =>
  fetch(`${apiBaseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then(handleResponse);

// Получение списка карточек
const getInitialCards = () =>
  fetch(`${apiBaseUrl}/cards`, {
    headers,
  }).then(handleResponse);

// Добавление новой карточки
const createCard = ({ name, link }) =>
  fetch(`${apiBaseUrl}/cards`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(handleResponse);

// Удаление карточки по ID
const deleteCard = (cardId) =>
  fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then(handleResponse);

// Добавление лайка карточке
const likeCard = (cardId) =>
  fetch(`${apiBaseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers,
  }).then(handleResponse);

// Удаление лайка с карточки
const remove__Like = (cardId) =>
  fetch(`${apiBaseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers,
  }).then(handleResponse);

// Проверка, является ли URL изображением
const validate__ImageUrl = (url) => /\.(jpeg|jpg|gif|png)$/i.test(url);

export {
  getUserInfo,
  changeUserInfo,
  changeUserAvatar,
  getInitialCards,
  createCard,
  deleteCard,
  likeCard,
  remove__Like,
  validate__ImageUrl,
};
