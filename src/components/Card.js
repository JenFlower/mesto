export default class Card {
  constructor(data, cardSelector, openPreview, likeHandler, deleteCard, idCard, userId) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPreview = openPreview;
    this.likeHandler = likeHandler;
    this._deleteCard = deleteCard;
    this._idCard = idCard;
    this._userId = userId;
    this._likes = data.likes;
    this._idOwner = data.owner._id; // id создателя карточки
    // this._openDeleteForm = openDeleteForm;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.querySelector('.card');
   // клонирование
   // true так как нужно все содержимое
    const card = cardTemplate.cloneNode(true);
    return card;
  }

  getCardId = () => {
    return this._idCard;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImageTitle = this._element.querySelector('.card__title');
    this._btnLike = this._element.querySelector('.card__like-button');
    this._btnDeleteCard = this._element.querySelector('.card__trush');
    this._countLike = this._element.querySelector('.card__like-count');


    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardImageTitle.textContent = this._name;
    this._countLike.textContent = this._likes.length;

    if(this._likes.some(likeUser => likeUser._id === this._userId)) {
      this._btnLike.classList.add('card__like-button_active');
    }
    if(this._idOwner === this._userId) {
      this._btnDeleteCard.classList.remove('card__trush-hidden')
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', () => {
      this.likeHandler(this._idCard, this._btnLike.classList.contains('card__like-button_active'));
      this._handleLike()
    })
    this._btnDeleteCard.addEventListener('click', () => {
      this._deleteCard(this)
    })
    this._cardImage.addEventListener('click', () => {
      this._openPreview(this._link, this._name);
    })
  }


  // like() {
  //   this._btnLike.classList.add('card__like-button_active');
  //   this._countLike.textContent = this._likes.length;
  // }

  _handleLike() {
    if(this._btnLike.classList.contains('card__like-button_active')) {
      //delete
      this._btnLike.classList.remove('card__like-button_active');
      this._likes.length--;
      this._isLiked = false;
      this._countLike.textContent = this._likes.length;
    }
    else {
      //add like
      this._btnLike.classList.add('card__like-button_active');
      this._likes.length++;
      this._isLiked = true;
      this._countLike.textContent = this._likes.length;
    }
  }

  // deleteLike = () => {
  //   this._btnLike.classList.delete('card__like-button_active');
  //   this._likes.length--;
  //   this._isLiked = false
  // }

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

}
