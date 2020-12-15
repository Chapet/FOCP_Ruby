/*
 * This file define the two diagrams that we are using
 * The first one myDiagram is the part that contains all the models
 * The second one myCheckboxes is the part with all the filters, views and skins
 */

// Different strings that represent a color
var ACTIVE = "#6B8E23"; //red
var INACTIVE = "#FF6347"; //green
var BACKGROUND = "lightblue";
var STROKE = "white";
var SELECTED = "#f4cd41"; //orange
var NOTSELECTED = "blue";

var height = Math.max($(document).height(), $(window).height())

var maker = go.GraphObject.make;
// linking the div to the diagram
var myDiagram = maker(go.Diagram, "myDiagramDiv", { initialScale: 0.6, padding: 50 });



// define a TreeLayout that flows from left to right
myDiagram.layout = maker(go.TreeLayout,  // the layout for the entire diagram
    {
        angle: 90,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        setsPortSpot: false,  // keep Spot.AllSides for link connection spot
        setsChildPortSpot: false, 
    }
);

myDiagram.div.style.height = (6 * (height-200)/10 ) + 'px'
// linking the div to the diagram
var myCheckboxes = maker(go.Diagram, "myCheckboxes",
    {
        initialScale: 0.6,
        initialContentAlignment: go.Spot.Center, // center the content
        allowVerticalScroll: false,  // remove the scrolling 
    }
);

myCheckboxes.toolManager.panningTool.isEnabled = false
myCheckboxes.div.style.height = (3 * (height-200)/10 ) + 'px'

// define a TreeLayout that flows from left to right 
myCheckboxes.layout = maker(go.TreeLayout,  // the layout for the entire diagram
    {
        angle: 90,
        arrangement: go.TreeLayout.ArrangementHorizontal,
    }
);

var model = myDiagram.model