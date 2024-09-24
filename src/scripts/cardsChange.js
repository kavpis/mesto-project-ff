export const likeCard = (cardlikeButton) => {
  cardlikeButton.classList.toggle("card__like-button_is-active");
};

export const deleteCard = (event) => {
  const card = event.target.closest("li");
  card.remove();
};

export const addNewCard = (card, deleteCard, likeCard, zoomImage) => {
  const cardElement = cardTemplate.cloneNode(true).content;
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__description");
  const cardTitle = cardDescription.querySelector(".card__title");
  const carddeleteButton = cardElement.querySelector(".card__delete-button");
  const cardlikeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  carddeleteButton.addEventListener("click", (event) => deleteCard(event));
  cardlikeButton.addEventListener("click", () => likeCard(cardlikeButton));
  cardImage.addEventListener("click", () => zoomImage(card));

  return cardElement;
};

const cardTemplate = document.querySelector("#card-template");
 
