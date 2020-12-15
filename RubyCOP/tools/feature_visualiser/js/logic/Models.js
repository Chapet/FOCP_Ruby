/* MODELS */
let messages = undefined;

let playedMessages = undefined;

let activeContexts = undefined;

let selectedFeatures = undefined;

let activeFeatures = undefined;

let system = undefined;

function initModels() {
  messages = [];
  playedMessages = [];
  activeContexts = new ActiveContexts();
  selectedFeatures = new SelectedFeatures();
  activeFeatures = new ActiveFeatures();
  system = new System();
}

initModels();