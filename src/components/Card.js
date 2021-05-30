import Api from '../components/Api.js'
import * as constants from '../utils/constants.js'
import PopupDeleteCard from '../components/PopupDeleteCard.js'

export default class Card {
  constructor(data, cardSelector, openPreview, currentUser) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._idOwner = data.owner._id; // id создатель карточки
    this._id = data._id // id карточки

    this._currentUser = currentUser //id пользователя
    this._cardSelector = cardSelector;
    this._openPreview = openPreview;
    this._api = new Api({
      address: "https://mesto.nomoreparties.co",
      token: "fa7815c6-7fbc-421b-b603-b88a64640cf8",
      groupId: "cohort-24"
    })
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
    this._countLike = Array.from(this._element.querySelectorAll('.card__like-count'));

    this._btnDeleteCard = this._element.querySelector('.card__trush');
    this._previewImage = document.querySelector('.preview__image');
    this._previewText = document.querySelector('.preview__text');
    this._previewPopup = document.querySelector('.popup-preview');
    if(this._idOwner === this._currentUser) {

      this._btnDeleteCard.classList.remove('card__trush-hidden')

    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._countLike.forEach(item => {
      // console.log(item)
      item.textContent = this._likes.length;
    })

    this._cardImageTitle.textContent = this._name;
    this._setEventListeners();
    // console.log(this._likes.length)
    return this._element;
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {

      this._handleLike();

    })
    this._btnDeleteCard.addEventListener('click', () => {
      // открыть попап подтвержения
      //constants.popupDelete.classList.add('popup')

      const popupDeleteCard = new PopupDeleteCard('.popup-delete', this._handleDelete())
      popupDeleteCard.open()
      popupDeleteCard.setEventListeners()
      // this._handleDelete();
    })
    this._cardImage.addEventListener('click', () => {
      // this._openPreview();
      this._openPreview(this._link, this._name);
    })
  }

  _handleLike() {
    // this._isLiked
    if(this._btnLike.classList.contains('card__like-button_active')) {
      //delete
      console.log(this._isLiked)
      this._api.deleteLike(this._id, this._countLike)
      .then(() => {
        // this._api.getUserData()
        this._btnLike.classList.remove('card__like-button_active');
        this._likes.length--
        this._isLiked = false
      })
      .then(res => {
        this._countLike.forEach(item => {
          // console.log(item)
          item.textContent = this._likes.length;
        })
      })

    }
    else {
      //add like
      console.log(this._isLiked)
      this._api.putLike(this._id, this._countLike)
      .then(() => {
        // this._api.getUserData()
        this._btnLike.classList.add('card__like-button_active');
        this._likes.length++
        this._isLiked = true
      })
      .then(res => {
        this._countLike.forEach(item => {
          // console.log(item)
          item.textContent = this._likes.length;
        })
      })
    }
  }

  _handleDelete() {
    this._api.deleteCard(this._id)
      .then(() => this._element.remove())
      .then(() => this._element = null)
  }

}
