function playAMessage() {
  let message = messages.shift();
  if (message === undefined) {
    console.log("No message from the architecture.");
    return;
  } else {
    playedMessages.push(message);
  }

  enableBackStep();

  if (message.error) {
    addErrorMessageToConsole(message.message);
  } else {
    execFunctionByName('play', message.component, message);
  }
}

function playOppositeMessage() {
  let message = playedMessages.pop();
  if (message === undefined) {
    return;
  }

  if (playedMessages.length === 0) {
    disableBackStep();
  }

  removeLastInfo();

  execFunctionByName('playOpposite', message.component, message);
  messages.unshift(message);
}

function playMessageFromContextActivation(message) {
  displayInfoFromContextActivation(message.action, message.contexts);

  for (let context of message.contexts) {
    let contextCounter = undefined;
    if (message.action === ACTIVATE_KEYWORD) {
      contextCounter = activeContexts.activate(context);
      uiModel.activateContext(contextCounter);
    } else if (message.action === DEACTIVATE_KEYWORD) {
      contextCounter = activeContexts.deactivate(context);
      uiModel.deactivateContext(contextCounter);
    }
  }
}

function playOppositeMessageFromContextActivation(message) {
  for (let context of message.contexts) {
    let contextCounter = undefined;
    if (message.action === ACTIVATE_KEYWORD) {
      contextCounter = activeContexts.disableActivation(context);
      uiModel.removeContext(contextCounter);
    } else if (message.action === DEACTIVATE_KEYWORD) {
      contextCounter = activeContexts.enableActivation(context);
      uiModel.enableContextActivation(contextCounter);
    }
  }
}

function playMessageFromFeatureSelection(message) {
  displayInfoFromFeatureSelection(message.action, message.selected_mapping);

  if (message.action === SELECTION_KEYWORD) {
    let selectionOfFeatures = selectedFeatures.addSelection(message.selected_mapping);
    uiModel.showSelection(selectionOfFeatures);
  } else if (message.action === UNSELECTION_KEYWORD) {
    let unselectionOfFeatures = selectedFeatures.addUnselection(message.selected_mapping);
    for (let featureObj of unselectionOfFeatures) {
      activeContexts.removeDeactivatedContextsInCurrentRound(featureObj.contextsCounters);
      uiModel.showUnselectionByFeature(activeFeatures.getFeatureCounter(featureObj));
    }
  }
}

function playOppositeMessageFromFeatureSelection(message) {
  if (message.action === SELECTION_KEYWORD) {
    let selectionOfFeatures = selectedFeatures.removeSelection(message.selected_mapping);
    uiModel.removeSelection(selectionOfFeatures);
  } else if (message.action === UNSELECTION_KEYWORD) {
    let unselectionOfFeatures = selectedFeatures.removeUnselection(message.selected_mapping);
    for (let featureObj of unselectionOfFeatures) {
      activeContexts.restoreDeactivatedContextsInCurrentRound(featureObj.contextsCounters);
      uiModel.removeUnselectionByFeature(activeFeatures.getFeatureCounter(featureObj));
    }
  }
}

function playMessageFromFeatureActivation(message) {
  displayInfoFromFeatureActivation(message.actions_on_features);

  for (let actionOnFeature of message.actions_on_features) {
    let featureObj = new Feature(actionOnFeature.feature, actionOnFeature.targetedClass);
    let featureCounter = undefined;
    if (actionOnFeature.action === ACTIVATE_KEYWORD) {
      let selectedFeature = selectedFeatures.removeSelectedFeatureFromFeatureActivation(featureObj);
      if (selectedFeature) {
        featureObj = selectedFeature;
      }
      featureObj.methods = actionOnFeature.methods;
      featureCounter = activeFeatures.activate(featureObj);
      uiModel.removeSelectionByFeature(featureObj);
      uiModel.activateFeature(featureCounter);
    } else if(actionOnFeature.action === DEACTIVATE_KEYWORD) {
      let unselectedFeature = selectedFeatures.removeUnselectedFeatureFromFeatureActivation(featureObj);
      if (unselectedFeature) {
        featureObj = unselectedFeature;
      }
      featureObj.methods = actionOnFeature.methods;
      featureCounter = activeFeatures.deactivate(featureObj);
      uiModel.deactivateFeature(featureCounter);
    }
  }
}

function playOppositeMessageFromFeatureActivation(message) {
  for (let actionOnFeature of message.actions_on_features) {
    let featureObj = new Feature(actionOnFeature.feature, actionOnFeature.targetedClass);
    let featureCounter = undefined;
    if (actionOnFeature.action === ACTIVATE_KEYWORD) {
      featureCounter = activeFeatures.disableActivation(featureObj);
      selectedFeatures.restoreSelection(featureCounter.entityObj);
      uiModel.removeFeature(featureCounter);
    } else if(actionOnFeature.action === DEACTIVATE_KEYWORD) {
      let featureCounter = activeFeatures.enableActivation(featureObj);
      selectedFeatures.restoreUnselection(featureCounter.entityObj);
      uiModel.disableDeactivation(featureCounter);
    }
  }
}

function playMessageFromFeatureExecution(message) {
  displayInfoFromFeatureExecution(message.action, message.feature, message.classname);

  let featureObj = new Feature(message.feature, message.classname);
  let alteredClass = undefined;
  if (message.action === ACTIVATE_KEYWORD) {
    featureObj = activeFeatures.removeActivatedFeatureInCurrentRound(featureObj);
    alteredClass = system.addAlteration(featureObj, message.superclass);
    system.addAnAddedFeature(featureObj);
    uiModel.showAlteration(alteredClass);
  } else if (message.action === DEACTIVATE_KEYWORD) {
    featureObj = activeFeatures.removeDeactivatedFeatureInCurrentRound(featureObj);
    alteredClass = system.removeAlteration(featureObj);
    system.addARemovedFeature(featureObj);
    system.removeAnAddedFeature(featureObj);
    uiModel.removeAlteration(alteredClass, featureObj);
  }
}

function playOppositeMessageFromFeatureExecution(message) {
  let featureObj = new Feature(message.feature, message.classname);
  if (message.action === ACTIVATE_KEYWORD) {
    featureObj = system.removeAnAddedFeature(featureObj);
    system.resetActivationOfAlteration(featureObj);
    activeFeatures.restoreActivatedFeatureInCurrentRound(featureObj);
    uiModel.removeAnAdaptation(activeFeatures.getFeatureCounter(featureObj));
  } else if (message.action === DEACTIVATE_KEYWORD) {
    featureObj = system.removeARemovedFeature(featureObj);
    system.addAnAddedFeature(featureObj);
    system.resetDeactivationOfAlteration(featureObj, message.superclass);
    activeFeatures.restoreDeactivatedFeatureInCurrentRound(featureObj);
    let featureCounter = activeFeatures.getFeatureCounter(featureObj);
    if (featureCounter === undefined) {
      featureCounter = new EntityCounter(featureObj);
    } else {
      featureCounter = cloneDeep(featureCounter);
    }
    featureCounter.activate();
    let targetAdaptationObj = system.getTargetOfAdaptation(featureObj);
    uiModel.disableUnadaptation(featureCounter, targetAdaptationObj);
  }
}