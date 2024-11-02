export const renderLoading = ({ buttonElement, isLoading }) => {
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};