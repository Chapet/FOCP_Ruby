class UIUnalterationEdge extends UIEdge {

  constructor(from, to) {
    super(from.id, to.id);
    this._type = TYPE_ALTERATION_EDGE;
    this._label = LABEL_UNADAPTATION_EDGE;
    this._color = COLOR_DEACTIVATION;
  }

  generateEdgeId() {
    return this._from + '-al->' + this._to;
  }

}