// переключение состояния кнопки
const toggleBtnState = (inputList, btnElem, inactiveButtonClass) => {
  // если хотя бы 1 поле невалидное - добавить класс кнопке
  // метод some вернет true когда встретит невалидный элемент
  const isInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  const isInputEmpty = !inputList.some(inputElement => inputElement.value.length > 0);

  if(isInvalidInput || isInputEmpty) {
    inactiveButtonSubmit(btnElem, inactiveButtonClass);
  }
  else {
    activateButtonSubmit(btnElem, inactiveButtonClass);
  }
}

const inactiveButtonSubmit = (btnElem, inactiveButtonClass) => {

  btnElem.setAttribute('disabled', true);
  btnElem.classList.add(inactiveButtonClass);
}


const activateButtonSubmit = (btnElem, inactiveButtonClass) => {
  btnElem.removeAttribute('disabled', true);
  btnElem.classList.remove(inactiveButtonClass);
}

// функция для вывода спана с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  // находим спан ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass)
}

// скрыть спан с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  // находим спан ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass)
}


// проверка валидности инпута
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  // получение свойства valid
  if(!inputElement.validity.valid) {
    // текст ошибки
    const errorMessage = inputElement.validationMessage;
    // если инпут невалидный - показать ошибку
    showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  }
  else  // иначе убрать ошибку
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
}


// принимает на вход форму
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  const btnElem = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
    inactiveButtonSubmit(btnElem, inactiveButtonClass);
  });
  inactiveButtonSubmit(btnElem, inactiveButtonClass);
  // получаем список инпутов
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // находим кнопку

  inputList.forEach((inputElement) => {
    // повесим событие ввода на инпут
    inputElement.addEventListener('input', () => {
      // вызов функции для проверки валидности инпутов
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      // переключение кнопки
      toggleBtnState(inputList, btnElem, inactiveButtonClass);
    });

  });
}

// включение валидации
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach(formElement => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
});
