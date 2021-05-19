import './index.css'
import initialCards from '../components/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
// import * as utils from '../../scripts/Utils.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'


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

const previewImage = document.querySelector('.preview__image');
const previewText = document.querySelector('.preview__text');
const previewPopup = document.querySelector('.popup-preview');

// ul, в который надо добавить карточки
const elementsList = document.querySelector('.elements__list');



///////////////////////////////////////////////////////////////////


const popupWithImage = new PopupWithImage(previewPopup);
popupWithImage.setEventListeners();

function openPreview(link, name) {
  popupWithImage.open(link, name);
}

const section = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '.card-template_type_default', openPreview);
  section.addItem(card.generateCard())
 }},
 elementsList)
 section.render();

function dataCard() {
  return{
    name: inputCardName.value,
    link: inputCardLink.value
  }
}

function dataProfile() {
  return {
    name: titlePopup.textContent,
    job: subtitlePopup.textContent
  }
}

function dataProfileValues() {
  return {
    name: nameInput.value,
    job: jobInput.value
  }
}

const popupWithFormProfile = new PopupWithForm(popupProfile, ()=>{formSubmitHandlerProfile(event, dataProfileValues())});
popupWithFormProfile.setEventListeners();


const popupWithFormAddCard = new PopupWithForm(popupAddCard, ()=>{formSubmitHandlerAddCard(event, dataCard())});
popupWithFormAddCard.setEventListeners();


const userInfo = new UserInfo(dataProfile())

function openPopupProfile() {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
  popupWithFormProfile.open();
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile(evt, {name, job}) {
  evt.preventDefault();
  titlePopup.textContent = userInfo.setUserInfo(name, job).name;
  subtitlePopup.textContent = userInfo.setUserInfo(name, job).job;
}

buttonEdit.addEventListener('click', openPopupProfile);

function formSubmitHandlerAddCard(evt, {name, link}) {
  evt.preventDefault();
  const sectionCard = new Section({items: [{name, link}], renderer: (item) => {
    const card = new Card(item, '.card-template_type_default', openPreview);
    sectionCard.addItem(card.generateCard())
  }}, elementsList);
  sectionCard.render();
}

buttonPlus.addEventListener('click', function(){
  popupWithFormAddCard.open();
});
