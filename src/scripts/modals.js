const handleDocumentKeydown = (event) => {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
};

const handleModalClick = (event) => {
  const isOverlayClick = event.target.classList.contains('popup_is-opened');
  const isCloseButtonClick = event.target.closest('.popup__close');
  
  if (isOverlayClick) {
    closeModal(event.target);
  } else if (isCloseButtonClick) {
    closeModal(event.target.closest('.popup'));
  }
};

const openModal = (element) => {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleDocumentKeydown);
};

const closeModal = (element) => {
  document.removeEventListener('keydown', handleDocumentKeydown);
  element.classList.remove('popup_is-opened');
};

export { openModal, closeModal, handleModalClick };
