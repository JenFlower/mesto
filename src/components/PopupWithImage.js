import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open = (link, name) => {
    this._popupSelector.querySelector('.preview__image').src = link;
    this._popupSelector.querySelector('.preview__text').textContent = name;
    super.open();
  }
}
