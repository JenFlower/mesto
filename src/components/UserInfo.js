export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  // подставить в форму при открытии
  getUserInfo = () => {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  // установить данные в профиль из инпутов
  setUserInfo = (nameImput, jobInput) => {
      console.log(nameImput)
      this._name.textContent = nameImput
      this._job.textContent = jobInput
  }
}
