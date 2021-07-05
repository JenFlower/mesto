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
import Popup from '../components/Popup'
import PopupDeleteCard from '../components/PopupDeleteCard'

const profileFormValidator = new FormValidator(constants.config, constants.formElementProfile)
const addCardFormValidator = new FormValidator(constants.config, constants.formElementAddCard)
const logoFormValidator = new FormValidator(constants.config, constants.formElementEditLogo)

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
logoFormValidator.enableValidation();

const userInfo = new UserInfo({nameSelector: '.profile__title', jobSelector: '.profile__subtitle', avatar: '.profile__logo'})


let userId;

const api = new Api({
  address: "https://mesto.nomoreparties.co",
  token: "96259e94-a15e-4621-85d4-6e77b73cb408",
  groupId: "cohort-25"
})

let section = '';

// загрузка данных пользователя и карточек
Promise.all([api.getUserData(), api.getCards()])
.then(([userData, cards]) => {
  userId = userData._id
  userInfo.setUserInfo(userData.name, userData.about)
  userInfo.setAvatar(userData.avatar)

  section = new Section({items: cards, renderer: (item) => {
    section.addItem(createCard(item))
    }},
    '.elements__list')
    section.render();
})


let card;
function createCard(item) {
  card = new Card(item, '.card-template_type_default', openPreview,
    (cardId, isLiked) => {
      if(!isLiked) {
        // console.log(isLiked)
        api.putLike(cardId)
        .then((res) => {
          //????
          // console.log(res)
          // res.likes.length++;
          // console.log(Card)
          // putLike(res)
            // card.like(res);
        })
      }
      else {
        api.deleteLike(cardId)
        .then((res) => {
          // console.log(res)
        })
      }
    }
  ,
  (card) => {
    popupDeleteCard.open(card);
  }, item._id, userId).generateCard();
  return card;
}

const popupWithImage = new PopupWithImage('.popup-preview');
popupWithImage.setEventListeners();

function openPreview(link, name) {
  popupWithImage.open(link, name);
}

const popupDeleteCard = new PopupDeleteCard(('.popup-delete'), (card) => {
  popupDeleteCard.timerSumbit('Удаление...')
  api.deleteCard(card.getCardId())
  .then(res => {
    card.handleDelete()
  })
  .then(() => {
    popupDeleteCard.close();
    popupDeleteCard.resetTimerSubmit()
  })
  .catch(err => console.log(err))
})
popupDeleteCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup-profile', (inputsData)=>{
  formSubmitHandlerProfile(inputsData);
});
popupWithFormProfile.setEventListeners();


const popupWithFormAddCard = new PopupWithForm('.popup-card', (inputsData)=>{
  formSubmitHandlerAddCard(inputsData)
});
popupWithFormAddCard.setEventListeners();

const popupWithFormLogo = new PopupWithForm('.popup-logo', (inputsData)=>{
  formSubmitHandlerUpdateAvatar(inputsData.inputAvatar);
});
popupWithFormLogo.setEventListeners();

function openPopupProfile() {
  profileFormValidator.clearError();
  constants.nameInput.value = userInfo.getUserInfo().name;
  constants.jobInput.value = userInfo.getUserInfo().job;
  popupWithFormProfile.open();
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile({inputName, inputJob}) {
  popupWithFormProfile.timerSumbit('Сохранение...')
  api.patchUserData({inputName, inputJob})
  .then(res => {
    console.log(res)
    userInfo.setUserInfo(res.name, res.about)
  })
  .then(() => {
    popupWithFormProfile.resetTimerSubmit()
    popupWithFormProfile.close()
  })
  .catch(err => console.log(err))
}
function formSubmitHandlerUpdateAvatar(avatar) {
  popupWithFormLogo.timerSumbit('Сохранение...')
  api.updateAvatar(avatar)
  .then((res) => {
    userInfo.setAvatar(res.avatar)
  })
  .then(() => {
    popupWithFormLogo.resetTimerSubmit()
    popupWithFormLogo.close()
  })
  .catch(err => console.log(err))
}

constants.buttonEdit.addEventListener('click', openPopupProfile);

function formSubmitHandlerAddCard({inputCardName, inputCardLink}) {
  popupWithFormAddCard.timerSumbit('Сохранение...')
  api.postCard({inputCardName, inputCardLink})
  .then(res => {
    section.addItem(createCard(res))
  })
  .then(() => {
    popupWithFormAddCard.resetTimerSubmit()
    popupWithFormAddCard.close()
  })
  .catch(err => console.log(err))
}


constants.buttonPlus.addEventListener('click', function(){
  addCardFormValidator.clearError();
  popupWithFormAddCard.open();
  popupWithFormAddCard.resetTimerSubmit()
});

constants.logoImage.addEventListener('click', function() {
  logoFormValidator.clearError();
  popupWithFormLogo.open()
  popupWithFormLogo.resetTimerSubmit()
})


