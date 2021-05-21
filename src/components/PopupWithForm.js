import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')]
  }

  // собирает данные всех полей формы.
  _getInputValues = () => {
    const listValues = {}
    this._inputs.forEach(item => {
      // console.log(item.name)
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
      this.close();
    })
  }

  close() {
    this._form.reset();
    // console.log(this._form);
    super.close()
  }

}
