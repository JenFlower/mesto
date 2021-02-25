let buttonClosePopup = document.querySelector('.popup__close-button');
let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
// данные, которые нужно взять из верстки
let titlePopup = document.querySelector('.profile__title');
let subtitlePopup = document.querySelector('.profile__subtitle');

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__occupation');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault();
    titlePopup.textContent = nameInput.value;
    subtitlePopup.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


// открытие попапа
function openPopup() {
  // добавление модификатора для открытия попапа

  nameInput.value = titlePopup.textContent;
  jobInput.value = subtitlePopup.textContent;

  popup.classList.add('popup_is-opened');
}

// закрытие попапа
function closePopup() {
  popup.classList.remove('popup_is-opened');
}


buttonEdit.addEventListener('click', openPopup);
buttonClosePopup.addEventListener('click', closePopup);
