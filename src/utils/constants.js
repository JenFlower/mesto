export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}
// Находим форму в DOM
export const formElementProfile = document.querySelector('.popup__form-profile');

// Находим форму в DOM
export const formElementAddCard = document.querySelector('.popup__form-card');

export const buttonEdit = document.querySelector('.profile__edit-button');
export const popupProfile = document.querySelector('.popup-profile');
// данные, которые нужно взять из верстки
export const titlePopup = document.querySelector('.profile__title');
export const subtitlePopup = document.querySelector('.profile__subtitle');


// Находим поля формы в DOM
export const nameInput = document.querySelector('.popup__input_field_name');
export const jobInput = document.querySelector('.popup__input_field_job');


export const buttonPlus = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup-card');

// Находим поля формы в DOM
export const inputCardName = document.querySelector('.popup__input_field_card-name');
export const inputCardLink = document.querySelector('.popup__input_field_card-link');

export const previewImage = document.querySelector('.preview__image');
export const previewText = document.querySelector('.preview__text');
export const previewPopup = document.querySelector('.popup-preview');

// ul, в который надо добавить карточки
export const elementsList = document.querySelector('.elements__list');

