class UIInheritanceEdge extends UIEdge {

  constructor(from, to) {
    super(from.id, to.id);
    this._type = TYPE_INHERITANCE_EDGE;
    this._label = LABEL_INHERITANCE_EDGE;
  }

  generateEdgeId() {
    return this._from + '-i->' + this._to;
  }

  is_dashed() {
    return false;
  }

}