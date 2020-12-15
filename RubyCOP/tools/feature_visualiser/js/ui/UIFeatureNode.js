class UIFeatureNode extends UINode {

  constructor(featureCounter) {
    super(featureCounter);
  }

  generateNodeId(featureCounter) {
    let featureObj = featureCounter.entityObj;
    return  featureObj.contextsCounters.map(contextCounter => contextCounter.keyCounter()).join(',')
      + '->'
      + featureCounter.keyCounter()
      + '->'
      + featureObj.targetedClass;
  }

  label(featureCounter) {
    return featureCounter.entityObj.name;
  }

  detailsBehaviour(featureObj) {
    this._label = '<b>' + this._label + '</b>\n';
    for (let method of featureObj.methods) {
      this._label += '\n<code>' + method + '</code>';
    }
    return this;
  }

}