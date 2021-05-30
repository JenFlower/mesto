export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    // console.log(this)
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    // console.log("close from relative")
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    // console.log('esc')
    if(evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
        this.close();
      }
      if (evt.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  }

}
