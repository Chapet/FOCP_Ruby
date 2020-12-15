class UISelectionEdge extends UIEdge {

  constructor(from, to) {
    super(new UIActiveContextNode(from).id, new UISelectedFeatureNode(to).id);
    this._type = TYPE_SELECTION_EDGE;
    this._label = LABEL_SELECTION_EDGE;
  }

  generateEdgeId() {
    return this._from + '-s->' + this._to;
  }

}