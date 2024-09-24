import "../styles/index.css";
import { initialCards } from "./cards";
import { closeModal, openModal } from "./modals";
import { deleteCard, likeCard, addNewCard } from "./cardsChange";

const cardContainer = document.querySelector(".places__list");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profiledescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupCloseButton = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");

const cardForm = document.forms["new-place"];
const profileForm = document.forms["edit-profile"];

const placeName = cardForm["place-name"];
const placeLink = cardForm["link"];

const popupImagePicture = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const nameInput = profileForm.name;
const jobInput = profileForm.description;


const expansion = (card) => {
  popupImagePicture.src = card.link;
  popupImagePicture.alt = card.name;
  popupImageCaption.textContent = card.name;
  openModal(popupImage);
};

initialCards.forEach((card) => {
  cardContainer.append(addNewCard(card, deleteCard, likeCard, expansion));
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: placeName.value,
    link: placeLink.value,
  };
  cardContainer.prepend(
    addNewCard(cardData, deleteCard, likeCard, expansion)
  );
  closeModal(popupTypeNewCard);
  setTimeout(() => {
    cardForm.reset();
  }, 600);
});

profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profiledescription.textContent;
});

popupCloseButton.forEach((element) => {
  const popup = element.closest(".popup");
  element.addEventListener("click", () => closeModal(popup));
});

const handleProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profiledescription.textContent = jobInput.value;
  closeModal(popupTypeEdit);
};

profileForm.addEventListener("submit", handleProfile);
