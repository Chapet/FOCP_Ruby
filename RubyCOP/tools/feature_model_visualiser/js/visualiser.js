var messages = [];
var interval = undefined;

function playMessage() {
    var message = messages.shift();
    if (message === undefined) {
      alert('No steps left')
      clearInterval(interval)
      return;
    }

    console.log(message)
  
    switch(message.action) {
      case 'activation':
        activateNodes(message.data);
        break;
      case 'deactivation':
        deactivateNodes(message.data);
        break;
    }
}