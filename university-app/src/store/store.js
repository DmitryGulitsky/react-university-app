export default class Store {
  constructor(updateState, state) {
    this._updateState = updateState;
    this._state = state;
    this._callbacks = [];
  }

  get state() {   // определим текущее состояние state
    return this._state;
  }

  update(action) {  // метод с помощью которого можно взаимодействовать с состоянием, принимает объект действия
    this._state = this._updateState(this._state, action); // аргументы - предыдущее состояние и объект действия
    this._callbacks.forEach(callback => callback());  // уведомляем подписчика о изменении состояния
  }

  subscribe(callback) {   // метод для подписки на состояние
    this._callbacks.push(callback); //  в массив добавим переданную функцию
    return () => this._callbacks = this._callbacks.filter(cb => cb !== callback)   // отписываемся. проверяем содержит ли массив переданную функцию, и удаляем ее, если содержит
  }
}
