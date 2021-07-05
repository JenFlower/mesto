export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // отвечает за отрисовку всех элементов
  render() {
    this._items.reverse().forEach(item => {
      this._renderer(item);
    })
  }

  // принимает DOM-элемент и добавляет его в контейнер.
  addItem(generateCard) {
    this._container.prepend(generateCard);
  }
}

