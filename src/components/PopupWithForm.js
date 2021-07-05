import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')]

    this._popupSubmitBtn = this._form.querySelector('.popup__submit-button')
    this._popupSubmitBtnText = this._popupSubmitBtn.textContent;
  }

  startLoadingText = (text) => {
    this._popupSubmitBtn.textContent = text;
  }

  resetLoadingText = () => {
    this._popupSubmitBtn.textContent = this._popupSubmitBtnText;
  }

  // собирает данные всех полей формы.
  _getInputValues = () => {
    const listValues = {}
    this._inputs.forEach(item => {
      listValues[item.name] = item.value
    })
    console.log(listValues)

    return listValues
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }

  close() {
    this._form.reset();
    super.close()
  }

}
