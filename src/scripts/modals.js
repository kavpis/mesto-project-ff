export const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
};

export const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_is-opened");
    closeModal(openPopup);
  }
};

const handleClickOutside = (evt) => {
  if (evt.target.isEqualNode(evt.target.closest(".popup__close"))) return;
  if (!evt.target.contains(evt.target.closest(".popup"))) return;
  const openPopup = document.querySelector(".popup_is-opened");
  closeModal(openPopup);
};
