var oneSecond = 1000;
var interval = undefined;


$(document).ready(function () {
    $('#colorSkins').on('change', function () {
        updateColor($('input[name=skins]:checked', '#colorSkins').val());
    });

    $('#step-by-step-mode').bootstrapToggle('off');

    createInterval(oneSecond * $("#time").val());

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

    $('#next-step').click(playMessage);

    $('#time').change('input', function() {
        var time = $(this).val();
        if (Math.floor(time) == time && $.isNumeric(time)) {
          createInterval(oneSecond * time)
        } else {
          alert('Please enter an integer for the time.');
        }
    });
});


// function that will handle the change of color in the graph
function updateColor(type) {
  switch (type) {
      case "standard":
          ACTIVE = "#6B8E23";
          INACTIVE = "#FF6347";
          BACKGROUND = "lightblue";
          STROKE = "white";
          SELECTED = "#f4cd41";
          NOTSELECTED = "blue";
          break;
      case "black-and-white":
          ACTIVE = "#708090";
          INACTIVE = "#f2f1ef";
          BACKGROUND = "rgba(128,128,128,0.33)";
          STROKE = "black";
          SELECTED = "#424344";
          NOTSELECTED = "#a8a8a8";
          break;
  }

  myCheckboxes.startTransaction('updateColor');
  myCheckboxes.model.setDataProperty(myCheckboxes.findNodeForKey("filters").data, "color", BACKGROUND);
  myCheckboxes.model.setDataProperty(myCheckboxes.findNodeForKey("views").data, "color", BACKGROUND);

  myDiagram.model.nodeDataArray.forEach(function (element) {
      if (!element.isGroup) {
          if (element.active) {
              myDiagram.model.setDataProperty(element, "color", ACTIVE);
          }
          else {
              myDiagram.model.setDataProperty(element, "color", INACTIVE);
          }
          myDiagram.model.setDataProperty(element, "strokeColor", STROKE);
          myDiagram.model.setDataProperty(element, "selection", SELECTED);
      }
  });
  myDiagram.model.linkDataArray.forEach(function (element){
        if (element.category == "ContextFeature" || element.category == "FeatureCode" || element.category == "Dependency") {
            myDiagram.model.setDataProperty(element, "colorSelected", SELECTED);
            myDiagram.model.setDataProperty(element, "color", NOTSELECTED);    

            if(myDiagram.findLinkForData(element).isSelected){
                myDiagram.model.setDataProperty(element, "colorLabel", SELECTED);
            }
            else{
                myDiagram.model.setDataProperty(element, "colorLabel", NOTSELECTED);
            }
        }
  });
  //Update the color of the selected adornment 
  // TODO Is there an alternative to this solution?
  var selected = myDiagram.selection.toArray();
  selected.forEach(function(element){
    element.isSelected = false;
    element.isSelected = true;
  })
  myCheckboxes.commitTransaction('updateColor');
}


function createInterval(time) {
    if(interval !== undefined) {
      clearInterval(interval);
    }
    interval = setInterval(playMessage, time);
}

