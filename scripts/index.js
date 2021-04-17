
// const buttonClosePopupProfile = document.querySelector('.popup__close-button-profile');
// const buttonClosePopupAddCard = document.querySelector('.popup__close-button-card');
// const buttonClosePopupPreview = document.querySelector('.popup__close-button-preview');

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

// insert cards
initialCards.forEach(item => {
  addCard(createCard(item.link, item.name));
});


function openPopup(popupName) {
  popupName.classList.add('popup_is-opened');
  document.addEventListener('keydown', escHandler);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escHandler);
}

// создание карточки
function createCard(link, name) {
  const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
   // клонирование
   // true так как нужно все содержимое
   const card = cardTemplate.cloneNode(true);
   const cardImage = card.querySelector('.card__image');
   cardImage.setAttribute('src', link);
   cardImage.setAttribute('alt', name);
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
  cardImage.addEventListener('click', () => {
    openPreview(link, name);
   });

   return card;
}
// добавление карточки в дом
function addCard(item) {
  return elementsList.prepend(item);
}


function openPreview(link, name) {
  previewImage.setAttribute('src', link);
  previewImage.setAttribute('alt', `Фотография "${name}"`);
  previewFigcaption.textContent = name;
  openPopup(previewPopup);
}
// buttonClosePopupPreview.addEventListener('click', function(){closePopup(previewPopup)});

// открытие попапа
function openPopupProfile() {
  nameInput.value = titlePopup.textContent;
  jobInput.value = subtitlePopup.textContent;

  // добавление модификатора для открытия попапа
  openPopup(popupProfile);
}

// Обработчик «отправки» формы
function formSubmitHandlerProfile (evt) {
  evt.preventDefault();
  titlePopup.textContent = nameInput.value;
  subtitlePopup.textContent = jobInput.value;
  closePopup(popupProfile);
}

buttonEdit.addEventListener('click', openPopupProfile);
// buttonClosePopupProfile.addEventListener('click', function(){closePopup(popupProfile)});
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

// закрытие попапа
function closePopupAddCard() {
  inputCardName.value = '';
  inputCardLink.value = '';
  closePopup(popupAddCard);

}

function formSubmitHandlerAddCard (evt) {
  evt.preventDefault();
  addCard(createCard(inputCardLink.value, inputCardName.value));
  closePopupAddCard();
}

buttonPlus.addEventListener('click', function(){openPopup(popupAddCard)});
// buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
formElementAddCard.addEventListener('submit', formSubmitHandlerAddCard);





// закрытие на esc
const escHandler = (evt) => {
  if(evt.key === "Escape") {
    // нашли открытый попап
    const openedPopup = document.querySelector('.popup_is-opened')
    closePopup(openedPopup)
  }
}

// закрытие на клик
const clickHandler = () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {

      if (evt.target.classList.contains('popup_is-opened')) {
          closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
  })
  })

}
  //2
  // const popupOpened = document.querySelector('.popup_is-opened');
  // popupOpened.addEventListener('click', (evt) => {
  //       // проверка на нажатие на форму и изображение
  //       if(!evt.target.closest('.popup__form') && !evt.target.closest('.preview')) {
  //         closePopup(popupOpened);
  //       }
  //     })


      //1
  // const popups = document.querySelectorAll('.popup_is-opened')
  // popups.forEach(popupElement => {
  //   popupElement.addEventListener('click', (evt) => {
  //     // проверка на нажатие на форму и изображение
  //     if(!evt.target.closest('.popup__form') && !evt.target.closest('.preview')) {
  //       closePopup(popupElement);
  //     }
  //   })
  // })


// document.addEventListener('keydown', escHandler);
// document.addEventListener('click', clickHandler);
clickHandler();


