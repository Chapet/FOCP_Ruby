/*
 * This file allow us to have a visualization that includes the 
 * context, feature model and a class diagram  
 * 
 */


var maker = go.GraphObject.make;
// linking the div to the diagram
var myDiagram = maker(go.Diagram, "myDiagramDiv", { initialScale: 0.9, padding: 50 });

// define a new figure that is two triangles that overlap 
go.Shape.defineFigureGenerator("DoubleTriangleUp", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 2 * h / 3, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, 0.5 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 2 * h / 3));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 2 * h / 3));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0.25 * w, 2 * h / 3).close());
    return geo;
});

// define a new figure that is two triangles that overlap, its direction is downward
go.Shape.defineFigureGenerator("DoubleTriangleDown", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, h / 3));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h / 3));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0.5 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h / 3));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0.25 * w, h / 3).close());
    return geo;
});

/*
 *  This section of the code contains the definition of new buttons
 *  These buttons allow for each node to (un)hide parents or children
 * 
 */

go.GraphObject.defineBuilder("ExpandDirectChildButton", function (args) {
    var button = /** @type {Panel} */ (
        go.GraphObject.make("Button",
            go.GraphObject.make(go.Shape,  // the icon
                {
                    name: "ButtonIcon",
                    figure: "TriangleDown",
                    desiredSize: new go.Size(10, 10),
                    fill: "black" // default value for isExpanded is true
                },
            ),
            new go.Binding("visible", "",
                function (node) {
                    return (!node.data.isExpanded && !node.isTreeLeaf);
                }).ofObject())
    );

    // tree expand/collapse behavior
    button.click = function (e, button) {
        var node = button.part;
        if (node instanceof go.Adornment) node = node.adornedPart;
        if (!(node instanceof go.Node)) return;
        var children = node.findTreeChildrenNodes();
        if (children === null) return;
        myDiagram.startTransaction('expandAllNodes');
        expandAll(children, false);
        myDiagram.model.setDataProperty(node.data, "isExpanded", true);
        myDiagram.commitTransaction('expandAllNodes');
        checkDependenciesToShow();
    };
    return button;
});

go.GraphObject.defineBuilder("ExpandCollapseAllButton", function (args) {
    var button = /** @type {Panel} */ (
        go.GraphObject.make("Button",
            {
                "_ExpandedFigure": "DoubleTriangleUp",
                "_ExpandedColor": "white",
                "_CollapsedFigure": "DoubleTriangleDown",
                "_CollapsedColor": "black"
            },
            go.GraphObject.make(go.Shape,
                {
                    name: "ButtonIcon",
                    figure: "DoubleTriangleUp",
                    desiredSize: new go.Size(10, 10),
                    fill: "white"
                },
                // bind the Shape.figure to the Node.isExpanded value using this converter:
                new go.Binding("fill", "isExpanded",
                    function (exp, shape) {
                        var but = shape.panel;
                        return exp ? but["_ExpandedColor"] : but["_CollapsedColor"];
                    }),
                new go.Binding("figure", "isExpanded",
                    function (exp, shape) {
                        var but = shape.panel;
                        return exp ? but["_ExpandedFigure"] : but["_CollapsedFigure"];
                    })),
            // assume initially not visible because there are no links coming out
            { visible: false },
            // bind the button visibility to whether it's not a leaf node
            new go.Binding("visible", "isTreeLeaf",
                function (leaf) { return !leaf; })
                .ofObject())
    );

    // tree expand/collapse behavior
    button.click = function (e, button) {
        var node = button.part;
        if (node instanceof go.Adornment) node = node.adornedPart;
        if (!(node instanceof go.Node)) return;
        var children = node.findTreeChildrenNodes();
        if (children === null) return;
        if (node.data.isExpanded) {
            myDiagram.startTransaction('collapseNode');
            collapseAll(children);
            myDiagram.model.setDataProperty(node.data, "isExpanded", false);
            myDiagram.commitTransaction('collapseNode');
        } else {
            myDiagram.startTransaction('expandNode');
            expandAll(children, true);
            myDiagram.model.setDataProperty(node.data, "isExpanded", true);
            myDiagram.commitTransaction('expandNode');
        }
        checkDependenciesToShow();
    };

    return button;
});

function checkFilters(node){
    var group = node.data.group;
    var active = node.data.active;
    switch(group) {
        case "Contexts":
            if (active && filters.context_activated === true) return true;
            if (!active && filters.context_inactivated === true) return true;
            return false;
        case "Features":
            if (active && filters.feature_activated === active) return true;
            if (!active && filters.feature_inactivated === true) return true;
            return false;
    }
}

function expandAll(nodes, allLevel) {
    while (nodes.next()) {
        var node = nodes.value;
        var allowed = checkFilters(node);
        if (allowed) {
            node.visible = true;
            if (allLevel) myDiagram.model.setDataProperty(node.data, "isExpanded", true);
            var children = node.findTreeChildrenNodes();
            if (children != null && allLevel) {
                expandAll(children, true);
            }
        }

    }
}

function collapseAll(nodes) {
    while (nodes.next()) {
        var node = nodes.value;
        node.visible = false;
        myDiagram.model.setDataProperty(node.data, "isExpanded", false);
        var children = node.findTreeChildrenNodes();
        if (children != null) {
            collapseAll(children);
        }
    }
}

go.GraphObject.defineBuilder("ParentExpanderOneButton", function (args) {
    var button = /** @type {Panel} */ (
        go.GraphObject.make("Button",
            go.GraphObject.make(go.Shape,  // the icon
                {
                    name: "ButtonIcon",
                    figure: "TriangleUp",
                    desiredSize: new go.Size(10, 10),
                    fill: "black" // default value for isParentPresent is true
                }),

            { visible: true },
            // bind the button visibility to whether it's not the root node
            new go.Binding("visible", "isParentPresent",
                function (isParentPresent) { return !isParentPresent; }))
    );

    // hide/unhide parents behavior
    button.click = function (e, button) {
        manageParents(button, false);
        checkDependenciesToShow();
    }
    return button;
});

go.GraphObject.defineBuilder("ParentExpanderAllButton", function (args) {
    var button = /** @type {Panel} */ (
        go.GraphObject.make("Button",
            { // set these values for the isParentPresent binding conversion
                "_parentPresentFigure": "DoubleTriangleDown",
                "_parentPresentColor": "white",
                "_parentNotPresentFigure": "DoubleTriangleUp",
                "_parentNotPresentColor": "black"
            },
            go.GraphObject.make(go.Shape,  // the icon
                {
                    name: "ButtonIcon",
                    figure: "DoubleTriangleDown",
                    desiredSize: new go.Size(10, 10),
                    fill: "white" // default value for isParentPresent is true
                },
                // bind the Shape.figure to the Node.isTreeExpanded value using this converter:
                new go.Binding("figure", "isParentPresent",
                    function (exp, shape) {
                        var but = shape.panel;
                        return exp ? but["_parentPresentFigure"] : but["_parentNotPresentFigure"];
                    }),
                new go.Binding("fill", "isParentPresent",
                    function (exp, shape) {
                        var but = shape.panel;
                        return exp ? but["_parentPresentColor"] : but["_parentNotPresentColor"];
                    })),
            // bind the button visibility to whether it's not the root node
            new go.Binding("visible", "root",
                function (root) { return !root; }))
    );

    // hide/unhide parents behavior
    button.click = function (e, button) {
        manageParents(button, true);
        checkDependenciesToShow();
    }
    return button;
});

function manageParents(button, allLevel) {
    var node = button.part;
    if (node instanceof go.Adornment) node = node.adornedPart;
    if (!(node instanceof go.Node)) return;
    var diagram = node.diagram;
    if (diagram === null) return;
    var parent = node.findTreeParentNode();
    if (parent === null) return;
    if (parent.isVisible()) {
        hideParentsNode(parent, node);
        return;
    }
    unhideParents(parent, node, allLevel);
    
}

function unhideParents(parent, node, allLevel) {
    if (checkFilters(parent)) {
        myDiagram.startTransaction('updateNode');
        myDiagram.model.setDataProperty(node.data, "isParentPresent", true);
        parent.visible = true;
        myDiagram.model.setDataProperty(parent.data, "isExpanded", true);
        unhideChildren(parent, node);
        var newParent = parent.findTreeParentNode();
        if (allLevel && newParent != null) {
            unhideParents(newParent, parent);
        }
        myDiagram.commitTransaction('updateNode');
    }
}

function unhideChildren(parent, node) {
    var children = parent.findTreeChildrenNodes();
    while (children.next()) {
        var child = children.value;
        if(checkFilters(child)){
        if (child != node) {
            child.visible = true;
            myDiagram.model.setDataProperty(parent.data, "isExpanded", true);
            unhideChildren(child, null);
        }
    }
    }
}

function hideParentsNode(parent, node) {
    var children = parent.findTreeChildrenNodes();
    while (children.next()) {
        var child = children.value;
        if (child != node) {
            child.visible = false;
            hideChildren(child);
        }
    }
    parent.visible = false;
    myDiagram.startTransaction('updateNode');
    myDiagram.model.setDataProperty(node.data, "isParentPresent", false);
    myDiagram.commitTransaction('updateNode');
    var newParent = parent.findTreeParentNode();
    if (newParent === null) return;
    hideParentsNode(newParent, parent);
}

function hideChildren(parent) {
    var children = parent.findTreeChildrenNodes();
    if (children === null) return;
    while (children.next()) {
        var child = children.value;
        child.visible = false;
        hideChildren(child);
    }
}

/*
 *  This section of the code contains the definition of everything necessary
 *  to draw the tree. It is the description of the model of a context/feature model
 * 
 */

// basic template for the node 
myDiagram.nodeTemplateMap.add("", //default category of nodes
    maker(go.Node,
        "Spot",
        { background: "#44CCFF"},
        new go.Binding("background", "color"),
        new go.Binding("visible", "isVisible"),
        maker(go.TextBlock,
            { margin: 19, stroke: "white", font: "bold 16px sans-serif",maxSize: new go.Size(100, 50) },
            new go.Binding("text", "name")),
        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 1, 0, 10) },
            maker("ExpandDirectChildButton"),
            maker("ExpandCollapseAllButton")),

        maker(go.Panel, "Horizontal", { alignment: new go.Spot(0.5, 0, 0, -10) },
            maker("ParentExpanderOneButton"),
            maker("ParentExpanderAllButton"))
    ));

// define a TreeLayout that flows from top to bottom
myDiagram.layout = maker(go.TreeLayout,  // the layout for the entire diagram
    {
        angle: 90,
        path: go.TreeLayout.PathSource,  // links go from child to parent
        setsPortSpot: false,  // keep Spot.AllSides for link connection spot
        setsChildPortSpot: false,  // keep Spot.AllSides
        // nodes not connected by "generalization" links are laid out horizontally
        arrangement: go.TreeLayout.ArrangementHorizontal
    });

// different link template to represent the relation between nodes
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

myDiagram.linkTemplateMap.add("XOR",
    maker(go.Link,
        maker(go.Shape),  // the "to" end arrowhead
        maker(go.Shape,   // the "from" end arrowhead
            { fromArrow: "BackwardTriangle", fill: "white", scale: 2 })
    ));

myDiagram.linkTemplateMap.add("OR",
    maker(go.Link,
        maker(go.Shape),  // the "to" end arrowhead
        maker(go.Shape,   // the "from" end arrowhead
            { fromArrow: "BackwardTriangle", fill: "black", scale: 2 })
    ));

// Link template for a dependency in the same graph
myDiagram.linkTemplateMap.add("Dependency",
    maker(go.Link, go.Link.Bezier,
        { isLayoutPositioned: false, isTreeLink: false, curviness: -50 },
        { relinkableFrom: true, relinkableTo: true, visible:false },
        new go.Binding("visible", "visible"), // Binding that allow the filter of dependencies
        maker(go.Shape,
            { stroke: "green", strokeWidth: 2 }),
        maker(go.Shape,
            { toArrow: "OpenTriangle", stroke: "green", strokeWidth: 2 }),
        maker(go.TextBlock,
            new go.Binding("visible", "label"),
            new go.Binding("text", "text"),
            {
                stroke: "green", background: "#DAE4E4",
                maxSize: new go.Size(100, NaN)
            })
    ));

// Link template for a dependency between the context graph and the feature graph
myDiagram.linkTemplateMap.add("ContextFeature",
    maker(go.Link, go.Link.Bezier,
        { isLayoutPositioned: false, isTreeLink: false, curviness: -100 },
        { relinkableFrom: true, relinkableTo: true, visible:false  },
        new go.Binding("visible", "visible"), // Binding that allow the filter of dependencies
        maker(go.Shape,
            { stroke: "red", strokeWidth: 2 }),
        maker(go.Shape,
            { toArrow: "OpenTriangle", stroke: "red", strokeWidth: 2 }),
        maker(go.TextBlock,
            new go.Binding("visible", "label"),
            new go.Binding("text", "text"),
            {
                stroke: "red", background: "#DAE4E4",
                maxSize: new go.Size(100, NaN)
            })
    ));

// Link template for a dependency between a feature and a class (in the class diagram)
myDiagram.linkTemplateMap.add("FeatureCode",
    maker(go.Link, go.Link.Bezier,
        { isLayoutPositioned: false, isTreeLink: false, curviness: -100},
        { relinkableFrom: true, relinkableTo: true, visible:false },
        new go.Binding("visible", "visible"), // Binding that allow the filter of dependencies
        maker(go.Shape,
            { stroke: "blue", strokeWidth: 2 }),
        maker(go.Shape,
            { toArrow: "OpenTriangle", stroke: "blue", strokeWidth: 2 }),
        maker(go.TextBlock,  "left",
            new go.Binding("visible", "label"),
            new go.Binding("text", "text"),
            {
                font: "16px sans-serif",
                stroke: "blue", background: "#DAE4E4",
                maxSize: new go.Size(100, NaN)
            })
    ));

// modify group template
myDiagram.groupTemplateMap.add("",
    maker(go.Group, "Auto",
        { // define the group's internal layout
            layout: maker(go.TreeLayout,
                { angle: 90, arrangement: go.TreeLayout.ArrangementHorizontal, isRealtime: false }),
            // the group begins expanded;
            // upon expansion, a Diagram Listener will generate contents for the group
            isSubGraphExpanded: true,
            // when a group is expanded, if it contains no parts, generate a subGraph inside of it
            subGraphExpandedChanged: function (group) {
                if (group.memberParts.count === 0) {
                    randomGroup(group.data.key);
                }
            }
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
                    { font: "Bold 18px Sans-Serif", margin: 4 },
                    new go.Binding("text", "key"))
            ),
            // create a placeholder to represent the area where the contents of the group are
            maker(go.Placeholder,
                { padding: new go.Margin(0, 10) })
        )  // end Vertical Panel
    ));

    myDiagram.groupTemplateMap.add("code",
    maker(go.Group, "Auto",
        { // define the group's internal layout
            layout: maker(go.TreeLayout,
                { // this only lays out in trees nodes connected by "generalization" links
                  angle: 90,
                  path: go.TreeLayout.PathSource,  // links go from child to parent
                  setsPortSpot: false,  // keep Spot.AllSides for link connection spot
                  setsChildPortSpot: false,  // keep Spot.AllSides
                  // nodes not connected by "generalization" links are laid out horizontally
                  arrangement: go.TreeLayout.ArrangementHorizontal
                }),
            // the group begins expanded;
            // upon expansion, a Diagram Listener will generate contents for the group
            isSubGraphExpanded: true,
            // when a group is expanded, if it contains no parts, generate a subGraph inside of it
            subGraphExpandedChanged: function (group) {
                if (group.memberParts.count === 0) {
                    randomGroup(group.data.key);
                }
            }
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
                    { font: "Bold 18px Sans-Serif", margin: 4 },
                    new go.Binding("text", "key"))
            ),
            // create a placeholder to represent the area where the contents of the group are
            maker(go.Placeholder,
                { padding: new go.Margin(0, 10) })
        )  // end Vertical Panel
    ));

/*
 *  This section of the code contains the definition of code graph
 *  These definitions allow us to make a class diagram
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

// the item template for properties
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

myDiagram.nodeTemplateMap.add("code",
    maker(go.Node, "Auto",
        new go.Binding("visible", "isVisible"),
        {
            locationSpot: go.Spot.Center,
            fromSpot: go.Spot.AllSides,
            toSpot: go.Spot.AllSides
        },
        maker(go.Shape, { fill: "lightyellow" },
        new go.Binding("fill", "color")),
        maker(go.Panel, "Table",
            { defaultRowSeparatorStroke: "black", margin: 3 },
            // header
            maker(go.TextBlock,
                {
                    row: 0, columnSpan: 2, alignment: go.Spot.Center,
                    font: "bold 12pt sans-serif",
                    isMultiline: false, editable: true
                },
                new go.Binding("text", "name").makeTwoWay()),
            // properties
            maker(go.TextBlock, "Properties",
                { row: 1, margin: 5, font: "italic 10pt sans-serif" },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("PROPERTIES")),
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
                { row: 2, margin: 5, font: "italic 10pt sans-serif" },
                new go.Binding("visible", "visible", function (v) { return !v; }).ofObject("METHODS")),
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
    ));

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
        case "simple": return "OpenTriangle"
        default: return "";
    }
}

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
    )); 

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
      maker(go.Shape, 
        new go.Binding("strokeDashArray", "dash"), // the link shape
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
    ));

    