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
    if(nameImput)
      this._name.textContent = nameImput
    if(jobInput)
      this._job.textContent = jobInput
  }

  setAvatar = (avatar) => {
    if(avatar)
      this._avatar.src = avatar
  }
}
