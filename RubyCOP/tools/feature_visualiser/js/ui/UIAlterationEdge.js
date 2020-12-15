class UIAlterationEdge extends UIEdge {

  constructor(from, to) {
    super(from.id, to.id);
    this._type = TYPE_ALTERATION_EDGE;
    this._label = LABEL_ADAPTATION_EDGE;
  }

  generateEdgeId() {
    return this._from + '-al->' + this._to;
  }

}