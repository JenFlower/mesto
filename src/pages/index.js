import './index.css'
import * as constants from '../utils/constants.js'
import initialCards from '../utils/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'

const profileFormValidator = new FormValidator(constants.config, constants.formElementProfile)
const addCardFormValidator = new FormValidator(constants.config, constants.formElementAddCard)
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function createCard(item) {
  return new Card(item, '.card-template_type_default', openPreview).generateCard();
}

const popupWithImage = new PopupWithImage('.popup-preview');
popupWithImage.setEventListeners();

function openPreview(link, name) {
  popupWithImage.open(link, name);
}

const section = new Section({items: initialCards, renderer: (item) => {
  section.addItem(createCard(item))
 }},
 '.elements__list')
 section.render();

const popupWithFormProfile = new PopupWithForm('.popup-profile', (inputsData)=>{
  formSubmitHandlerProfile(inputsData);
  console.log("inputsData " + inputsData)
});
popupWithFormProfile.setEventListeners();


const popupWithFormAddCard = new PopupWithForm('.popup-card', (inputsData)=>{
  formSubmitHandlerAddCard(inputsData)

});
popupWithFormAddCard.setEventListeners();

const userInfo = new UserInfo({nameSelector: '.profile__title', jobSelector: '.profile__subtitle'})
// console.log(userInfo)

function openPopupProfile() {
  constants.nameInput.value = userInfo.getUserInfo().name;
  constants.jobInput.value = userInfo.getUserInfo().job;
  popupWithFormProfile.open();
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile({inputName, inputJob}) {
  userInfo.setUserInfo(inputName, inputJob)
  console.log(inputName, inputJob)
}

constants.buttonEdit.addEventListener('click', openPopupProfile);

function formSubmitHandlerAddCard({inputCardName, inputCardLink}) {
  section.addItem(createCard({name: inputCardName, link: inputCardLink}))
  console.log("formSubmitHandlerAddCard: ", inputCardLink)
}

constants.buttonPlus.addEventListener('click', function(){
  popupWithFormAddCard.open();
});
