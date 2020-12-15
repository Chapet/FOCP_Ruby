/*
 *  This section of the code contains the definition of code graph
 *  These definitions allow us to make a class diagram
 */


// the item template for properties which is nearly the same as
// methodproperty in context_feature_model.js
var propertyTemplate =
    maker(go.Panel, "Horizontal",
        // property visibility/access
        maker(go.TextBlock,
            { isMultiline: false, editable: false, width: 12 },
            new go.Binding("text", "visibility", convertVisibility)),
        // property name, underlined if scope=="class" to indicate static property
        maker(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "name").makeTwoWay(),
            new go.Binding("isUnderline", "scope", function (s) { return s[0] === 'c' })),
        // property type, if known
        maker(go.TextBlock, "",
            new go.Binding("text", "type", function (t) { return (t ? ": " : ""); })),
        maker(go.TextBlock,
            { isMultiline: false, editable: true },
            new go.Binding("text", "type").makeTwoWay()),
        // property default value, if any
        maker(go.TextBlock,
            { isMultiline: false, editable: false },
            new go.Binding("text", "default", function (s) { return s ? " = " + s : ""; }))
    );

//Node template for the class diagram
myDiagram.nodeTemplateMap.add("code",
    maker(go.Node, "Auto",
        new go.Binding("visible", "isVisible"),
        {
            // locationSpot: go.Spot.Center,
            // fromSpot: go.Spot.AllSides,
            // toSpot: go.Spot.AllSides,
            selectionAdornmentTemplate:
                maker(go.Adornment, "Auto",
                    maker(go.Shape, "RoundedRectangle",
                        { fill: null, stroke: SELECTED, strokeWidth: 6 },
                        new go.Binding("stroke", "selection")),
                    maker(go.Placeholder)
                ),  // end Adornment
            click: function (e, node) {
                onSelectionChanged(node, "Code");
            }
        },
        new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
        maker(go.Shape, { fill: INACTIVE },
            new go.Binding("fill", "color")),
        maker(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black", margin: 3 },
            // header
            maker(go.TextBlock,
                {
                    row: 0, columnSpan: 2, alignment: go.Spot.Center,
                    font: "bold 12pt sans-serif",
                    isMultiline: false, editable: true, stroke:STROKE
                },
                new go.Binding("text", "name").makeTwoWay(),
                new go.Binding("stroke", "strokeColor")),
            // properties
            maker(go.TextBlock, "Properties",
                { row: 1, margin: 5, font: "italic 10pt sans-serif", stroke:STROKE },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES"),
                new go.Binding("stroke", "strokeColor")),
            maker(go.Panel, "Vertical", { name: "PROPERTIES" },
                new go.Binding("itemArray", "properties"),
                {
                    row: 1, margin: 3, stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left, background: "lightyellow",
                    itemTemplate: propertyTemplate, visible: false
                }
            ),
            maker("PanelExpanderButton", "PROPERTIES",
                { row: 1, column: 1, margin: 2, alignment: go.Spot.TopRight, visible: false },
                new go.Binding("visible", "properties", function (arr) { return arr.length > 0; })),
            // methods
            maker(go.TextBlock, "Methods",
                { row: 2, margin: 5, font: "italic 10pt sans-serif", stroke:STROKE },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS"),
                new go.Binding("stroke", "strokeColor")),
            maker(go.Panel, "Vertical", { name: "METHODS" },
                new go.Binding("itemArray", "methods"),
                {
                    row: 2, margin: 3, stretch: go.GraphObject.Fill,
                    defaultAlignment: go.Spot.Left, background: "lightyellow",
                    itemTemplate: methodTemplate, visible: false
                }
            ),
            maker("PanelExpanderButton", "METHODS",
                { row: 2, column: 1, alignment: go.Spot.TopRight, visible: false },
                new go.Binding("visible", "methods", function (arr) { return arr.length > 0; }))
        )
    )
);

