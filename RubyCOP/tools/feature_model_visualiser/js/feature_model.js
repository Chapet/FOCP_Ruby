/*
 * This file allow us to show a basic feature model 
 *
 */

var maker = go.GraphObject.make;
// linking the div to the diagram
var myDiagram = maker(go.Diagram, "myDiagramDiv", { padding: 50 });

// basic template for the node 
myDiagram.nodeTemplate =
  maker(go.Node,
    { background: "#44CCFF" },
    new go.Binding("background", "color"),
    maker(go.TextBlock,
      { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
      new go.Binding("text", "name"))
  );

// define a TreeLayout that flows from top to bottom
myDiagram.layout = maker(go.TreeLayout, { angle: 90, layerSpacing: 50 });

// adding different link template
myDiagram.linkTemplateMap.add("Mandatory",
  maker(go.Link,
    maker(go.Shape), // the "from" end arrowhead
    maker(go.Shape,   // the "to" end arrowhead
      { toArrow: "Circle", fill: "black", scale: 2 })
  ));

myDiagram.linkTemplateMap.add("Optional",
  maker(go.Link,
    maker(go.Shape), // the "from" end arrowhead
    maker(go.Shape,   // the "to" end arrowhead
      { toArrow: "Circle", fill: "white", scale: 2 })
  ));

myDiagram.linkTemplateMap.add("OR",
  maker(go.Link,
    maker(go.Shape),  // the "to" end arrowhead
    maker(go.Shape,   // the "from" end arrowhead
      { fromArrow: "BackwardTriangle", fill: "white", scale: 2 })
  ));

myDiagram.linkTemplateMap.add("XOR",
  maker(go.Link,
    maker(go.Shape),  // the "to" end arrowhead
    maker(go.Shape,   // the "from" end arrowhead
      { fromArrow: "BackwardTriangle", fill: "black", scale: 2 })
  ));

// Link template for a dependency in the same graph
myDiagram.linkTemplateMap.add("Dependency",
  maker(go.Link, go.Link.Bezier,
    { isLayoutPositioned: false, isTreeLink: false, curviness: -50 },
    { relinkableFrom: true, relinkableTo: true, opacity: 0.0 },
    new go.Binding("opacity", "visible"), // Binding that allow the filter of dependencies
    maker(go.Shape,
      { stroke: "green", strokeWidth: 2 }),
    maker(go.Shape,
      { toArrow: "OpenTriangle", stroke: "green", strokeWidth: 2 }),
    maker(go.TextBlock,
      new go.Binding("text", "text"),
      {
        stroke: "green", background: "rgba(255,255,255,0.75)",
        maxSize: new go.Size(80, NaN)
      })
  ));

// adding graph data  
var model = maker(go.GraphLinksModel);
model.nodeDataArray =
  [
    { key: "1", name: "Car", active: "true" },
    { key: "2", name: "Car body", active: "true" },
    { key: "3", name: "Transmission", active: "true" },
    { key: "4", name: "Engine", active: "true" },
    { key: "5", name: "Pulls trailer" },
    { key: "6", name: "Manual transmission" },
    { key: "7", name: "Automatic transmission", active: "true" },
    { key: "8", name: "Electric", active: "true" },
    { key: "9", name: "Gasoline", active: "true" }
  ];
model.linkDataArray =
  [
    { from: "1", to: "2", category: "Mandatory" },
    { from: "1", to: "3", category: "Mandatory" },
    { from: "1", to: "4", category: "Mandatory" },
    { from: "1", to: "5", category: "Optional" },
    { from: "3", to: "6", category: "XOR" },
    { from: "3", to: "7", category: "XOR" },
    { from: "4", to: "8", category: "OR" },
    { from: "4", to: "9", category: "OR" },
    { from: "7", to: "9", category: "Dependency" }
  ];
myDiagram.model = model;

// function allowing the filtering of activated features
function featureActivated(b) {
  var value = "#44CCFF";
  if (b) {
    value = "green";
  }
  model.nodeDataArray.forEach(function (element) {
    if (element.active == "true") {
      myDiagram.startTransaction('updateNode');
      myDiagram.model.setDataProperty(element, "color", value);
      myDiagram.commitTransaction('updateNode');
    }
  })
}

// function allowing the filtering of dependencies
function showDependency(b) {
  var value = 0.0;
  if (b) {
    value = 1.0;
  }
  model.linkDataArray.forEach(function (element) {
    if (element.category == "Dependency") {
      myDiagram.startTransaction('updateNode');
      myDiagram.model.setDataProperty(element, "visible", value);
      myDiagram.commitTransaction('updateNode');
    }
  })
}

//FILTERS Part

var myCheckboxes = maker(go.Diagram, "myCheckboxes",  // create a Diagram for the DIV HTML element
  {
    initialContentAlignment: go.Spot.Center, // center the content
    allowVerticalScroll: false  // remove the scrolling 
  });

myCheckboxes.nodeTemplate =
  maker(go.Node, "Auto",  // the Shape will go around the whole table
    maker(go.Shape, { strokeWidth: 0 },  // no border
      new go.Binding("fill", "color")),
    maker(go.Panel, "Table",
      { padding: 3, scale: 1.5 },
      maker(go.TextBlock,
        { row: 0, column: 0, columnSpan: 2 },
        { margin: 3, font: "bold 16px sans-serif" },  // some room around the bold text
        new go.Binding("text", "key")),
      maker(go.Panel, "Vertical",
        { row: 2, column: 0, defaultAlignment: go.Spot.Left },
        maker("CheckBox", "activated",
          maker(go.TextBlock, "activated"),
          { // _doClick is executed within a transaction by the CheckBoxButton click function
            "_doClick": function (e, obj) {
              featureActivated(obj.part.data.activated); // toggle the Part.movable flag
            }
          }
        ),
        maker("CheckBox", "dependencies",
          maker(go.TextBlock, "dependencies"),
          { // _doClick is executed within a transaction by the CheckBoxButton click function
            "_doClick": function (e, obj) {
              showDependency(obj.part.data.dependencies); // toggle the Part.movable flag
            }
          }
        )
      )
    )
  );

// create the model data that will be represented by Nodes and Links
myCheckboxes.model =
  maker(go.GraphLinksModel,
    {
      nodeDataArray:
        [
          {
            key: "Features Filters",
            color: "lightblue",
            activated: false,
            dependencies: false
          },
        ],
    }
  );
