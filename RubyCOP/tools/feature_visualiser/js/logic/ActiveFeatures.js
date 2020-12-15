class ActiveFeatures {

  constructor() {
    this._activeFeatures = new Map();
    // Serve to retrieve the complete object of features for the edges in the visualisation
    this._activatedFeaturesInCurrentRound = new Map();
    this._deactivatedFeaturesInCurrentRound = new Map();
  }

  getFeatureCounter(featureObj) {
    return this._activeFeatures.get(featureObj.keyForActivation());
  }
  
  activate(featureObj) {
    let featureCounter = this._activate(featureObj);
    this._activatedFeaturesInCurrentRound.set(featureObj.keyForSelection(), featureObj);
    return featureCounter;
  }

  deactivate(featureObj) {
    let featureCounter = this._deactivate(featureObj);
    this._deactivatedFeaturesInCurrentRound.set(featureObj.keyForSelection(), featureObj);
    return featureCounter;
  }

  enableActivation(featureObj) {
    let featureObjToReactivate = this._deactivatedFeaturesInCurrentRound.get(featureObj.keyForSelection());
    this._deactivatedFeaturesInCurrentRound.delete(featureObjToReactivate.keyForSelection());
    return this._activate(featureObjToReactivate);
  }

  disableActivation(featureObj) {
    let featureObjToDeactivate = this._activatedFeaturesInCurrentRound.get(featureObj.keyForSelection());
    this._activatedFeaturesInCurrentRound.delete(featureObjToDeactivate.keyForSelection());
    return this._deactivate(featureObjToDeactivate);
  }

  restoreActivatedFeatureInCurrentRound(featureObj) {
    this._activatedFeaturesInCurrentRound.set(featureObj.keyForSelection(), featureObj);
  }

  restoreDeactivatedFeatureInCurrentRound(featureObj) {
    this._deactivatedFeaturesInCurrentRound.set(featureObj.keyForSelection(), featureObj);
  }

  removeActivatedFeatureInCurrentRound(featureObj) {
    return this._removeFeatureOfACurrentRound(featureObj, this._activatedFeaturesInCurrentRound);
  }

  removeDeactivatedFeatureInCurrentRound(featureObj) {
    return this._removeFeatureOfACurrentRound(featureObj, this._deactivatedFeaturesInCurrentRound);
  }

  _activate(featureObj) {
    let featureKey = featureObj.keyForActivation();
    let featureCounter = this._activeFeatures.get(featureKey);
    if (featureCounter === undefined) {
      featureCounter = new EntityCounter(featureObj);
      this._activeFeatures.set(featureKey, featureCounter);
    }
    featureCounter.activate();
    return featureCounter;
  }

  _deactivate(featureObj) {
    let featureKey = featureObj.keyForActivation();
    let featureCounter = this._activeFeatures.get(featureKey);
    let cloneFeatureCounter = cloneDeep(featureCounter);
    featureCounter.deactivate();
    if (featureCounter.isDeactivated()) {
      this._activeFeatures.delete(featureKey);
    }
    return cloneFeatureCounter;
  }

  _removeFeatureOfACurrentRound(featureObj, list) {
    let featureObjToReturn = list.get(featureObj.keyForSelection());
    list.delete(featureObjToReturn.keyForSelection());
    return featureObjToReturn;
  }

}