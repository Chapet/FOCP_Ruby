let oneSecond = 1000;
let interval = undefined;

$(document).ready(function() {
  $('#contexts').bootstrapToggle('on');
  $('#step-by-step-mode').bootstrapToggle('off');
  $('#details').bootstrapToggle('off');

  createInterval(oneSecond * $("#time").val());

  $('#contexts').change(function() {
    showActiveContexts = $(this).prop('checked');
    if ($(this).prop('checked')) {
      uiModel.showContexts();
    } else {
      uiModel.hideContexts();
    }
  });

  $('#details').change(function() {
    if ($(this).prop('checked')) {
      uiModel.showDetails();
    } else {
      uiModel.hideDetails();
    }
  });

  $("#step-by-step-mode").change(function() {
    if ($(this).prop('checked')) {
      $("#next-step").prop("disabled", false);
      $("#time").prop("disabled", true);
      clearInterval(interval);
    } else {
      $("#next-step").prop("disabled", true);
      $("#time").prop("disabled", false);
      createInterval(oneSecond * $('#time').val());
    }
  });

  $('#next-step').click(playAMessage);

  $('#back-step').click(playOppositeMessage);

  $('#time').change('input', function() {
    let time = $(this).val();
    if (Math.floor(time) == time && $.isNumeric(time)) {
      createInterval(oneSecond * time)
    } else {
      alert('Please enter an integer for the time.');
    }
  });

  $('#reset').click(function() {
    initAllData();
  });
});

function createInterval(time) {
  if(interval !== undefined) {
    clearInterval(interval);
  }
  interval = setInterval(playAMessage, time);
}

function enableBackStep() {
  $("#back-step").prop("disabled", false);
}

function disableBackStep() {
  $("#back-step").prop("disabled", true);
}