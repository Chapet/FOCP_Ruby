class System {

  constructor() {
    this._alteredClasses = new Map();
    this._addedFeatures = new Map();
    this._removedFeatures = new Map();
  }

  getAlteredClassByClassname(classname) {
    return this._alteredClasses.get(classname);
  }

  addAlteration(featureObj, superclass) {
    let alteredClass = this._getorCreateAlteredClass(featureObj, superclass);
    alteredClass.addAlteration(featureObj);
    return alteredClass;
  }

  resetActivationOfAlteration(featureObj) {
    let classname = featureObj.targetedClass;
    let alteredClass = this._alteredClasses.get(classname);
    alteredClass.resetActivationOfAlteration(featureObj);

    if (alteredClass.isEmpty()) {
      this._alteredClasses.delete(classname);
    }
  }

  resetDeactivationOfAlteration(featureObj, superclass) {
    this._getorCreateAlteredClass(featureObj, superclass).resetDeactivationOfAlteration(featureObj);
  }

  removeAlteration(featureObj) {
    let classname = featureObj.targetedClass;
    let alteredClass = this._alteredClasses.get(classname);
    let featureObjToReturn = undefined;

    if (alteredClass !== undefined) {
      featureObjToReturn = alteredClass.removeAlteration(featureObj);
      if (alteredClass.isEmpty()) {
        this._alteredClasses.delete(classname);
      }
    }

    return alteredClass;
  }

  addAnAddedFeature(featureObj) {
    let key = featureObj.keyForSelection();
    if (this._addedFeatures.has(key)) {
      let addedFeatures = this._addedFeatures.get(key);
      addedFeatures.push(featureObj);
    } else {
      this._addedFeatures.set(key, [featureObj]);
    }
  }

  removeAnAddedFeature(featureObj) {
    let key = featureObj.keyForSelection();
    let addedFeatures = this._addedFeatures.get(key);
    let featureObjToReturn = addedFeatures.pop();
    if (addedFeatures.length === 0) {
      this._addedFeatures.delete(key);
    }
    return featureObjToReturn;
  }

  addARemovedFeature(featureObj) {
    this._removedFeatures.set(featureObj.keyForSelection(), featureObj);
  }

  removeARemovedFeature(featureObj) {
    let featureObjToReturn = this._removedFeatures.get(featureObj.keyForSelection());
    this._removedFeatures.delete(featureObj.keyForSelection());
    return featureObjToReturn;
  }

  getTargetOfAdaptation(featureObj) {
    let classname = featureObj.targetedClass;
    let alteredClass = this._alteredClasses.get(classname);

    let targetOfAdaptation = alteredClass.getTargetOfAdaptation(featureObj);
    if (targetOfAdaptation === undefined) {
      return alteredClass;
    }
    return targetOfAdaptation;
  }

  _getorCreateAlteredClass(featureObj, superclass) {
    let classname = featureObj.targetedClass;
    let alteredClass = new AlteredClass(classname, superclass);
    if (this._alteredClasses.has(classname)) {
      alteredClass = this._alteredClasses.get(classname);
    } else {
      this._alteredClasses.set(classname, alteredClass);
    }
    return alteredClass;
  }
}