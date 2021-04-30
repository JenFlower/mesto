import * as utils from './Utils.js'



export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card');
   // клонирование
   // true так как нужно все содержимое
    const card = cardTemplate.cloneNode(true);
    return card;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._handleLike();
    })
    this._element.querySelector('.card__trush').addEventListener('click', () => {
      this._handleDelete();
    })
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openPreview();
    })
  }

  _handleLike() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
    // console.log('like!')
  }

  _openPreview() {
    document.querySelector('.preview__image').setAttribute('src', this._link);
    document.querySelector('.preview__image').setAttribute('alt', `Фотография "${this._name}"`);
    document.querySelector('.preview__text').textContent = this._name;
    utils.openPopup(document.querySelector('.popup-preview'))
  }

  _handleDelete() {
    this._element.remove();
  }

}
