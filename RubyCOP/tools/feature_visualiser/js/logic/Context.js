class Context {

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  key() {
    return this._name;
  }
}