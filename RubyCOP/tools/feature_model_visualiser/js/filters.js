/*
 *  This section of the code contains the functions and definitions
 *  of the filters part
 * 
 */

// function allowing the filtering of (in)activated features
function activated(group, b) {
    var value = ACTIVE;
    model.nodeDataArray.forEach(function (element) {
        if (element.group == group && element.active) {
            myDiagram.startTransaction('updateNode');
            myDiagram.model.setDataProperty(element, "strokeColor", STROKE);
            if (b) {
                myDiagram.model.setDataProperty(element, "color", value);
                myDiagram.model.setDataProperty(element, "isVisible", true);
            }
            else {
                myDiagram.model.setDataProperty(element, "isVisible", false);
            }
            myDiagram.commitTransaction('updateNode');
        }
    });
    checkDependenciesToShow();
}

// function allowing the filtering of inactivated features
function inactivated(group, b) {
    var value = INACTIVE;
    model.nodeDataArray.forEach(function (element) {
        if (element.group == group && !element.active) {
            myDiagram.startTransaction('updateNode');
            myDiagram.model.setDataProperty(element, "strokeColor", STROKE);
            if (b) {
                myDiagram.model.setDataProperty(element, "color", value);
                myDiagram.model.setDataProperty(element, "isVisible", true);
            }
            else {
                myDiagram.model.setDataProperty(element, "isVisible", false);
            }
            myDiagram.commitTransaction('updateNode');
        }
    });
    checkDependenciesToShow();
}

function checkDependenciesToShow() {
    showDependency("ContextFeature", filters.context_feature_dependencies_A, true);
    showDependency("ContextFeature", filters.context_feature_dependencies_I, false);
    showDependency("FeatureCode", filters.features_code_dependencies_active, true);
    showDependency("FeatureCode", filters.features_code_dependencies_inactive, false);
    showDependency("Contexts", filters.context_active_dependencies, true);
    showDependency("Contexts", filters.context_inactive_dependencies, false);
    showDependency("Features", filters.feature_active_dependencies, true);
    showDependency("Features", filters.feature_inactive_dependencies, false);
    toggleLabels("Contexts", filters.context_labels);
    toggleLabels("Features", filters.feature_labels);
    toggleLabels("ContextFeature", filters.context_feature_labels);
    toggleLabels("FeatureCode", filters.feature_code_labels)

}

// function allowing the filtering of dependencies
function showDependency(group, b, active, label = "no change") {
    model.linkDataArray.forEach(function (element) {
        myDiagram.startTransaction('updateNode');
        if (((element.category == "Dependency" && element.group == group)) || element.category == group) {
            
                if (myDiagram.findNodeForKey(element.from).visible
                    && myDiagram.findNodeForKey(element.to).visible) {
                    if (myDiagram.findNodeForKey(element.from).data.active == active) {
                        myDiagram.model.setDataProperty(element, "visible", b);
                    }
                }
                else {
                    myDiagram.model.setDataProperty(element, "visible", false);
                }
            
        }
        myDiagram.commitTransaction('updateNode');
    })
}

function toggleLabels(group, boolean){
    model.linkDataArray.forEach(function (element) {
        if(element.group == group || element.category == group)
            myDiagram.model.setDataProperty(element, "label", boolean);
    })
}


myCheckboxes.nodeTemplateMap.add("Filters",
    maker(go.Node, "Auto",  // the Shape will go around the whole table
        maker(go.Panel, "Table", { defaultAlignment: go.Spot.Left },
            { padding: 3, scale: 1.5, defaultSeparatorPadding: 2, alignment: go.Spot.Left },

            //First column of filters devoted to contexts
            maker(go.TextBlock, { row: 0, column: 0 },
                { margin: 3, font: "bold 16px sans-serif", alignment: go.Spot.Left },  // some room around the bold text
                new go.Binding("text", "columnName1")),

            maker("CheckBox", "context_activated", { row: 1, column: 0 },
                maker(go.TextBlock, "Activated contexts"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        activated("Contexts", obj.part.data.context_activated); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_inactivated", { row: 2, column: 0 },
                maker(go.TextBlock, "Inactivated contexts"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        inactivated("Contexts", obj.part.data.context_inactivated); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_active_dependencies", { row: 3, column: 0 },
                maker(go.TextBlock, "active dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("Contexts", obj.part.data.context_active_dependencies, true); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_inactive_dependencies", { row: 4, column: 0 },
                maker(go.TextBlock, "inactive dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("Contexts", obj.part.data.context_inactive_dependencies, false); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_labels", { row: 5, column: 0 },
                maker(go.TextBlock, "labels"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        toggleLabels("Contexts", obj.part.data.context_labels); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),

            //Second column of filters devoted to the features
            maker(go.TextBlock, { row: 0, column: 2 },
                { margin: 3, font: "bold 16px sans-serif" },  // some room around the bold text
                new go.Binding("text", "columnName2")),

            maker("CheckBox", "feature_activated", { row: 1, column: 2 },
                maker(go.TextBlock, "Activated features"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        activated("Features", obj.part.data.feature_activated); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "feature_inactivated", { row: 2, column: 2 },
                maker(go.TextBlock, "Inactivated features"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        inactivated("Features", obj.part.data.feature_inactivated); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "feature_active_dependencies", { row: 3, column: 2 },
                maker(go.TextBlock, "active dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("Features", obj.part.data.feature_active_dependencies, true); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "feature_inactive_dependencies", { row: 4, column: 2 },
                maker(go.TextBlock, "inactive dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("Features", obj.part.data.feature_inactive_dependencies, false); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "feature_labels", { row: 5, column: 2 },
                maker(go.TextBlock, "labels"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        toggleLabels("Features", obj.part.data.feature_labels); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),

            //Third column of filters devoted to the dependencies between contexts and features
            maker(go.TextBlock, { row: 0, column: 1 },
                { margin: 3, font: "bold 16px sans-serif" },  // some room around the bold text
                new go.Binding("text", "columnName3")),
            maker("CheckBox", "context_feature_dependencies_A", { row: 1, column: 1 },
                maker(go.TextBlock, "active dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("ContextFeature", obj.part.data.context_feature_dependencies_A, true); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_feature_dependencies_I", { row: 2, column: 1 },
                maker(go.TextBlock, "inactive dependencies"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("ContextFeature", obj.part.data.context_feature_dependencies_I, false); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "context_feature_labels", { row: 3, column: 1 },
                maker(go.TextBlock, "labels"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        toggleLabels("ContextFeature", obj.part.data.context_feature_labels); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            //Fourth column of filters devoted to the class diagram
            maker(go.TextBlock, { row: 0, column: 4 },
                { margin: 3, font: "bold 16px sans-serif" },  // some room around the bold text
                new go.Binding("text", "columnName4")),
            maker("CheckBox", "impacted_classes", { row: 1, column: 4 },
                maker(go.TextBlock, "impacted classes"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        activated("Code", obj.part.data.impacted_classes); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "non_impacted_classes", { row: 2, column: 4 },
                maker(go.TextBlock, "non-impacted classes"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        inactivated("Code", obj.part.data.non_impacted_classes); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),

            //Fifth column of filters devoted to the dependencies between features and the class diagram
            maker(go.TextBlock, { row: 0, column: 3 },
                { margin: 3, font: "bold 16px sans-serif" },  // some room around the bold text
                new go.Binding("text", "columnName5")),
            maker("CheckBox", "features_code_dependencies_active", { row: 1, column: 3 },
                maker(go.TextBlock, "dependencies with active features"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("FeatureCode", obj.part.data.features_code_dependencies_active, true); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "features_code_dependencies_inactive", { row: 2, column: 3 },
                maker(go.TextBlock, "dependencies with inactive features"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        showDependency("FeatureCode", obj.part.data.features_code_dependencies_inactive, false); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
            maker("CheckBox", "features_code_labels", { row: 3, column: 3 },
                maker(go.TextBlock, "labels"),
                { // _doClick is executed within a transaction by the CheckBoxButton click function
                    "_doClick": function (e, obj) {
                        toggleLabels("FeatureCode", obj.part.data.features_code_labels); // toggle the Part.movable flag
                        uncheckedOtherView(null);
                    }
                }
            ),
        )
    )
);

// create the model data that will be represented by Nodes and Links
myCheckboxes.model =
    maker(go.GraphLinksModel,
        {
            nodeDataArray:
                [
                    { isGroup: true, key: "views", name: "Predefined views" },
                    { isGroup: true, key: "filters", name: "Customized views"},
                    {
                        key: "view",
                        active_mode: false,
                        complete_mode: false,
                        inactive_mode: false,
                        active_code_mode: false,
                        active_contexts_mode: false,
                        active_features_mode: false,
                        group: "views",
                        category: "Views"
                    },
                    {
                        key: "filter",
                        columnName1: "Contexts",
                        columnName2: "Features",
                        columnName3: "Contexts-Features",
                        columnName4: "Code",
                        columnName5: "Features-Code",

                        context_activated: true,
                        context_inactivated: true,
                        context_active_dependencies: false,
                        context_inactive_dependencies: false,
                        context_labels: true,

                        feature_activated: true,
                        feature_inactivated: true,
                        feature_active_dependencies: false,
                        feature_inactive_dependencies: false,
                        feature_labels: true,

                        context_feature_dependencies_A: false,
                        context_feature_dependencies_I: false,
                        context_feature_labels: true,

                        impacted_classes: true,
                        non_impacted_classes: true,

                        features_code_dependencies_active: false,
                        features_code_dependencies_inactive: false,
                        features_code_labels: true,

                        group: "filters",
                        category: "Filters"
                    },
                ],
        }
    );

var filters = myCheckboxes.model.nodeDataArray[3];

//Different combinations of the filters
var completeFilter = {
    context_activated: true,
    context_inactivated: true,
    context_active_dependencies: true,
    context_inactive_dependencies: true,
    context_labels: true,

    feature_activated: true,
    feature_inactivated: true,
    feature_active_dependencies: true,
    feature_inactive_dependencies: true,
    feature_labels: true,

    context_feature_dependencies_A: true,
    context_feature_dependencies_I: true,
    context_feature_labels: true,

    impacted_classes: true,
    non_impacted_classes: true,

    features_code_dependencies_active: true,
    features_code_dependencies_inactive: true,
    features_code_labels: true,
};

var activeFilter = {
    context_activated: true,
    context_inactivated: false,
    context_active_dependencies: true,
    context_inactive_dependencies: false,
    context_labels: false,

    feature_activated: true,
    feature_inactivated: false,
    feature_active_dependencies: true,
    feature_inactive_dependencies: false,
    feature_labels: false,

    context_feature_dependencies_A: true,
    context_feature_dependencies_I: false,
    context_feature_labels: false,

    impacted_classes: true,
    non_impacted_classes: false,

    features_code_dependencies_active: true,
    features_code_dependencies_inactive: false,
    features_code_labels: false,
};

var inactiveFilter = {
    context_activated: false,
    context_inactivated: true,
    context_active_dependencies: false,
    context_inactive_dependencies: true,
    context_labels: false,

    feature_activated: false,
    feature_inactivated: true,
    feature_active_dependencies: false,
    feature_inactive_dependencies: true,
    feature_labels: false,

    context_feature_dependencies_A: false,
    context_feature_dependencies_I: true,
    context_feature_labels: false,

    impacted_classes: false,
    non_impacted_classes: true,

    features_code_dependencies_active: false,
    features_code_dependencies_inactive: true,
    features_code_labels: false,
};

var dependenciesFilter = {
    context_activated: true,
    context_inactivated: true,
    context_active_dependencies: false,
    context_inactive_dependencies: false,
    context_labels: false,

    feature_activated: true,
    feature_inactivated: true,
    feature_active_dependencies: false,
    feature_inactive_dependencies: false,
    feature_labels: false,

    context_feature_dependencies_A: true,
    context_feature_dependencies_I: true,
    context_feature_labels: true,

    impacted_classes: true,
    non_impacted_classes: false,

    features_code_dependencies_active: true,
    features_code_dependencies_inactive: false,
    features_code_labels: true,
};