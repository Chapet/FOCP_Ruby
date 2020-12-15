class UIActiveContextNode extends UIContextNode {

  constructor(contextCounter) {
    super(contextCounter);
    this._color = COLOR_ACTIVE_CONTEXTS;
    this._fontColor = COLOR_CLASSES;
  }

}