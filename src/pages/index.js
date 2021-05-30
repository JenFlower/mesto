import './index.css'
import * as constants from '../utils/constants.js'
import initialCards from '../utils/initial-cards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

let userId; // для id юзера


const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "fa7815c6-7fbc-421b-b603-b88a64640cf8",
  groupId: "cohort-24"
})

let section = '';
// let countCard = document.querySelectorAll('.card__like-count')
// получение всех карточек с сервера
api.getCards()
  .then(res => {
    section = new Section({items: res, renderer: (item) => {
      section.addItem(createCard(item))
      item.likes.forEach(like => {
        if(like._id === userId) {
          document.querySelector('.card__like-button').classList.toggle('card__like-button_active')
        }
      })
      }},
      '.elements__list')
      section.render();
  })

const profileFormValidator = new FormValidator(constants.config, constants.formElementProfile)
const addCardFormValidator = new FormValidator(constants.config, constants.formElementAddCard)
const logoFormValidator = new FormValidator(constants.config, constants.formElementEditLogo)

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
logoFormValidator.enableValidation();

function createCard(item) {
  return new Card(item, '.card-template_type_default', openPreview, userId).generateCard();
}

const popupWithImage = new PopupWithImage('.popup-preview');
popupWithImage.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup-profile', (inputsData)=>{
  formSubmitHandlerProfile(inputsData);
});
popupWithFormProfile.setEventListeners();

const popupWithFormLogo = new PopupWithForm('.popup-logo', (inputsData)=>{
  formSubmitHandlerUpdateAvatar(inputsData.inputAvatar);
});
popupWithFormLogo.setEventListeners();

const popupWithFormAddCard = new PopupWithForm('.popup-card', (inputsData)=>{
  formSubmitHandlerAddCard(inputsData)

});
popupWithFormAddCard.setEventListeners();

function openPreview(link, name) {
  popupWithImage.open(link, name);
}


 const userInfo = new UserInfo({nameSelector: '.profile__title', jobSelector: '.profile__subtitle', avatar: '.profile__logo'})


const apiUser = new Api({
  address: "https://nomoreparties.co",
  token: "fa7815c6-7fbc-421b-b603-b88a64640cf8",
  groupId: "cohort-24"
})

function renderUserData() {
  apiUser.getUserData()
  .then(res => {
    userId = res._id
    userInfo.setUserData(res.name, res.about, res.avatar)
  })
}

renderUserData()

function renderLoading(isLoading) {
  if(isLoading) {
    document.querySelector('.popup__submit-button').textContent = 'Сохранение...'
  }
  else {
    document.querySelector('.popup__submit-button').textContent = 'Сохранить'
  }
}

function openPopupProfile() {
  profileFormValidator.clearError();
  constants.nameInput.value = userInfo.getUserInfo().name;
  constants.jobInput.value = userInfo.getUserInfo().job;
  popupWithFormProfile.open();
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile({inputName, inputJob}) {
  renderLoading(true)
  apiUser.patchUserDara({inputName, inputJob})
    .then(res => {
      userInfo.setUserInfo({inputName, inputJob} = res)
      renderUserData()
    })
    .finally(renderLoading(false))
}

function formSubmitHandlerAddCard({inputCardName, inputCardLink}) {
  renderLoading(true)
  api.postCard({inputCardName, inputCardLink})
  .then(res => {
    section.addItem(createCard(res))
  })
  .finally(renderLoading(false))
}

constants.buttonEdit.addEventListener('click', openPopupProfile);

constants.buttonPlus.addEventListener('click', function(){
  addCardFormValidator.clearError();
  popupWithFormAddCard.open();

  // constants.popupDelete.classList.add('popup_is-opened')
});

constants.logoImage.addEventListener('click', function() {
  constants.popupLogo.classList.add('popup_is-opened')
})


function formSubmitHandlerUpdateAvatar(avatar) {
  renderLoading(true)
  api.updateAvatar(avatar)
  .then((res) => {
    console.log("res.avatar")
    console.log(res.avatar)
    userInfo.setAvatar(res.avatar)
    renderUserData()
  })
  .finally(renderLoading(false))
}

