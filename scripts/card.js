
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
  // находим шаблон
   const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');
   // клонирование
   // true так как нужно все содержимое
   const card = cardTemplate.cloneNode(true);
   const cardImage = card.querySelector('.card__image');
   cardImage.setAttribute('src', item.link);

   const cardTitle = card.querySelector('.card__title');
   cardTitle.textContent = item.name;


   elementsList.append(card);
});


