import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');

    this._submitHandler = submitHandler

    this._popupSubmitBtn = this._form.querySelector('.popup__submit-button')
    this._popupSubmitBtnText = this._popupSubmitBtn.textContent;
  }

  startLoadingText = (text) => {
    this._popupSubmitBtn.textContent = text;
  }

  resetLoadingText = () => {
    this._popupSubmitBtn.textContent = this._popupSubmitBtnText;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card)
    })
  }

  open = (card) => {
    this._card = card;
    super.open();
  }
}
