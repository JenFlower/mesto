import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');

    this._submitHandler = submitHandler

    this._popupSubmitBtn = this._form.querySelector('.popup__submit-button')
    this._popupSubmitBtnText = this._popupSubmitBtn.textContent;
    console.log(this._popupSubmitBtn.textContent)
  }

  timerSumbit = (text) => {
    this._popupSubmitBtn.textContent = text;
  }

  resetTimerSubmit = () => {
    this._popupSubmitBtn.textContent = this._popupSubmitBtnText;
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      console.log(this._card)
      this._submitHandler(this._card)
      // this.close();
    })
  }

  open = (card) => {
    this._card = card;
    super.open();
  }
}
