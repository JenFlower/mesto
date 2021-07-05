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

const userInfo = new UserInfo({nameSelector: constants.config.nameSelector, jobSelector: constants.config.jobSelector, avatar: constants.config.avatar})


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


// let card;
function createCard(item) {
  const card = new Card(item, '.card-template_type_default', openPreview,
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
        .catch(err => console.log(err))
      }
      else {
        api.deleteLike(cardId)
        .then((res) => {
          // console.log(res)
        })
        .catch(err => console.log(err))
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
  popupDeleteCard.startLoadingText('Удаление...')
  api.deleteCard(card.getCardId())
  .then(res => {
    card.handleDelete()
  })
  .then(() => {
    popupDeleteCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupDeleteCard.resetLoadingText()
  })
})
popupDeleteCard.setEventListeners();

const popupWithFormProfile = new PopupWithForm('.popup-profile', (inputsData)=>{
  submitEditProfileForm(inputsData);
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
  // деструктуризация
  let {name, job} = userInfo.getUserInfo();
  constants.nameInput.value = name;
  constants.jobInput.value = job;
  popupWithFormProfile.open();
}

// Обработчик «отправки» формы
function submitEditProfileForm({inputName, inputJob}) {
  popupWithFormProfile.startLoadingText('Сохранение...')
  api.patchUserData({inputName, inputJob})
  .then(res => {
    userInfo.setUserInfo(res.name, res.about)
  })
  .then(() => {
    popupWithFormProfile.close()
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithFormProfile.resetLoadingText()
  })
}
function formSubmitHandlerUpdateAvatar(avatar) {
  popupWithFormLogo.startLoadingText('Сохранение...')
  api.updateAvatar(avatar)
  .then((res) => {
    userInfo.setAvatar(res.avatar)
  })
  .then(() => {
    popupWithFormLogo.resetLoadingText()
    popupWithFormLogo.close()
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithFormLogo.resetLoadingText()
  })
}

constants.buttonEdit.addEventListener('click', openPopupProfile);

function formSubmitHandlerAddCard({inputCardName, inputCardLink}) {
  popupWithFormAddCard.startLoadingText('Сохранение...')
  api.postCard({inputCardName, inputCardLink})
  .then(res => {
    section.addItem(createCard(res))
  })
  .then(() => {
    popupWithFormAddCard.resetLoadingText()
    popupWithFormAddCard.close()
  })
  .catch(err => console.log(err))
  .finally(() => {
    popupWithFormAddCard.resetLoadingText()
  })
}


constants.buttonPlus.addEventListener('click', function(){
  addCardFormValidator.clearError();
  popupWithFormAddCard.open();
  popupWithFormAddCard.resetLoadingText()
});

constants.logoImage.addEventListener('click', function() {
  logoFormValidator.clearError();
  popupWithFormLogo.open()
  popupWithFormLogo.resetLoadingText()
})


