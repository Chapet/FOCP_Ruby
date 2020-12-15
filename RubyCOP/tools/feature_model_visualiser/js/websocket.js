var ws = new WebSocket("ws://localhost:9999");

ws.onmessage = function (e) {
  var node = JSON.parse(e.data);

  if (jQuery.isEmptyObject(node.data)) {
    return;
  }
  var data = node.data;
  switch (node.action) {
    case "entity_node":
      newNode(data.name, data.type, data.counter, data.methods, data.classes)
      return
    case "relations":
      newRelationsNode(data.origin, data.destinations, data.type, data.isConstraint, data.group)
      return
    case "mapping":
      mapping(data)
      return
    case "activation":
      messages.push(node);
      return
    case "deactivation":
      messages.push(node);
      return
    
  }
};

ws.onopen = function (e) {
  console.log("websocket open");
};

ws.onclose = function (e) {
  console.log("websocket close");
};