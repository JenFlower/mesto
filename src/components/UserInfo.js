export default class UserInfo {
  constructor({name, job}) {
    this._name = name;
    this._job = job;
  }

  // подставить в форму при открытии
  getUserInfo = () => {
    return {
      name: this._name,
      job: this._job
    }
  }

  // установить данные в профиль из инпутов
  setUserInfo(nameImput, jobInput) {
    return {
      name: this._name = nameImput,
      job: this._job = jobInput
    }
  }
}
