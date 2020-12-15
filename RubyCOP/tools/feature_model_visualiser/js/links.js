/*
 * File that defined all the links
 */

// different link template to represent the relation between nodes 
// for the context and feature model
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

myDiagram.linkTemplateMap.add("Alternative",
    maker(go.Link,
        maker(go.Shape),  // the "to" end arrowhead
        maker(go.Shape,   // the "from" end arrowhead
            { fromArrow: "BackwardTriangle", fill: "white", scale: 2 })
    ));

myDiagram.linkTemplateMap.add("Or",
    maker(go.Link,
        maker(go.Shape),  // the "to" end arrowhead
        maker(go.Shape,   // the "from" end arrowhead
            { fromArrow: "BackwardTriangle", fill: "black", scale: 2 })
    ));

// Link template for a dependency in the same graph
// for the context and feature model
myDiagram.linkTemplateMap.add("Dependency", linkConfig(-50));

    function linkConfig(degree){
        return maker(go.Link, go.Link.Bezier,
        { isLayoutPositioned: false, isTreeLink: false, curviness: degree },
        { relinkableFrom: true, relinkableTo: true, visible: false,
            selectionAdornmentTemplate:
            maker(go.Adornment,
              maker(go.Shape,
                { isPanelMain: true, stroke: SELECTED, strokeWidth: 4 },
                new go.Binding("stroke", "colorSelected")),
              maker(go.Shape,
                { toArrow: "Standard", fill: SELECTED, stroke: null, scale: 2.5 },
                new go.Binding("fill", "colorSelected"))
            )  },
        new go.Binding("visible", "visible"), // Binding that allow the filter of dependencies
        maker(go.Shape,
            { stroke: NOTSELECTED, strokeWidth: 2 },
            new go.Binding("stroke", "color")),
        maker(go.Shape,
            { toArrow: "OpenTriangle", stroke: NOTSELECTED, strokeWidth: 2 },
            new go.Binding("stroke", "color"),),
        maker(go.TextBlock, "left",
            new go.Binding("visible", "label"),
            new go.Binding("text", "text"),
            {
                font: "16px sans-serif",
                stroke: NOTSELECTED, background: "#DAE4E4",
                maxSize: new go.Size(100, NaN),
                segmentOffset: new go.Point(0, 10)
            },
            new go.Binding("stroke", "isSelected", function(sel) { return sel ? SELECTED : NOTSELECTED; }).ofObject(),
            new go.Binding("stroke", "colorLabel"),
            ));
        }

// Link template for a dependency between the context graph and the feature graph
myDiagram.linkTemplateMap.add("ContextFeature", linkConfig(-100));

// Link template for a dependency between a feature and a class (in the class diagram)
myDiagram.linkTemplateMap.add("FeatureCode", linkConfig(-100));



//Link for the class diagram

// adding different link template
myDiagram.linkTemplateMap.add("UML",
    maker(go.Link,
        { routing: go.Link.Orthogonal },
        new go.Binding("isLayoutPositioned", "relationship", convertIsTreeLink),
        maker(go.Shape),
        maker(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("fromArrow", "relationship", convertFromArrow)),
        maker(go.Shape, { scale: 1.3, fill: "white" },
            new go.Binding("toArrow", "relationship", convertToArrow))
    )
);

myDiagram.linkTemplateMap.add("Entity",
    maker(go.Link,  // the whole link panel
        {
            selectionAdorned: true,
            layerName: "Foreground",
            reshapable: true,
            routing: go.Link.AvoidsNodes,
            corner: 5,
            curve: go.Link.JumpOver
        },
        maker(go.Shape,  // the link shape
            { stroke: "#303B45", strokeWidth: 2.5 }),
        maker(go.TextBlock,  // the "from" label
            {
                textAlign: "center",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: 0,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text", "text")),
        maker(go.TextBlock,  // the "to" label
            {
                textAlign: "center",
                font: "bold 14px sans-serif",
                stroke: "#1967B3",
                segmentIndex: -1,
                segmentOffset: new go.Point(NaN, NaN),
                segmentOrientation: go.Link.OrientUpright
            },
            new go.Binding("text", "toText"))
    )
);

function convertIsTreeLink(r) {
    return r === "generalization";
}

function convertFromArrow(r) {
    switch (r) {
        case "generalization": return "";
        default: return "";
    }
}

function convertToArrow(r) {
    switch (r) {
        case "generalization": return "Triangle";
        case "aggregation": return "StretchedDiamond";
        default: return "";
    }
}