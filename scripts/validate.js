// переключение состояния кнопки
const toggleBtnState = (inputList, btnElem) => {
  // если хотя бы 1 поле невалидное - добавить класс кнопке
  // метод some вернет true когда встретит невалидный элемент
  const isInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
  if(isInvalidInput) {
    btnElem.setAttribute('disabled', true);
    btnElem.classList.add('popup__submit-button_disabled');
  }
  else {
    btnElem.removeAttribute('disabled', true);
    btnElem.classList.remove('popup__submit-button_disabled');
  }
}

// функция для вывода спана с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  // находим спан ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
  inputElement.classList.add('popup__input_error')
}

// скрыть спан с ошибкой
const hideInputError = (formElement, inputElement) => {
  // находим спан ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)
  errorElement.textContent = "";
  errorElement.classList.remove('popup__input-error_active');
  inputElement.classList.remove('popup__input_error')
}


// проверка валидности инпута
const checkInputValidity = (formElement, inputElement) => {
  // получение свойства valid
  if(!inputElement.validity.valid) {
    // текст ошибки
    const errorMessage = inputElement.validationMessage;
    // если инпут невалидный - показать ошибку
    showInputError(formElement, inputElement, errorMessage);
  }
  else  // иначе убрать ошибку
    hideInputError(formElement, inputElement);
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
}

// принимает на вход форму
const setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
  formElement.addEventListener('submit', handleFormSubmit);
  // получаем список инпутов
  // const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  // находим кнопку
  // const btnElem = formElement.querySelector('.popup__submit-button');
  const btnElem = formElement.querySelector(submitButtonSelector);

  inputList.forEach((inputElement) => {
    // повесим событие ввода на инпут
    inputElement.addEventListener('input', () => {
      // вызов функции для проверки валидности инпут ов
      checkInputValidity(formElement, inputElement);
      // переключение кнопки
      toggleBtnState(inputList, btnElem);
    });
  });
  // для проверки не только при вводе
  toggleBtnState(inputList, btnElem);
}

// включение валидации
// const enableValidation = () => {
//   // ищем все формы и собираем их в массив
//   const formList = Array.from(document.querySelectorAll('.popup__form'));

//   // перебираем массив форм
//   formList.forEach(formElement => {
//     // на каждую форму вешаем слушатель (функция)
//     setEventListeners(formElement);
//   })
// }


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
  // ищем все формы и собираем их в массив
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach(formElement => {
    setEventListeners(formElement, inputSelector, submitButtonSelector)
  })
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button'
  // inactiveButtonClass: 'popup__submit-button_disabled',
  // inputErrorClass: 'popup__input_error',
  // errorClass: 'popup__input_error_active'
});
