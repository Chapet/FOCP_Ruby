/*
 * This file allow us to have a visualization that includes the 
 * context, feature model 
 * The feature model has his own node template because it needs to
 * have the possibility to put the methods that the features will impact
 * 
 */


// show visibility or access as a single character at the beginning of each property or method
function convertVisibility(v) {
    switch (v) {
        case "public": return "+";
        case "private": return "-";
        case "protected": return "#";
        case "package": return "~";
        default: return v;
    }
}

// the item template for methods
var methodTemplate =
    maker(go.Panel, "Horizontal",
        // method visibility/access
        maker(go.TextBlock,
            { isMultiline: false, editable: false, width: 12 },
            new go.Binding("text", "visibility", convertVisibility)),
        // method name, underlined if scope=="class" to indicate static method
        maker(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
        // method parameters
        maker(go.TextBlock, "()",
            // this does not permit adding/editing/removing of parameters via inplace edits
            new go.Binding("text", "parameters", function (parr) {
                var s = "(";
                for (var i = 0; i < parr.length; i++) {
                    var param = parr[i];
                    if (i > 0) s += ", ";
                    s += param.name + ": " + param.type;
                }
                return s + ")";
            })),
        // method return type, if any
        maker(go.TextBlock, "",
            new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
        maker(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "type").makeTwoWay())
    );

/*
 *  This section of the code contains the definition of everything necessary
 *  to draw the tree. It is the description of the model of a context/feature model
 * 
 */

// basic template for the node 
myDiagram.nodeTemplateMap.add("", //default category of nodes
    maker(go.Node, "Spot",
        {
            background: INACTIVE,
            selectionAdornmentTemplate:
                maker(go.Adornment, "Auto",
                    maker(go.Shape, "RoundedRectangle",
                        { fill: null, stroke: SELECTED, strokeWidth: 6 },
                        new go.Binding("stroke", "selection")),
                    maker(go.Placeholder)
                ),  // end Adornment
            //the click will allow the hightlighting of all connected nodes
            click: function (e, node) {
                onSelectionChanged(node, node.data.group);
            }
        },
        new go.Binding("background", "color"),
        new go.Binding("visible", "isVisible"),
        new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
        maker(go.TextBlock,
            { margin: 19, stroke: "white", font: "bold 16px sans-serif" },
            new go.Binding("stroke", "strokeColor"),
            new go.Binding("text", "name")),
        //adding the buttons defined in buttons.js
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 1, 0, 10) },
            maker("ExpandDirectChildButton"),
            maker("ExpandCollapseAllButton")),
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 0, 0, -10) },
            maker("ParentExpanderOneButton"),
            maker("ParentExpanderAllButton")),
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(1, 0, 10, -10) },
            maker("HideNode")),
    ));

//Nodes for feature model
myDiagram.nodeTemplateMap.add("Feature",
    maker(go.Node, "Spot",
        {
            background: INACTIVE,
            selectionAdornmentTemplate:
                maker(go.Adornment, "Auto",
                    maker(go.Shape, "RoundedRectangle",
                        { fill: null, stroke: SELECTED, strokeWidth: 6 },
                        new go.Binding("stroke", "selection")),
                    maker(go.Placeholder)
                ),  // end Adornment
            click: function (e, node) {
                onSelectionChanged(node, node.data.group);
            }
        },
        new go.Binding("background", "color"),
        new go.Binding("visible", "isVisible"),
        new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
        maker(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black", alignment: go.Spot.Center, margin: 10 },
            // header
            maker(go.TextBlock,
                {
                    row: 0, columnSpan: 2, alignment: go.Spot.Center,
                    margin: 5,
                    stroke: "white",
                    font: "bold 16px sans-serif",
                    isMultiline: false, editable: true
                },
                new go.Binding("stroke", "strokeColor"),
                new go.Binding("text", "name")),

            // methods part
            maker(go.TextBlock, "Methods",
                { row: 1, margin: 5, font: "italic 10pt sans-serif" },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS"),
                new go.Binding("stroke", "strokeColor")),
            maker(go.Panel, "Vertical", { name: "METHODS" },
                new go.Binding("itemArray", "methods"),
                {
                    row: 1, margin: 3, stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left, background: "lightyellow",
                    itemTemplate: methodTemplate, visible: false
                }
            ),
            maker("PanelExpanderButton", "METHODS",
                { row: 1, column: 1, alignment: go.Spot.TopRight, visible: false },
                new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
        ),
        //adding the buttons defined in buttons.js
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 1, 0, 10) },
            maker("ExpandDirectChildButton"),
            maker("ExpandCollapseAllButton")),
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 0, 0, -10) },
            maker("ParentExpanderOneButton"),
            maker("ParentExpanderAllButton")),
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(1, 0, 2, -10) },
            maker("HideNode")),
    )
);

// function that highlights all connected nodes of node
function onSelectionChanged(node, first) {
    if (node.isSelected) {
        switch (first) {
            case "Contexts":
                if (node.data.group == "Contexts" || node.data.group == "Features") {
                    searchLinksOutOfToHighlight(node, first);
                }
                break;
            case "Features":
                if (node.data.group == "Features") {
                    searchLinksIntoToHighlight(node, first);
                    searchLinksOutOfToHighlight(node, first);
                }
                break;
            case "Code":
                if (node.data.group == "Code" || node.data.group == "Features") {
                    searchLinksIntoToHighlight(node, first);
                }
                break;
        }
    }
}

function searchLinksOutOfToHighlight(node, first) {
    node.findLinksOutOf().each(function (l) {
        if ((l.data.category == "ContextFeature" || l.data.category == "FeatureCode" || l.data.category == "Dependency") && l.isVisible()) {
            l.isSelected = true;
            l.toNode.isSelected = true;
            onSelectionChanged(l.toNode, first);
        }
    });
}

function searchLinksIntoToHighlight(node, first) {
    node.findLinksInto().each(function (l) {
        if ((l.data.category == "ContextFeature" || l.data.category == "FeatureCode") && l.isVisible()) {
            l.isSelected = true;
            l.fromNode.isSelected = true;
            onSelectionChanged(l.fromNode, first);
        }
    });
}

// modify the default group template
myDiagram.groupTemplateMap.add("",
    maker(go.Group, "Auto",
        { // define the group's internal layout
            layout: maker(go.TreeLayout,
                { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false }),

        },

        maker(go.Shape, "Rectangle",
            { fill: null, stroke: "gray", strokeWidth: 2 }),
        maker(go.Panel, "Vertical",
            { defaultAlignment: go.Spot.Left, margin: 20 },
            maker(go.Panel, "Horizontal",
                { defaultAlignment: go.Spot.Top },
                // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                maker("SubGraphExpanderButton"),
                maker(go.TextBlock,
                    { font: "Bold 20px Sans-Serif", margin: 4 },
                    new go.Binding("text", "key"))
            ),
            // create a placeholder to represent the area where the contents of the group are
            maker(go.Placeholder,
                { padding: new go.Margin(0, 10) })
        )  // end Vertical Panel
    )
);

// modify the default group template
myDiagram.groupTemplateMap.add("code",
    maker(go.Group, "Auto",
        { // define the group's internal layout
            layout: maker(go.TreeLayout,
                {
                    angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false,
                    setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                    setsChildPortSpot: false,
                }),

        },

        maker(go.Shape, "Rectangle",
            { fill: null, stroke: "gray", strokeWidth: 2 }),
        maker(go.Panel, "Vertical",
            { defaultAlignment: go.Spot.Left, margin: 20 },
            maker(go.Panel, "Horizontal",
                { defaultAlignment: go.Spot.Top },
                // the SubGraphExpanderButton is a panel that functions as a button to expand or collapse the subGraph
                maker("SubGraphExpanderButton"),
                maker(go.TextBlock,
                    { font: "Bold 20px Sans-Serif", margin: 4 },
                    new go.Binding("text", "key"))
            ),
            // create a placeholder to represent the area where the contents of the group are
            maker(go.Placeholder,
                { padding: new go.Margin(0, 10) })
        )  // end Vertical Panel
    )
);


model.nodeDataArray =
    [
        { isGroup: true, key: "Contexts" },
        { isGroup: true, key: "Features" },
        { isGroup: true, key: "Code", category: "code" },
    ]




