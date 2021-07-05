export default class UserInfo {
  constructor({nameSelector, jobSelector, avatar}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatar);
  }

  // подставить в форму при открытии
  getUserInfo = () => {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    }
  }

  // установить данные в профиль из инпутов
  setUserInfo = (nameImput, jobInput) => {
      this._name.textContent = nameImput
      this._job.textContent = jobInput
  }

  setAvatar = (avatar) => {
    this._avatar.src = avatar
  }
}
