let ws = new WebSocket("ws://localhost:8888");

ws.onmessage = function(e){
  messages.push(JSON.parse(e.data));
};

ws.onopen = function(e){
  console.log("websocket open");
};

ws.onclose = function(e) {
  console.log("websocket close");
};