class ActiveContexts {

  constructor() {
    this._activeContexts = new Map();
    this._deactivatedContextsInCurrentRound = new Map();
  }

  activate(context) {
    let contextObj = new Context(context);
    let contextKey = contextObj.key();
    let contextCounter = this._activeContexts.get(contextKey);
    if (contextCounter === undefined) {
      contextCounter = new EntityCounter(contextObj);
      this._activeContexts.set(contextKey, contextCounter);
    }
    contextCounter.activate();
    return contextCounter;
  }

  deactivate(context) {
    let contextObj = new Context(context);
    let contextKey = contextObj.key();
    let contextCounter = this._activeContexts.get(contextKey);
    let cloneContextCounter = cloneDeep(contextCounter);
    contextCounter.deactivate();
    if (contextCounter.isDeactivated()) {
      this._activeContexts.delete(contextKey);
    }
    this._deactivatedContextsInCurrentRound.set(contextKey, cloneContextCounter);
    return cloneContextCounter;
  }

  enableActivation(context) {
    let contextObj = new Context(context);
    let contextKey = contextObj.key();
    let contextCounter = this._deactivatedContextsInCurrentRound.get(contextKey);
    if (this._activeContexts.has(contextKey)) {
      this._activeContexts.get(contextKey).restoreActivationCounter(contextCounter);
    } else {
      this._activeContexts.set(contextKey, contextCounter);
    }
    this._deactivatedContextsInCurrentRound.delete(contextKey);
    return contextCounter;
  }

  disableActivation(context) {
    let contextObj = new Context(context);
    let contextKey = contextObj.key();
    let contextCounter = this._activeContexts.get(contextKey);
    let cloneContextCounter = cloneDeep(contextCounter);
    contextCounter.deactivate();
    if (contextCounter.isDeactivated()) {
      this._activeContexts.delete(contextKey);
    }
    return cloneContextCounter;
  }

  getACloneOfContextsFromSelection(contexts) {
    let contextCountersObjs = [];
    for (let context of contexts) {
      let contextObj = new Context(context);
      contextCountersObjs.push(cloneDeep(this._activeContexts.get(contextObj.key())));
    }
    return contextCountersObjs;
  }

  getACloneOfContextsFromUnselection(contexts) {
    let contextCountersObjs = [];
    for (let context of contexts) {
      let contextObj = new Context(context);
      let contextCounter = this._deactivatedContextsInCurrentRound.get(contextObj.key());
      if (contextCounter !== undefined) {
        contextCountersObjs.push(cloneDeep(contextCounter));
      } else {
        contextCountersObjs.push(cloneDeep(this._activeContexts.get(contextObj.key())));
      }
    }
    return contextCountersObjs;
  }

  restoreDeactivatedContextsInCurrentRound(contextsCounters) {
    for (let contextCounter of contextsCounters) {
      let contextKey = contextCounter.entityObj.key();
      if (!this._activeContexts.has(contextKey)
          || !this._activeContexts.get(contextKey).eqls(contextCounter)) {
        this._deactivatedContextsInCurrentRound.set(contextKey, contextCounter);
      }
    }
  }

  removeDeactivatedContextsInCurrentRound(contextsCounters) {
    for (let contextCounter of contextsCounters) {
      let contextKey = contextCounter.entityObj.key();
      if (this._deactivatedContextsInCurrentRound.has(contextKey)) {
        this._deactivatedContextsInCurrentRound.delete(contextKey);
      }
    }
  }
}