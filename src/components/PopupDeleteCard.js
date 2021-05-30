import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form');
    this._submitHandler = submitHandler
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.close();
    })
  }
}
