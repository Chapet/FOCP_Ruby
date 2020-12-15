/*
 * This file regroups all the elements to define the buttons 
 * for the context model and feature model
 * It contains the definition of some new figures, buttons 
 */

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
        checkGrandChildren(node.findTreeChildrenNodes());
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

go.GraphObject.defineBuilder("HideNode", function (args) {
    var button = /** @type {Panel} */ (
        go.GraphObject.make("Button",
            go.GraphObject.make(go.Shape,  // the icon
                {
                    name: "ButtonIcon",
                    figure: "ThinX",
                    desiredSize: new go.Size(10, 10),
                    fill: "black" // default value for isExpanded is true
                },
            ),
            new go.Binding("visible", "",
                function (node) {
                    return true;
                }).ofObject())
    );

    // tree expand/collapse behavior
    button.click = function (e, button) {
        var node = button.part;
        if (node instanceof go.Adornment) node = node.adornedPart;
        if (!(node instanceof go.Node)) return;
        var diagram = node.diagram;
        if (diagram === null) return;
        if (node.isVisible()) {
            node.visible = false;
            //update parent node buttons
            var parent = node.findTreeParentNode();
            if (parent != null && parent.isVisible()) {
                myDiagram.startTransaction('updateParentButton');
                myDiagram.model.setDataProperty(parent.data, "isExpanded", false);
                myDiagram.commitTransaction('updateParentButton');
            }
            //update children nodes buttons
            var children = node.findTreeChildrenNodes();
            while (children.next()) {
                var child = children.value;
                if (child.isVisible()) {
                    myDiagram.startTransaction('updateChildButton');
                    myDiagram.model.setDataProperty(child.data, "isParentPresent", false);
                    myDiagram.commitTransaction('updateChildButton');
                }
            }
        }
        checkDependenciesToShow();
    };
    return button;
});

function checkFilters(node) {
    var group = node.data.group;
    var active = node.data.active;
    switch (group) {
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
            myDiagram.model.setDataProperty(node.data, "isParentPresent", true);
            if (allLevel) myDiagram.model.setDataProperty(node.data, "isExpanded", true);
            var children = node.findTreeChildrenNodes();
            if (children != null && allLevel) {
                expandAll(children, true);
            }
        }

    }
}

function checkGrandChildren(children) {
    while (children.next()) {
        var child = children.value;
        var grandChildren = child.findTreeChildrenNodes();
        if (grandChildren === null) break;
        while (grandChildren.next()) {
            var grandChild = grandChildren.value;
            if (grandChild.isVisible()) {
                myDiagram.model.setDataProperty(grandChild.data, "isParentPresent", true);
            }
            else{
                if(checkFilters(grandChild)){
                    myDiagram.model.setDataProperty(child.data, "isExpanded", false);
                }
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
    myDiagram.startTransaction('updateNode');
    myDiagram.model.setDataProperty(node.data, "isParentPresent", true);
    if (checkFilters(parent)) {
        parent.visible = true;
    }
    myDiagram.model.setDataProperty(parent.data, "isExpanded", true);
    unhideChildren(parent, node);
    var newParent = parent.findTreeParentNode();
    if (newParent != null) {
        if (allLevel) {
            unhideParents(newParent, parent, allLevel);
        }
        else {
            if (newParent.isVisible()) {
                var children = newParent.findTreeChildrenNodes();
                var allVisible = true;
                while (children.next() && allVisible) {
                    var child = children.value;
                    if (!child.isVisible()) {
                        allVisible = false
                    }
                }
                if (allVisible) {
                    myDiagram.startTransaction('updateGrandparentButton');
                    myDiagram.model.setDataProperty(newParent.data, "isExpanded", true);
                    myDiagram.commitTransaction('updateGrandparentButton');
                }
                myDiagram.model.setDataProperty(parent.data, "isParentPresent", true);
            }
            else{
                myDiagram.model.setDataProperty(parent.data, "isParentPresent", false);
            }
        }
    }
    myDiagram.commitTransaction('updateNode');
}

function unhideChildren(parent, node) {
    var children = parent.findTreeChildrenNodes();
    while (children.next()) {
        var child = children.value;

        if (child != node) {
            if (checkFilters(child)) {
                child.visible = true;
            }
            myDiagram.model.setDataProperty(parent.data, "isExpanded", true);
            myDiagram.model.setDataProperty(child.data, "isParentPresent", true);
            unhideChildren(child, null);
        }
    }
}

function hideParentsNode(parent, node) {
    var children = parent.findTreeChildrenNodes();
    while (children.next()) {
        var child = children.value;
        if (child != node) {
            if (!checkFilters(parent)) {
                return;
            }
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