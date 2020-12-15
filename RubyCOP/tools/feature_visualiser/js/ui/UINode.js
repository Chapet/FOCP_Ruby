class UINode {

  constructor(obj) {
    this._id = this.generateNodeId(obj);
    this._label = this.label(obj);
    this._x = undefined;
    this._y = undefined;
  }

  get id() {
    return this._id;
  }

  get fontColor() {
    return this._fontColor;
  }

  get color() {
    return this._color;
  }

  set color(color) {
    this._color = color;
  }

  x(x) {
    this._x = x;
    return this;
  }

  y(y) {
    this._y = y;
    return this;
  }

  build() {
    return {
      id: this._id,
      x: this._x,
      y: this._y,
      font: {
        color: this._fontColor,
        multi: 'html',
        size: 18
      },
      label: this._label,
      color: this._color,
      shape: 'box'
    };
  }

}