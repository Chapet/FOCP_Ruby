class SelectedFeatures {

  constructor() {
    this._selection = new Map();
    this._unselection = new Map();
  }

  addSelection(mapping) {
    return this._addAMapping(mapping, this._selection, true);
  }

  addUnselection(mapping) {
    return this._addAMapping(mapping, this._unselection, false);
  }

  removeSelection(mapping) {
    return this._removeAMapping(mapping, this._selection);
  }

  removeUnselection(mapping) {
    return this._removeAMapping(mapping, this._unselection);
  }

  restoreSelection(featureObj) {
    this._selection.set(featureObj.keyForSelection(), cloneDeep(featureObj));
  }

  restoreUnselection(featureObj) {
    this._unselection.set(featureObj.keyForSelection(), cloneDeep(featureObj));
  }

  removeSelectedFeatureFromFeatureActivation(feature) {
    return this._removeAMappingFromFeatureActivation(feature, this._selection);
  }

  removeUnselectedFeatureFromFeatureActivation(feature) {
    return this._removeAMappingFromFeatureActivation(feature, this._unselection);
  }

  _addAMapping(mapping, list, isASelection) {
    let selectedFeatures = [];
    for (let rule of mapping) {
      for (let feature of rule.features) {
        let associatedContexts = undefined;
        if (isASelection) {
          associatedContexts = activeContexts.getACloneOfContextsFromSelection(rule.contexts);
        } else {
          associatedContexts = activeContexts.getACloneOfContextsFromUnselection(rule.contexts);
        }
        let featureObj = new Feature(feature.feature, feature.targeted_class, associatedContexts);
        list.set(featureObj.keyForSelection(), featureObj);
        selectedFeatures.push(featureObj);
      }
    }
    return selectedFeatures;
  }

  _removeAMapping(mapping, list) {
    let unselectedFeatures = [];
    for (let rule of mapping) {
      for (let feature of rule.features) {
        let featureObj = new Feature(feature.feature, feature.targeted_class);
        featureObj = list.get(featureObj.keyForSelection());
        list.delete(featureObj.keyForSelection());
        unselectedFeatures.push(featureObj);
      }
    }
    return unselectedFeatures;
  }

  _removeAMappingFromFeatureActivation(feature, list) {
    if (!list.has(feature.keyForSelection())) {
      return undefined;
    }

    let featureObj = list.get(feature.keyForSelection());
    list.delete(feature.keyForSelection());
    return featureObj;
  }
}