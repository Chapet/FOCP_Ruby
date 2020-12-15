class UIClassNode extends UINode {

  constructor(classname) {
    super(classname);
    this._color = COLOR_CLASSES;
    this._fontColor = FONT_COLOR_WHITE;
  }

  generateNodeId(classname) {
    return classname;
  }

  label(classname) {
    return classname;
  }

  detailsBehaviour() {
    this._label = '<b>' + this._id + '</b>\n';
    let alteredClass = system.getAlteredClassByClassname(this._id);
    if (alteredClass !== undefined) {
      let behaviours = alteredClass.getBehaviours();
      for (let method of behaviours.keys()) {
        this._label += '\n<code>(' + behaviours.get(method) + ')\t' + method + '</code>';
      }
    }
    return this;
  }
}