
function newNode(name, type, counter, methods, classes) {
    var active = false
    if (counter > 0) {
        active = true
    }
    if (type == "RootContext" || type == "RootFeature") {
        if (checkNodeNotExist(name + type)) {
            myDiagram.model.addNodeData(
                { key: name + type, name: name, group: name, active: active, isExpanded: true, isParentPresent: true, root: true },
            )
        }
    }
    else {
        var newtype = type
        if (newtype.includes("Abstract")) {
            newtype = newtype.replace(/Abstract/g, '');
        }
        if (type == "AbstractFeature" || type == "Feature") {
            if (checkNodeNotExist(name + type)) {
                myDiagram.model.addNodeData(
                    {
                        key: name + type, name: name.match(/[A-Z][a-z]+|[0-9]+/g).join(" "), group: newtype + "s", category: "Feature", active: active,
                        isParentPresent: true, isExpanded: true, root: false, firstChild: false, methods: methods
                    },
                )
            }
        }
        else {
            if (checkNodeNotExist(name + type)) {
                myDiagram.model.addNodeData(
                    { key: name + type, name: name, group: newtype + "s", active: active, isParentPresent: true, isExpanded: true, root: false, firstChild: false },
                )
            }
        }
    }

    if (!(classes === undefined || classes.length == 0)) {
        classes.forEach(item => {
            item.key = item.name + "Code"
            item.category = 'code'
            item.group = 'Code'
            item.active = false
            if (checkNodeNotExist(item.key)) {
                myDiagram.model.addNodeData(item)
            }
        })
    }
}

function checkNodeNotExist(key) {
    return !myDiagram.model.findNodeDataForKey(key)
}

function newRelationsNode(origin, destinations, type, isConstraint, group) {
    destinations.forEach(destination => {
        var newgroup = group

        if (newgroup.includes("Abstract")) {
                newgroup = newgroup.replace(/Abstract/g, '')
            }
            else if (newgroup.includes("Root")) {
                newgroup = newgroup.replace(/Root/g, '')
            }
            var key = origin + group + destination[0]
        if (isConstraint) {
            if (myDiagram.findLinksByExample({ key: key }).first() == null) {
                myDiagram.model.addLinkData(
                    { key: key, from: origin + group, to: destination[0], group: newgroup + "s", category: type }
                )
            }
            if (!(destination[1] === undefined || destination[1].length == 0)) {
                destination[1].forEach(item => {
                    var linkkey = destination[0] + item.name + "Code"
                    if (myDiagram.findLinksByExample({ key: linkkey }).first() == null) {
                    myDiagram.model.addLinkData(
                        { key: linkkey, from: destination[0], to: item.name + "Code", category: "FeatureCode", text: "adapts" }
                    )}
                    var child = item.name + "Code"
                    while(item.ancestors.length > 0){
                        var link = child + item.ancestors[0] + "Code"
                        if(myDiagram.findLinksByExample({ key: child + item.ancestors[0] + "Code"}).first() == null){
                            myDiagram.model.addLinkData(
                                {key:link, from: child, to: item.ancestors[0] + "Code", relationship: "generalization", category: "UML" }                            
                            )
                        }
                        child = item.ancestors.shift()
                    }
                })
            }
            if (group == "RootContext" || group == "RootFeature") {
                var node = myDiagram.model.findNodeDataForKey(destination[0]);
                myDiagram.startTransaction('updateNode');
                myDiagram.model.setDataProperty(node, "firstChild", true);
                myDiagram.commitTransaction('updateNode');
            }
        }
        else{
            var key = origin + group + destination[0]
            if (myDiagram.findLinksByExample({ key: key }).first() == null) {
                myDiagram.model.addLinkData(
                    { key: key, from: origin + group, to: destination[0], group: newgroup + "s", category: "Dependency", text: type }
                )
            }
        }

    });
}

function activateNodes(node) {
    myDiagram.startTransaction('updateNode');
    var data = myDiagram.model.findNodeDataForKey(node);
    myDiagram.model.setDataProperty(data, "active", true);
    myDiagram.model.setDataProperty(data, "color", ACTIVE);
    activateClass(data, true);
    myDiagram.commitTransaction('updateNode');
}

function activateClass(feature, active) {
    var links = myDiagram.findLinksByExample({ from: feature.key, category: "FeatureCode" })
    while (links.next()) {
        classData = myDiagram.model.findNodeDataForKey(links.value.toNode.key);
        if (active) {
            myDiagram.model.setDataProperty(classData, "active", active);
            myDiagram.model.setDataProperty(classData, "color", ACTIVE);
        }
        else {
            var linksToClass = myDiagram.findLinksByExample({ to: classData.key, category: "FeatureCode" });
            var allInactive = true;
            while (linksToClass.next()) {
                if (myDiagram.model.findNodeDataForKey(linksToClass.value.fromNode.key).active) {
                    allInactive = false;
                    break;
                }
            }
            if (allInactive) {
                myDiagram.model.setDataProperty(classData, "active", active);
                myDiagram.model.setDataProperty(classData, "color", INACTIVE);
            }
        }
    }
}

function deactivateNodes(node) {
    myDiagram.startTransaction('updateNode');
    var data = myDiagram.model.findNodeDataForKey(node);
    myDiagram.model.setDataProperty(data, "active", false);
    myDiagram.model.setDataProperty(data, "color", INACTIVE);
    activateClass(data, false);
    myDiagram.commitTransaction('updateNode');
}

function mapping(data){
    data.forEach(item =>{
        var key = item[0] + "Context" + item[1] + "Feature"
        if (myDiagram.findLinksByExample({ key: key }).first() == null) {
            myDiagram.model.addLinkData(
                {key: key, from: item[0] + "Context", to: item[1] + "Feature", category: "ContextFeature", text: "activates" }
            )
        }
    })
}