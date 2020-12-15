/* UI MODELS */

class UIModel {

  constructor() {
    this._options = this.defineOptions();
    this._nodes = new vis.DataSet({});
    this._detailedNodes = new vis.DataSet({});
    this._edges = new vis.DataSet({});
    this._uiContexts = {};
    this._nodesToRemove = {};
    this._activeContextsShowed = true;

    this._network = new vis.Network(
      document.getElementById('visualization'),
      {
        nodes: this._nodes,
        edges: this._edges
      },
      this._options
    );
  }

  defineOptions() {
    return {
      // edges: {
      //   smooth: {
      //     type: 'continuous',
      //     roundness: 0
      //   }
      // },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD',
          levelSeparation: 100,
          sortMethod: 'directed'
        }
      },
      physics: {
        hierarchicalRepulsion: {
          nodeDistance: 250,
      //   hierarchicalRepulsion: {
      //     centralGravity: 0.0,
      //     springLength: 100,
      //     springConstant: 0.01,
      //     nodeDistance: 135,
      //     damping: 0.7
        }
      }
    };
  }

  activateContext(contextCounter) {
    let contextNode = new UIActiveContextNode(contextCounter);
    this._uiContexts[contextNode.id] = contextNode;

    if (this._activeContextsShowed) {
      if(!this._nodes.get(contextNode.id)) {
        this._nodes.add(contextNode.build());
        this._detailedNodes.add(contextNode.build());
      }
    }
  }

  deactivateContext(contextCounter) {
    let contextNode = new UIActiveContextNode(contextCounter);

    this._uiContexts[contextNode.id].color = COLOR_DEACTIVATION;
    this._nodesToRemove[contextCounter.entityObj.name] = contextNode.id;

    this._updateNode(contextNode.id, COLOR_DEACTIVATION, FONT_COLOR_BLACK);
  }

  removeContext(contextCounter) {
    let contextNode = new UIActiveContextNode(contextCounter);

    delete(this._uiContexts[contextNode.id]);

    if (this._nodes.get(contextNode.id)) {
      this._nodes.remove(contextNode.id);
      this._detailedNodes.remove(contextNode.id);
    }
  }

  enableContextActivation(contextCounter) {
    let contextNode = new UIActiveContextNode(contextCounter);
    this._updateNode(contextNode.id, COLOR_ACTIVE_CONTEXTS, contextNode.fontColor);
    for (let connectedEdge of this._getConnectedEdgesForEntity('from', contextNode.id)) {
      this._updateEdge(connectedEdge.id, contextNode.color, connectedEdge.label);
    }
  }

  showSelection(selectionOfFeatures) {
    for (let featureObj of selectionOfFeatures) {
      this._drawASelectedFeature(featureObj);
    }
  }

  showUnselectionByFeature(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    this._deactivateConnectedEdges(this._getConnectedEdgesForEntity('to', featureNodeId));
  }

  removeSelection(selectionOfFeatures) {
    for (let featureObj of selectionOfFeatures) {
      this.removeSelectionByFeature(featureObj);
    }
  }

  removeSelectionByFeature(featureObj) {
    let featureNode = new UISelectedFeatureNode(featureObj);
    if (this._nodes.get(featureNode.id)) {
      this._nodes.remove(featureNode.id);
      this._detailedNodes.remove(featureNode.id);
    }

    for (let contextCounter of featureObj.contextsCounters) {
      let selectionEdge = new UISelectionEdge(contextCounter, featureObj);
      if (this._edges.get(selectionEdge.id)) {
        this._edges.remove(selectionEdge.id);
      }
    }
  }

  removeUnselectionByFeature(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    this._reactivateConnectedEdges(this._getConnectedEdgesForEntity('to', featureNodeId));
  }

  activateFeature(featureCounter) {
    let featureObj = featureCounter.entityObj;
    let featureNode = new UIActiveFeatureNode(featureCounter);

    if(!this._nodes.get(featureNode.id)) {
      this._nodes.add(featureNode.build());
      this._detailedNodes.add(featureNode.detailsBehaviour(featureObj).build());
    }

    for (let contextCounter of featureObj.contextsCounters) {
      let activationEdge = new UIActivationEdge(contextCounter, featureCounter);
      if(!this._edges.get(activationEdge.id)) {
        this._edges.add(activationEdge.build());
      }
    }
  }

  deactivateFeature(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    this._nodesToRemove[featureCounter.entityObj.keyForActivation()] = featureNodeId;

    this._updateNode(featureNodeId, COLOR_DEACTIVATION, FONT_COLOR_BLACK);

    this._deactivateConnectedEdges(this._getConnectedEdgesForEntity('from', featureNodeId));
  }

  removeFeature(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    this._removeActiveFeatureNodes(featureNodeId);
    if (featureCounter.entityObj.contextsCounters.length !== 0) {
      this._drawASelectedFeature(featureCounter.entityObj);
    }

    this._rewriteBehaviourOfAlteredClass(featureCounter.entityObj.targetedClass);
  }

  disableDeactivation(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    this._updateNode(featureNodeId, COLOR_ACTIVE_FEATURES, FONT_COLOR_WHITE);

    for (let edgeFromFeature of this._getConnectedEdgesForEntity('from', featureNodeId)) {
      this._updateEdge(edgeFromFeature.id, COLOR_ACTIVE_FEATURES, LABEL_ADAPTATION_EDGE);
    }
  }

  showAlteration(alteredClass) {
    let classNode = new UIClassNode(alteredClass.classname);
    let fromTo = alteredClass.getFromTo();
    let fromNode = new UIActiveFeatureNode(activeFeatures.getFeatureCounter(fromTo['from']));
    let toNode = undefined;

    if (!this._nodes.get(classNode.id)) {
      this._nodes.add(classNode.build());
      this._detailedNodes.add(classNode.detailsBehaviour().build());
      this._addSuperClassNode(alteredClass);
    } else {
      this._detailedNodes.update(classNode.detailsBehaviour().build());
    }

    if (fromTo['to'] instanceof AlteredClass) {
      toNode = classNode;
    } else {
      toNode = new UIActiveFeatureNode(activeFeatures.getFeatureCounter(fromTo['to']));
    }

    let alterationEdge = new UIAlterationEdge(fromNode, toNode);
    if (!this._edges.get(alterationEdge.id)) {
      this._edges.add(alterationEdge.build());
    }
  }

  removeAlteration(alteredClass, featureObj) {
    let featureNodeId = this._nodesToRemove[featureObj.keyForActivation()];
    this._redrawAlterationEdge(featureNodeId);
    this._rewriteBehaviourOfAlteredClass(featureObj.targetedClass);

    for (let connectedEdgeId of this._network.getConnectedEdges(featureNodeId)) {
      this._edges.remove(connectedEdgeId);
    }

    let nodeToRemove = this._nodesToRemove[featureObj.keyForActivation()];
    this._nodes.remove(nodeToRemove);
    this._detailedNodes.remove(nodeToRemove);
    delete(this._nodesToRemove[featureObj.keyForActivation()]);

    this._clean_deactivated_contexts();
  }

  removeAnAdaptation(featureCounter) {
    let featureNodeId = new UIActiveFeatureNode(featureCounter).id;
    for(let edgeFrom of this._getConnectedEdgesForEntity('from', featureNodeId)) {
      if (this._edges.get(edgeFrom.id)) {
        this._edges.remove(edgeFrom.id);
      }
    }

    this._rewriteBehaviourOfAlteredClass(featureCounter.entityObj.targetedClass);
  }

  disableUnadaptation(featureCounter, targetAdaptationObj) {
    let targetAdaptationNode = this._createTargetAdaptationNode(targetAdaptationObj);
    this._restoreDeactivatedFeatureOfUnadaptation(featureCounter, targetAdaptationNode);
    this._rewriteBehaviourOfAlteredClass(featureCounter.entityObj.targetedClass);
    this._restoreContextsOfDeactivatedFeature(featureCounter);
  }

  showContexts() {
    this._activeContextsShowed = true;
    for(let uiContext of Object.values(this._uiContexts)) {
      this._nodes.add(uiContext.build());
      this._detailedNodes.add(uiContext.build());
    }
  }

  hideContexts() {
    this._activeContextsShowed = false;
    for(let uiContext of Object.values(this._uiContexts)) {
      this._nodes.remove(uiContext.id);
      this._detailedNodes.remove(uiContext.id);
    }
  }

  showDetails() {
    this._network.setData({
      nodes: this._detailedNodes,
      edges: this._edges
    });
  }

  hideDetails() {
    this._network.setData({
      nodes: this._nodes,
      edges: this._edges
    });
  }

  _deactivateConnectedEdges(connectedEdges) {
    for (let connectedEdge of connectedEdges) {
      let newLabel = LABEL_DEACTIVATION_EDGE;
      if (connectedEdge.label === LABEL_ADAPTATION_EDGE) {
        newLabel = LABEL_UNADAPTATION_EDGE;
      }
      this._updateEdge(connectedEdge.id, COLOR_DEACTIVATION, newLabel);
    }
  }

  _reactivateConnectedEdges(connectedEdges) {
    for (let connectedEdge of connectedEdges) {
      let newLabel = LABEL_ACTIVATION_EDGE;
      if (connectedEdge.label === LABEL_UNADAPTATION_EDGE) {
        newLabel = LABEL_ADAPTATION_EDGE;
      }
      let newColor = this._nodes.get(connectedEdge.from).color;
      this._updateEdge(connectedEdge.id, newColor, newLabel);
    }
  }

  _addSuperClassNode(alteredClass) {
    let superClassNode = new UIClassNode(alteredClass.superclass);

    if (!this._nodes.get(superClassNode.id)) {
      this._nodes.add(superClassNode.build());
      this._detailedNodes.add(superClassNode.build());
    }

    let baseClassNode = new UIClassNode(alteredClass.classname);
    let inheritanceEdge = new UIInheritanceEdge(baseClassNode, superClassNode);

    if (!this._edges.get(inheritanceEdge.id)) {
      this._edges.add(inheritanceEdge.build());
    }
  }

  _redrawAlterationEdge(featureNodeId) {
    let edgeToFeature = this._getConnectedEdgesForEntity('to', featureNodeId)[0];
    let from = this._nodes.get(edgeToFeature.from);

    let edgeFromFeature = this._getConnectedEdgesForEntity('from', featureNodeId)[0];
    let to = this._nodes.get(edgeFromFeature.to);

    this._edges.add((new UIAlterationEdge(from, to).build()));
  }

  _clean_deactivated_contexts() {
    for (let nodeToRemove of Object.values(this._nodesToRemove)) {
      if (!(nodeToRemove in this._uiContexts)) {
        return;
      }
    }

    for (let nodeToRemove of Object.values(this._nodesToRemove)) {
      for (let edgeTo of this._network.getConnectedEdges(nodeToRemove)) {
        this._edges.remove(edgeTo);
      }
      this._nodes.remove(nodeToRemove);
      this._detailedNodes.remove(nodeToRemove);
    }
    this._nodesToRemove = {};
  }

  _removeActiveFeatureNodes(featureNodeId) {
    for (let edgeToFeature of this._getConnectedEdgesForEntity('to', featureNodeId)) {
      if(this._edges.get(edgeToFeature.id)) {
        this._edges.remove(edgeToFeature.id);
      }
    }

    if (this._nodes.get(featureNodeId)) {
      this._nodes.remove(featureNodeId);
      this._detailedNodes.remove(featureNodeId);
    }
  }

  _drawASelectedFeature(featureObj) {
    let featureNode = new UISelectedFeatureNode(featureObj);
    if(!this._nodes.get(featureNode.id)) {
      this._nodes.add(featureNode.build());
      this._detailedNodes.add(featureNode.build());
    }

    for (let contextCounter of featureObj.contextsCounters) {
      let selectionEdge = new UISelectionEdge(contextCounter, featureObj);
      if(!this._edges.get(selectionEdge.id)) {
        this._edges.add(selectionEdge.build());
      }
    }
  }

  _getConnectedEdgesForEntity(direction, entityId) {
    return this._edges.get({
      filter: function(edge) {
        return edge[direction] == entityId;
      }
    });
  }

  _updateNode(nodeId, backgroundColor, fontColor) {
    if (this._nodes.get(nodeId)) {
      this._nodes.update({
        id: nodeId,
        color: backgroundColor,
        font: {
          color: fontColor
        }
      });
      this._detailedNodes.update({
        id: nodeId,
        color: backgroundColor,
        font: {
          color: fontColor
        }
      });
    }
  }

  _updateEdge(edgeId, color, label) {
    if (this._edges.get(edgeId)) {
      this._edges.update({
        id: edgeId,
        color: {
          color: color
        },
        label: label,
      });
    }
  }

  _createTargetAdaptationNode(targetAdaptationObj) {
    let targetAdaptationNode = undefined;
    if (targetAdaptationObj instanceof AlteredClass) {
      targetAdaptationNode = new UIClassNode(targetAdaptationObj.classname);
    } else {
      targetAdaptationNode = new UIActiveFeatureNode(activeFeatures.getFeatureCounter(targetAdaptationObj));
    }
    return targetAdaptationNode;
  }

  _restoreDeactivatedFeatureOfUnadaptation(featureCounter, targetAdaptationNode) {
    let oldAdaptationEdge = this._getConnectedEdgesForEntity('to', targetAdaptationNode.id)[0];
    this._edges.remove(oldAdaptationEdge.id);

    let previousNode = this._nodes.get(oldAdaptationEdge.from);
    let currentFeatureNode = new UIInactiveFeatureNode(featureCounter);
    if (!this._nodes.get(currentFeatureNode.id)) {
      this._nodes.add(currentFeatureNode.build());
      this._detailedNodes.add(currentFeatureNode.detailsBehaviour(featureCounter.entityObj).build());
    }
    this._nodesToRemove[featureCounter.entityObj.keyForActivation()] = currentFeatureNode.id;

    let previousToCurrentEdge = new UIUnalterationEdge(previousNode, currentFeatureNode);
    this._edges.add(previousToCurrentEdge.build());
    let currentToTargetEdge = new UIUnalterationEdge(currentFeatureNode, targetAdaptationNode);
    this._edges.add(currentToTargetEdge.build());
  }

  _restoreContextsOfDeactivatedFeature(featureCounter) {
    for (let contextCounter of featureCounter.entityObj.contextsCounters) {
      let contextNode = new UIInActiveContextNode(contextCounter);
      this._uiContexts[contextNode.id] = contextNode;

      if (this._activeContextsShowed) {
        if(!this._nodes.get(contextNode.id)) {
          this._nodes.add(contextNode.build());
          this._detailedNodes.add(contextNode.build());
          this._nodesToRemove[contextCounter.entityObj.name] = contextNode.id;
        }
      }

      let contextToFeatureEdge = new UIDeactivationEdge(contextCounter, featureCounter);
      if (!this._edges.get(contextToFeatureEdge.id)) {
        this._edges.add(contextToFeatureEdge.build());
      }
    }
  }

  _rewriteBehaviourOfAlteredClass(classname) {
    let builtClassNode = this._detailedNodes.get(classname);
    if (builtClassNode !== null) {
      let classNode = new UIClassNode(classname);
      classNode.detailsBehaviour()
      this._detailedNodes.update(classNode.detailsBehaviour().build());
    }
  }
}

let uiModel = new UIModel();