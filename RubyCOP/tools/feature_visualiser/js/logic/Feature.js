class Feature {

  constructor(name, targetedClass, contextsCounters=[], methods=[]) {
    this._name = name;
    this._targetedClass = targetedClass;
    this._contextsCounters = contextsCounters;
    this._methods = methods;
  }

  get name() {
    return this._name;
  }

  get targetedClass() {
    return this._targetedClass;
  }

  get contextsCounters() {
    return this._contextsCounters;
  }

  get methods() {
    return this._methods;
  }

  set methods(methods) {
    this._methods = methods;
  }

  keyForSelection() {
    return this._name + '->' + this._targetedClass;
  }

  keyForActivation() {
    return this._contextsCounters.map(contextCounter => contextCounter.keyCounter()).join('#')
           + '->'
           + this.keyForSelection();
  }

  equals(feature) {
    return this._name === feature.name
        && this._targetedClass === feature.targetedClass;
  }

}