class EntityCounter {

  constructor(entityObj, activationCounter = 0) {
    this._entityObj = entityObj;
    this._activationCounter = activationCounter;
  }

  get entityObj() {
    return this._entityObj;
  }

  get activationCounter() {
    return this._activationCounter;
  }

  keyCounter() {
    return this._entityObj.name + '(' + this._activationCounter + ')';
  }

  eqls(entityCounter) {
    return this.keyCounter() === entityCounter.keyCounter();
  }

  isDeactivated() {
    return this._activationCounter <= 0;
  }

  activate() {
    this._activationCounter += 1;
  }

  deactivate() {
    if (this._activationCounter > 0) {
      this._activationCounter -= 1;
    }
  }

  restoreActivationCounter(contextCounter) {
    this._activationCounter = contextCounter.activationCounter;
  }

}