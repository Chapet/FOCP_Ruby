class IndexedActivatedFeatures {

  constructor() {
    // A list containing the entire feature objects.
    this._activatedFeatures = [];
    // A list containing booleans to express if the activatedFeature at a specified index is still active or not.
    this._realActivatedFeatures = [];
  }

  isEmpty() {
    return this._realActivatedFeatures.length === 0;
  }

  addActivatedFeature(featureObj) {
    this._activatedFeatures.push(featureObj);
    this._realActivatedFeatures.push(true);
  }

  addDeactivatedFeature(featureObj) {
    let indexOfLastActivatedFeature = this._getLastIndexOfActivatedFeature(featureObj);
    this._realActivatedFeatures[indexOfLastActivatedFeature] = false;
  }

  resetActivatedFeature(featureObj) {
    let indexOfFirstIndexOfDeactivatedFeature = this._getFirstIndexOfDeactivatedFeature(featureObj);
    this._realActivatedFeatures[indexOfFirstIndexOfDeactivatedFeature] = true;
  }

  resetDeactivatedFeature(featureObj) {
    let indexOfLastActivatedFeature = this._getLastIndexOfActivatedFeature(featureObj);
    this._activatedFeatures.splice(indexOfLastActivatedFeature, 1);
    this._realActivatedFeatures.splice(indexOfLastActivatedFeature, 1);
  }

  getOrderedRealActivatedFeatures() {
    let orderedRealActivatedFeatures = [];
    for (let i = 0; i <= this._realActivatedFeatures.length - 1; i++) {
      if (this._realActivatedFeatures[i]) {
        orderedRealActivatedFeatures.push(this._activatedFeatures[i]);
      }
    }
    return orderedRealActivatedFeatures;
  }

  getTargetedFeatureOfAdaptation(featureObj) {
    let indexOfLastActivatedFeature = this._getLastIndexOfActivatedFeature(featureObj);
    for (let i = indexOfLastActivatedFeature - 1; i >= 0; i--) {
      if (this._realActivatedFeatures[i]) {
        return this._activatedFeatures[i];
      }
    }
    return undefined;
  }

  _getFirstIndexOfDeactivatedFeature(featureObj) {
    let indexOfFirstIndexOfDeactivatedFeature = undefined;
    for (let index = 0; index <= this._activatedFeatures.length - 1; index++) {
      if (this._activatedFeatures[index].keyForActivation() === featureObj.keyForActivation()
        && !this._realActivatedFeatures[index]) {
        indexOfFirstIndexOfDeactivatedFeature = index;
        break;
      }
    }
    return indexOfFirstIndexOfDeactivatedFeature;
  }

  _getLastIndexOfActivatedFeature(featureObj) {
    let indexOfLastActivatedFeature = undefined;
    for (let index = this._activatedFeatures.length - 1; index >= 0; index--) {
      if (this._activatedFeatures[index].keyForActivation() === featureObj.keyForActivation()
        && this._realActivatedFeatures[index]) {
        indexOfLastActivatedFeature = index;
        break;
      }
    }
    return indexOfLastActivatedFeature;
  }
}