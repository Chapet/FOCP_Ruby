class UIActivationEdge extends UIEdge {

  constructor(from, to) {
    super(new UIActiveContextNode(from).id, new UIActiveFeatureNode(to).id);
    this._type = TYPE_ACTIVATION_EDGE;
    this._label = LABEL_ACTIVATION_EDGE;
  }

  generateEdgeId() {
    return this._from + '-a->' + this._to;
  }

}