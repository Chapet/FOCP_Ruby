/* CONSTANTS */

const ACTIVATE_KEYWORD = 'activate';
const DEACTIVATE_KEYWORD = 'deactivate';
const SELECTION_KEYWORD = 'selection';
const UNSELECTION_KEYWORD = 'unselection';

const REVERSE_ACTIONS = {
  'activate': 'deactivate',
  'deactivate': 'activate',
  'selection': 'unselection',
  'unselection': 'selection'
};

var WORDS_DICT = {
  'activate': 'activation',
  'deactivate': 'deactivation'
};

COLOR_DEACTIVATION = '#bbbbbb';
COLOR_ACTIVE_CONTEXTS = '#f1c40f';
COLOR_SELECTED_FEATURES = '#009277';
COLOR_ACTIVE_FEATURES = '#00687b';
COLOR_CLASSES = '#2c3e50';

FONT_COLOR_WHITE = '#ffffff';
FONT_COLOR_BLACK = '#000000';

TYPE_ACTIVATION_EDGE = 'circle';
TYPE_SELECTION_EDGE = 'arrow';
TYPE_ALTERATION_EDGE = 'arrow';
TYPE_INHERITANCE_EDGE = 'arrow';

LABEL_ACTIVATION_EDGE = 'activates';
LABEL_DEACTIVATION_EDGE = 'deactivates';
LABEL_SELECTION_EDGE = 'selects';
LABEL_ADAPTATION_EDGE = 'adapts';
LABEL_INHERITANCE_EDGE = 'inherits';
LABEL_UNADAPTATION_EDGE = 'unadapts';