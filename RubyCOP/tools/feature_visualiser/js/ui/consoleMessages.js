function addErrorMessageToConsole(message) {
  $(document).ready(function() {
    $("#console > ul").append('<li class="error"><b>></b> ' + message + ' !</li>');
    $("#console > ul .error").last().css('color', 'red');
    $('#console').scrollTop($("#console")[0].scrollHeight);
    let consoleWidget = $('#console-widget');
    consoleWidget.removeClass('panel-primary');
    consoleWidget.addClass('panel-danger');
    consoleWidget.fadeOut(500).fadeIn(500);
  });
}

function addMessageToConsole(message) {
  $(document).ready(function() {
    $("#console > ul").append('<li><b>></b> ' + message + '</li>');
    $("#console").scrollTop($("#console")[0].scrollHeight);
  });
}

function displayInfoFromContextActivation(action, contexts) {
  let message = '(De)activation(s) of the following context(s):';
  message += '<ul>';
  for (let context of contexts) {
    message += '<li>';
    message += '- ';
    message += WORDS_DICT[action].capitalize();
    message += ' of the context ';
    message += '<em>' + context.capitalize() + '</em>';
    message += '</li>';
  }
  message += '</ul>';
  addMessageToConsole(message);
}

function displayInfoFromFeatureSelection(action, selectedMapping) {
  let message = action.capitalize() + " of the following rule";
  if (selectedMapping.length > 1) {
    message += 's';
  }
  message += ' (<em>contexts</em> implies <em>features</em>): ';
  message += '<ul>';
  for (let mappingRule of selectedMapping) {
    message += '<li>';
    message += '- [';
    message += mappingRule.contexts.map(context => '<em>' + context + '</em>');
    message += '] implies [';
    message += mappingRule.features.map(feature => '<em>' + feature.feature + '</em>');
    message += ']';
    message += '</li>'
  }
  message += '</ul>';
  addMessageToConsole(message);
}

function displayInfoFromFeatureActivation(actions_on_features) {
  let message = '(De)activation(s) of the following feature(s):';
  message += '<ul>';
  for (let action_on_feature of actions_on_features) {
    message += '<li>';
    message += '- ';
    message += WORDS_DICT[action_on_feature.action].capitalize();
    message += ' of the feature ';
    message += '<em>' + action_on_feature.feature.capitalize() + '</em>';
    message += '</li>';
  }
  message += '</ul>';
  addMessageToConsole(message);
}

function displayInfoFromFeatureExecution(action, feature, targetedClass) {
  let message = WORDS_DICT[action].capitalize()
                + ' of the feature '
                + '<em>' + feature.capitalize() + '</em>'
                + ' in the class ' 
                + '<em>' + targetedClass.capitalize() + '</em> ';
  addMessageToConsole(message);
}

function removeLastInfo() {
  $(document).ready(function() {
    $("#console > ul > li:last-child").remove();
  });
}