class UIDeactivationEdge extends UIEdge {

  constructor(from, to) {
    super(new UIActiveContextNode(from).id, new UIActiveFeatureNode(to).id);
    this._type = TYPE_ACTIVATION_EDGE;
    this._label = LABEL_DEACTIVATION_EDGE;
    this._color = COLOR_DEACTIVATION;
  }

  generateEdgeId() {
    return this._from + '-a->' + this._to;
  }

}