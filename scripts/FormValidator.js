export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
  }

  _toggleBtnState(inputList, btnElem) {
    // если хотя бы 1 поле невалидное - добавить класс кнопке
    // метод some вернет true когда встретит невалидный элемент
    const isInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
    const isInputEmpty = !inputList.some(inputElement => inputElement.value.length > 0);

    if(isInvalidInput || isInputEmpty) {
      this._inactiveButtonSubmit(btnElem, this._settings.inactiveButtonClass);
    }
    else {
      this._activateButtonSubmit(btnElem, this._settings.inactiveButtonClass);
    }
  }

  _inactiveButtonSubmit(btnElem, inactiveButtonClass) {
    btnElem.setAttribute('disabled', true);
    btnElem.classList.add(inactiveButtonClass);
  }

  _activateButtonSubmit(btnElem, inactiveButtonClass) {
    btnElem.removeAttribute('disabled', true);
    btnElem.classList.remove(inactiveButtonClass);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._settings.errorClass);
    inputElement.classList.add(this._settings.inputErrorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = "";
    errorElement.classList.remove(this._settings.errorClass);
    inputElement.classList.remove(this._settings.inputErrorClass)
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      // текст ошибки
      const errorMessage = inputElement.validationMessage;
      // если инпут невалидный - показать ошибку
      this._showInputError(inputElement, errorMessage);
    }
    else  // иначе убрать ошибку
    this._hideInputError(inputElement);
  }

  _setEventListeners() {
    // получаем список инпутов
    const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    // находим кнопку
    const btnElem = this._form.querySelector(this._settings.submitButtonSelector);

    const inButtonClass = this._form.querySelector(this._settings.inactiveButtonClass);

    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._inactiveButtonSubmit(btnElem, inButtonClass);
    });
    this._inactiveButtonSubmit(btnElem, inButtonClass);


    inputList.forEach((inputElement) => {
      // повесим событие ввода на инпут
      inputElement.addEventListener('input', () => {
        // вызов функции для проверки валидности инпутов
        this._checkInputValidity(inputElement);
        // переключение кнопки
        this._toggleBtnState(inputList, btnElem);
      });

    });
  }

  enableValidation() {
    // const formList = Array.from(document.querySelectorAll(formSelector));

  //   this._form.forEach(formElement => {
  //   this._setEventListeners()
  // })
    // const formList = Array.from(document.querySelectorAll(formSelector));

    // formList.forEach(formElement => {

    // })
    this._form.addEventListener('submit', evt => evt.preventDefault())
    this._setEventListeners()
  }

}
// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit-button',
//   inactiveButtonClass: 'popup__submit-button_disabled',
//   inputErrorClass: 'popup__input_error',
//   errorClass: 'popup__input-error_active'
// }
// const profileForm = document.querySelector('.popup__form-profile');
// const addCardForm = document.querySelector('.popup__form-card');

// const profileFormValidator = new FormValidator(config, profileForm)
// const addCardFormValidator = new FormValidator(config, addCardForm)

// profileFormValidator.enableValidation();
// addCardFormValidator.enableValidation();
