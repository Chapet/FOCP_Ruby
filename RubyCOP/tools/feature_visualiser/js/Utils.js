String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this)
            .replace(/(?:^|\s)\S/g, function(a) {
              return a.toUpperCase();
          });
};

function execFunctionByName(action, component, message) {
  let functionName = action + 'MessageFrom' + component;
  return window[functionName](message);
}