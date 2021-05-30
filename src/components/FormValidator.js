// import { NormalModule } from "webpack";

export default class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._btnElem = this._form.querySelector(this._settings.submitButtonSelector);
    this._errors = Array.from(this._form.querySelectorAll('.popup__input-error'))
  }

  clearError() {
    // console.log("errors " + this._errors)
    // const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    this._errors.forEach(item => {
      // console.log("item: " + item)
      item.classList.remove(this._settings.errorClass)
      // inputElement.classList.remove(this._settings.inputErrorClass)
    })

    this._inputList.forEach(inputElement => {
      inputElement.classList.remove(this._settings.inputErrorClass)
    })
    // errorElement.textContent = "";
    // errorElement.classList.remove(this._settings.errorClass);
    // inputElement.classList.remove(this._settings.inputErrorClass)
  }

  toggleBtnState() {
    // если хотя бы 1 поле невалидное - добавить класс кнопке
    // метод some вернет true когда встретит невалидный элемент
    const isInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);

    if(isInvalidInput) {
      this._inactiveButtonSubmit();
    }
    else {
      this._activateButtonSubmit();
    }
  }

  _inactiveButtonSubmit() {
    this._btnElem.setAttribute('disabled', true);
    this._btnElem.classList.add(this._settings.inactiveButtonClass);
  }

  _activateButtonSubmit() {
    this._btnElem.removeAttribute('disabled', true);
    this._btnElem.classList.remove(this._settings.inactiveButtonClass);
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
    // else if(!inputElement.validity.valid && inputElement.value === '')
    //   this._hideInputError(inputElement);
    else  // иначе убрать ошибку
      this._hideInputError(inputElement);
  }

  _setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._inactiveButtonSubmit();
    });
    this._inactiveButtonSubmit();


    this._inputList.forEach((inputElement) => {
      // повесим событие ввода на инпут

      inputElement.addEventListener('input', () => {


        // вызов функции для проверки валидности инпутов
        this._checkInputValidity(inputElement);
        // переключение кнопки
        this.toggleBtnState();
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
