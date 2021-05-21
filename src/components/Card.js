export default class Card {
  constructor(data, cardSelector, openPreview) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPreview = openPreview;
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
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImageTitle = this._element.querySelector('.card__title');
    this._btnLike = this._element.querySelector('.card__like-button');
    this._btnDeleteCard = this._element.querySelector('.card__trush');
    this._previewImage = document.querySelector('.preview__image');
    this._previewText = document.querySelector('.preview__text');
    this._previewPopup = document.querySelector('.popup-preview');



    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImageTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      this._handleLike();
    })
    this._btnDeleteCard.addEventListener('click', () => {
      this._handleDelete();
    })
    this._cardImage.addEventListener('click', () => {
      // this._openPreview();
      this._openPreview(this._link, this._name);
    })
  }

  _handleLike() {
    this._btnLike.classList.toggle('card__like-button_active');
    // console.log('like!')
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

}
