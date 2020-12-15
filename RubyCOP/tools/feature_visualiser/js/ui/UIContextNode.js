class UIContextNode extends UINode {

  constructor(contextCounter) {
    super(contextCounter);
  }

  generateNodeId(contextCounter) {
    return contextCounter.keyCounter();
  }

  label(contextCounter) {
    return contextCounter.entityObj.name;
  }
}