/*
 * File that represents the column of predefined views
 */

//Definition of group so that we can put skins options one below another one
myCheckboxes.groupTemplateMap.add("",
    maker(go.Group, "Vertical",
        {
            layout: maker(go.GridLayout, { wrappingColumn: 1 }),
            movable: false
        },
        maker(go.TextBlock,
            { alignment: go.Spot.Center, font: "Bold 16pt Sans-Serif" },
            new go.Binding("text", "name")),
            maker(go.Panel, "Auto",
            maker(go.Shape, "Rectangle",  // surrounds the Placeholder
                {
                    parameter1: 14,
                    fill: BACKGROUND
                },
            new go.Binding("fill", "color")),
            maker(go.Placeholder,    // represents the area of all member parts,
                { padding: 5 })  // with some extra padding around them
        ),
    )
);

// the column of views is one node
myCheckboxes.nodeTemplateMap.add("Views",
    maker(go.Node, "Auto",  // the Shape will go around the whole table
        maker(go.Panel, "Table", { defaultAlignment: go.Spot.Left },
            { padding: 3, scale: 1.5, defaultSeparatorPadding: 2, alignment: go.Spot.Left },
            maker("CheckBox", "complete_mode", { row: 0, column: 0 },
                maker(go.TextBlock, "Complete mode"),
                {
                    "_doClick": function (e, obj) {
                        complete_mode(obj.part.data.complete_mode);
                        uncheckedOtherView("complete_mode");
                        checkDependenciesToShow();
                    }
                }
            ),
            maker("CheckBox", "active_mode", { row: 1, column: 0 },
                maker(go.TextBlock, "Active mode"),
                {
                    "_doClick": function (e, obj) {
                        active_mode(obj.part.data.active_mode);
                        uncheckedOtherView("active_mode");
                        checkDependenciesToShow();

                    }
                }
            ),
            maker("CheckBox", "inactive_mode", { row: 2, column: 0 },
                maker(go.TextBlock, "Inactive mode"),
                {
                    "_doClick": function (e, obj) {
                        inactive_mode(obj.part.data.inactive_mode);
                        uncheckedOtherView("inactive_mode");
                        checkDependenciesToShow();
                    }
                }
            ),
            maker("CheckBox", "active_contexts_mode", { row: 3, column: 0 },
                maker(go.TextBlock, "Active contexts mode"),
                {
                    "_doClick": function (e, obj) {
                        uncheckedOtherView("active_contexts_mode");
                        active_contexts_mode(obj.part.data.active_contexts_mode);
                        checkDependenciesToShow();
                    }
                }
            ),
            maker("CheckBox", "active_features_mode", { row: 4, column: 0 },
                maker(go.TextBlock, "Active features mode"),
                {
                    "_doClick": function (e, obj) {
                        uncheckedOtherView("active_features_mode");
                        active_features_mode(obj.part.data.active_features_mode);
                        checkDependenciesToShow();
                    }
                }
            ),
            maker("CheckBox", "active_code_mode", { row: 5, column: 0 },
                maker(go.TextBlock, "Active classes mode"),
                {
                    "_doClick": function (e, obj) {
                        uncheckedOtherView("active_code_mode");
                        active_code_mode(obj.part.data.active_code_mode);
                        checkDependenciesToShow();
                    }
                }
            ),
        )
    )
);

function uncheckedOtherView(view) {
    var data = myCheckboxes.findNodeForKey("view").data;
    for (var key in data) {
        if (typeof (data[key]) == "boolean" && key != view) {
            myCheckboxes.model.setDataProperty(data, key, false);
        }
    };
}

function complete_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('completeMode');
        myDiagram.model.nodeDataArray.forEach(function (element) {
            if (!element.isGroup) {
                myDiagram.model.setDataProperty(element, "isVisible", true);
            }
        });
        myDiagram.model.linkDataArray.forEach(function (element) {
            myDiagram.model.setDataProperty(element, "visible", true);
        });
        updateFilter(completeFilter);
        myDiagram.commitTransaction('completeMode');
    }
}

function active_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('activeMode');
        myDiagram.model.nodeDataArray.forEach(function (element) {
            if (!element.isGroup) {
                if (element.active) {
                    myDiagram.model.setDataProperty(element, "isVisible", true);
                }
                else {
                    myDiagram.model.setDataProperty(element, "isVisible", false);
                }
            }
        });
        updateFilter(activeFilter);
        myDiagram.commitTransaction('activeMode');
    }
}

function inactive_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('inactiveMode');
        myDiagram.model.nodeDataArray.forEach(function (element) {
            if (!element.isGroup) {
                if (element.active) {
                    myDiagram.model.setDataProperty(element, "isVisible", false);
                }
                else {
                    myDiagram.model.setDataProperty(element, "isVisible", true);
                }
            }
        });
        updateFilter(inactiveFilter);
        myDiagram.commitTransaction('inactiveMode');
    }
}

function hideAllNodes(type) {
    var activeNodes = [];
    myDiagram.model.nodeDataArray.forEach(function (element) {
        if (element.group == type && element.active) {
            myDiagram.model.setDataProperty(element, "isVisible", true);
            activeNodes.push(element.key);
        }
        else {
            myDiagram.model.setDataProperty(element, "isVisible", false);
        }
    });
    return activeNodes;
}

function active_code_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('activeCodeMode');
        var activeNodes = hideAllNodes("Code");

        activeNodes.forEach(showOriginNode);
        updateFilter(dependenciesFilter);
        myDiagram.commitTransaction('activeCodeMode');
    }
}

function showOriginNode(value) {
    myDiagram.findNodeForKey(value).findLinksInto().each(function (l) {
        if ((l.data.category == "ContextFeature" || l.data.category == "FeatureCode")) {
            myDiagram.model.setDataProperty(l.data, "visible", true);
            myDiagram.model.setDataProperty(l.fromNode.data, "isVisible", true);
            showOriginNode(l.fromNode.data.key);
        }
    });
}

function active_contexts_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('activeContextsMode');
        var activeNodes = hideAllNodes("Contexts");

        activeNodes.forEach(showOutOfNode);
        updateFilter(dependenciesFilter);
        myDiagram.commitTransaction('activeContextsMode');
    }
}

function showOutOfNode(value) {
    myDiagram.findNodeForKey(value).findLinksOutOf().each(function (l) {
        if ((l.data.category == "ContextFeature" || l.data.category == "FeatureCode")) {
            myDiagram.model.setDataProperty(l.data, "visible", true);
            myDiagram.model.setDataProperty(l.toNode.data, "isVisible", true);
            showOutOfNode(l.toNode.data.key);
        }
    });
}

function active_features_mode(boolean) {
    if (boolean) {
        myDiagram.startTransaction('activeFeaturesMode');
        var activeNodes = hideAllNodes("Features");

        activeNodes.forEach(showOutOfNode);
        activeNodes.forEach(showOriginNode);
        updateFilter(dependenciesFilter);
        myDiagram.commitTransaction('activeFeaturesMode');
    }
}

function updateFilter(type) {
    var filter = myCheckboxes.findNodeForKey("filter").data;
    for (var key in type) {
        myCheckboxes.model.setDataProperty(filter, key, type[key]);
    };
}