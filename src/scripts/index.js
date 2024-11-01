import '../styles/index.css';
import {
  closeModal,
  openModal,
  handleModalClick,
} from './modals.js';
import { createCard as DOMCreateCard } from './cardsChange.js';
import {
  getInitialCards as APIGetInitialCards,
  getUserInfo as APIGetUserInfo,
  changeUserAvatar as APIchangeUserAvatar,
  changeUserInfo as APIchangeUserInfo,
  likeCard as APILikeCard,
  remove__Like as APIRemove__Like,
  createCard as APICreateCard,
  deleteCard as APIDeleteCard,
} from './api.js';
import { resetValidation, enableValidation } from './validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');
const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardForm = document.forms['new-place'];
const cardFormSubmitButton = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardButtonOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitButton = profileImageForm.querySelector('.popup__button');
const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitButton = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileButtonOpen = document.querySelector('.profile__edit-button');

const popupConfirm = document.querySelector('.popup_type_confirm');
const popupConfirmButton = popupConfirm.querySelector('.popup__button_confirm');

const setProfile = ({ name, description, avatar }) => {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

const renderLoading = ({ buttonElement, isLoading }) => {
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

const handleCardLike = ({ cardId, buttonElement, counterElement }) => {
  buttonElement.disabled = true;

  if (buttonElement.classList.contains('card__like-button_is-active')) {
    APIRemove__Like(cardId)
      .then(({ likes }) => {
        buttonElement.classList.remove('card__like-button_is-active');
        counterElement.classList.toggle('card__like-counter_is-active', likes.length > 0);
        counterElement.textContent = likes.length || '';
      })
      .catch(console.error)
      .finally(() => buttonElement.disabled = false);
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        buttonElement.classList.add('card__like-button_is-active');
        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch(console.error)
      .finally(() => buttonElement.disabled = false);
  }
};

const handleCardDelete = ({ cardId, buttonElement }) => {
  openModal(popupConfirm);
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;
    APIDeleteCard(cardId)
      .then(() => {
        buttonElement.closest('.card').remove();
        closeModal(popupConfirm);
      })
      .catch(() => {
        buttonElement.disabled = false;
        console.error(error);
      });
  };
};

const handleCardFormSubmit = (event) => {
  event.preventDefault();
  renderLoading({ buttonElement: cardFormSubmitButton, isLoading: true });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
      cardForm.reset();
      closeModal(popupCard);
    })
    .catch(console.error)
    .finally(() => renderLoading({ buttonElement: cardFormSubmitButton, isLoading: false }));
};

const handleProfileFormSubmit = (event) => {
  event.preventDefault();
  renderLoading({ buttonElement: profileFormSubmitButton, isLoading: true });

  APIchangeUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({ name, description: about, avatar });
      closeModal(popupProfile);
    })
    .catch(console.error)
    .finally(() => renderLoading({ buttonElement: profileFormSubmitButton, isLoading: false }));
};

const handleProfileImageFormSubmit = (event) => {
  event.preventDefault();
  renderLoading({ buttonElement: profileImageFormSubmitButton, isLoading: true });

  APIchangeUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({ name, description: about, avatar });
      closeModal(popupProfileImage);
    })
    .catch(console.error)
    .finally(() => renderLoading({ buttonElement: profileImageFormSubmitButton, isLoading: false }));
};

const handlePopupProfileClick = () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  resetValidation(profileForm, validationConfig);
  openModal(popupProfile);
};

const handlePopupCardClick = () => {
  cardForm.reset();
  resetValidation(cardForm, validationConfig);
  openModal(popupCard);
};

const handleCardImageClick = ({ cardName, cardLink }) => {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;
  openModal(popupImage);
};

const handleProfileImageClick = () => {
  profileImageForm.reset();
  resetValidation(profileImageForm, validationConfig);
  openModal(popupProfileImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);

popupImage.addEventListener('click', handleModalClick);
popupProfileImage.addEventListener('click', handleModalClick);
profileImage.addEventListener('click', handleProfileImageClick);
popupCard.addEventListener('click', handleModalClick);
popupCardButtonOpen.addEventListener('click', handlePopupCardClick);
popupProfile.addEventListener('click', handleModalClick);
popupProfileButtonOpen.addEventListener('click', handlePopupProfileClick);
popupConfirm.addEventListener('click', handleModalClick);

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({ name, description: about, avatar });
    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          template: cardTemplate,
          data: cardData,
          onDelete: handleCardDelete,
          onLike: handleCardLike,
          onImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch(console.error);
