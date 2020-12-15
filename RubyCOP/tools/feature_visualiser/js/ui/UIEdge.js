class UIEdge {

  constructor(from, to) {
    this._color = undefined;
    this._from = from;
    this._to = to;
    this._id = this.generateEdgeId();
  }

  get id() {
    return this._id;
  }

  defineLocationLabelOnEdge() {
    return 'horizontal';
  }

  is_dashed() {
    return true;
  }

  build() {
    return {
      id: this._id,
      color: {
        color: this._color,
      },
      label: this._label,
      font: {
        align: this.defineLocationLabelOnEdge(),
      },
      from: this._from,
      to: this._to,
      arrows: {
        to: {
          enabled: true,
          type: this._type
        }
      },
      dashes: this.is_dashed()
    };
  }

}