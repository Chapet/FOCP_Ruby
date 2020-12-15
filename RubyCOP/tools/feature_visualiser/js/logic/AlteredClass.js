class AlteredClass {

  constructor(classname, superclass) {
    this._classname = classname;
    this._superclass = superclass;
    this._activatedFeatures = new IndexedActivatedFeatures();
    this._alterations = new Map();
  }

  get classname() {
    return this._classname;
  }

  get superclass() {
    return this._superclass;
  }

  getBehaviours() {
    let deployedBehaviours = new Map();
    for (let method of this._alterations.keys()) {
      let concernedFeatures = this._alterations.get(method);
      deployedBehaviours.set(method, concernedFeatures[concernedFeatures.length - 1]);
    }
    return deployedBehaviours;
  }

  isEmpty() {
    return this._activatedFeatures.isEmpty();
  }

  addAlteration(featureObj) {
    this._activatedFeatures.addActivatedFeature(featureObj);
    this._addFeatureForEachMethod(this._alterations, featureObj);
  }

  resetActivationOfAlteration(featureObj) {
    this._activatedFeatures.resetDeactivatedFeature(featureObj);
    this._resetBehaviour();
  }

  resetDeactivationOfAlteration(featureObj) {
    this._activatedFeatures.resetActivatedFeature(featureObj);
    this._resetBehaviour();
  }

  removeAlteration(featureObj) {
    this._activatedFeatures.addDeactivatedFeature(featureObj);

    for (let method of featureObj.methods) {
      let indexOfLastActivatedFeature = this._alterations.get(method).lastIndexOf(featureObj.name);
      this._alterations.get(method).splice(indexOfLastActivatedFeature, 1);
      if (this._alterations.get(method).length === 0) {
        this._alterations.delete(method);
      }
    }

    return featureObj;
  }

  _addFeatureForEachMethod(map, featureObj) {
    for (let method of featureObj.methods) {
      if (map.has(method)) {
        map.get(method).push(featureObj.name);
      } else {
        map.set(method, [featureObj.name]);
      }
    }
  }

  _resetBehaviour() {
    let realActivatedFeatures = this._activatedFeatures.getOrderedRealActivatedFeatures();
    let newAlterations = new Map();
    for (let activatedFeature of realActivatedFeatures) {
      this._addFeatureForEachMethod(newAlterations, activatedFeature);
    }
    this._alterations = newAlterations;
  }

  getFromTo() {
    let fromTo = {};
    let realActivatedFeatures = this._activatedFeatures.getOrderedRealActivatedFeatures();
    if (realActivatedFeatures.length === 1) {
      fromTo['from'] = realActivatedFeatures[0];
      fromTo['to'] = this;
    } else {
      fromTo['from'] = realActivatedFeatures[realActivatedFeatures.length - 1];
      fromTo['to'] = realActivatedFeatures[realActivatedFeatures.length - 2];
    }
    return fromTo;
  }

  getTargetOfAdaptation(featureObj) {
    return this._activatedFeatures.getTargetedFeatureOfAdaptation(featureObj);
  }

}