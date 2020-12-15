class UILegend {

  constructor() {
    this._options = this.defineOptions();
    this._nodes = new vis.DataSet({});
    this._edges = new vis.DataSet({});

    this.createLegend();

    this._network = new vis.Network(
      document.getElementById('legend'),
      {
        nodes: this._nodes,
        edges: this._edges
      },
      this._options
    );
  }

  defineOptions() {
    return {
      "nodes": {
        "shape": 'box',
        "margin": 5,
        "widthConstraint": 100,
        "heightConstraint": {
          "minimum": 20,
        }
      },
      "physics": {
        "enabled": false
      },
    };
  }

  createLegend() {
    let x = 0;
    let y = 0;
    let step = 100;

    let contextNodeLegend =
      this.createUINodes('Context', x - 2 * step, y, COLOR_ACTIVE_CONTEXTS, FONT_COLOR_BLACK);
    let selectedFeatureNodeLegend =
      this.createUINodes('Selected feature', x, y, COLOR_SELECTED_FEATURES);
    let activeFeatureNodeLegend =
      this.createUINodes('Active feature', x - 2 * step, y + step, COLOR_ACTIVE_FEATURES);
    let classNodeLegend =
      this.createUINodes('Class', x, y + step, COLOR_CLASSES);
    this._nodes.add(contextNodeLegend);
    this._nodes.add(selectedFeatureNodeLegend);
    this._nodes.add(activeFeatureNodeLegend);
    this._nodes.add(classNodeLegend);

    let inheritanceEdgeLegend =
      this.createUIEdges(classNodeLegend, classNodeLegend, LABEL_INHERITANCE_EDGE, TYPE_INHERITANCE_EDGE, false);
    let selectionContextEdgeLegend =
      this.createUIEdges(contextNodeLegend.id, selectedFeatureNodeLegend.id, LABEL_SELECTION_EDGE, TYPE_SELECTION_EDGE);
    let activationContextEdgeLegend =
      this.createUIEdges(contextNodeLegend.id, activeFeatureNodeLegend.id, LABEL_ACTIVATION_EDGE, TYPE_ACTIVATION_EDGE);
    let alterationClassEdgeLegend =
      this.createUIEdges(activeFeatureNodeLegend.id, classNodeLegend.id, LABEL_ADAPTATION_EDGE, TYPE_ALTERATION_EDGE);
    let alterationFeatureEdgeLegend =
      this.createUIEdges(activeFeatureNodeLegend.id, activeFeatureNodeLegend.id, LABEL_ADAPTATION_EDGE, TYPE_ALTERATION_EDGE);
    this._edges.add(inheritanceEdgeLegend);
    this._edges.add(selectionContextEdgeLegend);
    this._edges.add(activationContextEdgeLegend);
    this._edges.add(alterationClassEdgeLegend);
    this._edges.add(alterationFeatureEdgeLegend);
  }

  createUINodes(label, x, y, color, fontColor=FONT_COLOR_WHITE) {
    return {
      id: label,
      x: x,
      y: y,
      font: {
        color: fontColor,
        multi: 'html',
        size: 18
      },
      label: label,
      color: color,
      shape: 'box'
    };
  }

  createUIEdges(from, to, label, type, dash=true, locationLabel='horizontal') {
    return {
      id: from + '->' + to,
      label: label,
      font: {
        align: locationLabel,
      },
      from: from,
      to: to,
      arrows: {
        to: {
          enabled: true,
          type: type
        }
      },
      dashes: dash
    };
  }
}

const legend = new UILegend();