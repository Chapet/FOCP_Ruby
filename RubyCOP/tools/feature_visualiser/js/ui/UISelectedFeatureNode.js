class UISelectedFeatureNode extends UINode {

  constructor(featureObj) {
    super(featureObj);
    this._color = COLOR_SELECTED_FEATURES;
    this._fontColor = FONT_COLOR_WHITE;
  }

  generateNodeId(featureObj) {
    return featureObj.name + '#' + featureObj.targetedClass;
  }

  label(featureObj) {
    return featureObj.name;
  }
}