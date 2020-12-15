class UIInActiveContextNode extends UIContextNode {

  constructor(contextCounter) {
    super(contextCounter);
    this._color = COLOR_DEACTIVATION;
    this._fontColor = FONT_COLOR_BLACK;
  }

}