import Card from './Card.js'
import FormValidator from './FormValidator.js'
import * as utils from './Utils.js'

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
}
// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form-profile');

// Находим форму в DOM
const formElementAddCard = document.querySelector('.popup__form-card');


const profileFormValidator = new FormValidator(config, formElementProfile)
const addCardFormValidator = new FormValidator(config, formElementAddCard)

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


const buttonEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
// данные, которые нужно взять из верстки
const titlePopup = document.querySelector('.profile__title');
const subtitlePopup = document.querySelector('.profile__subtitle');


// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_job');


const buttonPlus = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-card');

// Находим поля формы в DOM
const inputCardName = document.querySelector('.popup__input_field_card-name');
const inputCardLink = document.querySelector('.popup__input_field_card-link');

// ul, в который надо добавить карточки
const elementsList = document.querySelector('.elements__list');

initialCards.forEach(item => {
  addCard(item)
});


function addCard(item) {
  const card = new Card(item, '.card-template_type_default');
  // console.log('card created')
  return elementsList.prepend(card.generateCard());
}

// открытие попапа
function openPopupProfile() {
  nameInput.value = titlePopup.textContent;
  jobInput.value = subtitlePopup.textContent;

  // добавление модификатора для открытия попапа
  utils.openPopup(popupProfile);
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  titlePopup.textContent = nameInput.value;
  subtitlePopup.textContent = jobInput.value;
  utils.closePopup(popupProfile);
}

buttonEdit.addEventListener('click', openPopupProfile);
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

// закрытие попапа
function closePopupAddCard() {
  inputCardName.value = '';
  inputCardLink.value = '';
  utils.closePopup(popupAddCard);

}

function formSubmitHandlerAddCard (evt) {
  evt.preventDefault();
  const dataCard = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  addCard(dataCard)
  closePopupAddCard();
}

buttonPlus.addEventListener('click', function(){utils.openPopup(popupAddCard)});
formElementAddCard.addEventListener('submit', formSubmitHandlerAddCard);


// вызов функции закрытия на клик
utils.clickHandler();


