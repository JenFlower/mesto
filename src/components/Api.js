export default class Api  {
  constructor({address, token, groupId}) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  getCards() {
    return fetch(`${this._address}/v1/${this._groupId}/cards`, {
      headers: {
        authorization: this._token
      },
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  getUserData() {
    return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'

      }
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }


  patchUserDara({inputName, inputJob}) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputName,
        about: inputJob
      })
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  updateAvatar(inputData) {
    return fetch(`${this._address}/v1/${this._groupId}/users/me/avatar`, {
      method: 'PATCH', //????
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: inputData
      })
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  putLike(cardId) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }


  deleteLike(cardId) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  postCard({inputCardName, inputCardLink}) {
    return fetch(`${this._address}/v1/${this._groupId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name: inputCardName,
        link: inputCardLink
      })
    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }

  deleteCard(idCard) {
    return fetch(`${this._address}/v1/${this._groupId}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }

    })
    .then(res => res ? res.json() : Promise.reject(`Error: ${res.status}`))
  }


}
