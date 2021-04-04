const buttonClosePopupProfile = document.querySelector('.popup__close-button-profile');
const buttonClosePopupAddCard = document.querySelector('.popup__close-button-card');
const buttonClosePopupPreview = document.querySelector('.popup__close-button-preview');

const buttonEdit = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup-profile');
// данные, которые нужно взять из верстки
const titlePopup = document.querySelector('.profile__title');
const subtitlePopup = document.querySelector('.profile__subtitle');

// Находим форму в DOM
const formElementProfile = document.querySelector('.popup__form-profile');
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_field_name');
const jobInput = document.querySelector('.popup__input_field_job');


const buttonPlus = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup-card');
// данные, которые нужно взять из верстки
const cardName = document.querySelector('.card__title');
const cardLink = document.querySelector('.card__image');

// Находим форму в DOM
const formElementAddCard = document.querySelector('.popup__form-card');
// Находим поля формы в DOM
const inputCardName = document.querySelector('.popup__input_field_card-name');
const inputCardLink = document.querySelector('.popup__input_field_card-link');
// const card = document.querySelector('.card');

const previewPopup = document.querySelector('.popup-preview');
const previewImage = document.querySelector('.preview__image');
const previewFigcaption = document.querySelector('.preview__text');

// ul, в который надо добавить карточки
const elementsList = document.querySelector('.elements__list');
// cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// insert cards
initialCards.forEach(item => {
  addCard(item.link,item.name);
});

function addCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
   // клонирование
   // true так как нужно все содержимое
   const card = cardTemplate.cloneNode(true);
   const cardImage = card.querySelector('.card__image');
   cardImage.setAttribute('src', link);
   const cardTitle = card.querySelector('.card__title');
   cardTitle.textContent = name;
   const likeButton = card.querySelector('.card__like-button').addEventListener('click', function(evt) {
     evt.target.classList.toggle('card__like-button_active');
   });

   // delete card
   const deleteButton = card.querySelector('.card__trush');
   deleteButton.addEventListener('click', function() {
     card.remove();
   });

   //open card popup
   const imgPreview = card.querySelector('.card__image');
   imgPreview.addEventListener('click', () => {
    openPreview(link, name);
   });
   // проверка на пустоту инпутов
   if(link == '' || name == '') closePopupAddCard;
   else elementsList.prepend(card);
}

function openPreview(link, name) {
  previewImage.setAttribute('src', link);
  previewFigcaption.textContent = name;
  previewPopup.classList.add('popup_is-opened');
}

// закрытие попапа
function closePopupPreview() {
  previewPopup.classList.remove('popup_is-opened');
}


buttonClosePopupPreview.addEventListener('click', closePopupPreview);

// открытие попапа
function openPopupProfile() {
  nameInput.value = titlePopup.textContent;
  jobInput.value = subtitlePopup.textContent;

  // добавление модификатора для открытия попапа
  popupProfile.classList.add('popup_is-opened');
}

// закрытие попапа
function closePopupProfile() {
  popupProfile.classList.remove('popup_is-opened');
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  titlePopup.textContent = nameInput.value;
  subtitlePopup.textContent = jobInput.value;
  closePopupProfile();
}

buttonEdit.addEventListener('click', openPopupProfile);
buttonClosePopupProfile.addEventListener('click', closePopupProfile);
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

///.................ПОПАП ДОБАВЛЕНИЕ КАРТОЧКИ .........
// открытие попапа
function openPopupAddCard() {
  popupAddCard.classList.add('popup_is-opened');
}

// закрытие попапа
function closePopupAddCard() {
  popupAddCard.classList.remove('popup_is-opened');
}

function formSubmitHandlerAddCard (evt) {
  evt.preventDefault();
  addCard(inputCardLink.value, inputCardName.value);
  closePopupAddCard();
}

buttonPlus.addEventListener('click', openPopupAddCard);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
formElementAddCard.addEventListener('submit', formSubmitHandlerAddCard);
