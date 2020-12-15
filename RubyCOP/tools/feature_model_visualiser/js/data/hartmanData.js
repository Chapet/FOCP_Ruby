/*
 *  This section of the code contains the data of the graphs
 * 
 */

var model = maker(go.GraphLinksModel);

model.nodeDataArray =
    [
        { isGroup: true, key: "Contexts" },
        { isGroup: true, key: "Features" },
        { isGroup: true, key: "Code" },
        { key: "1", name: "Contexts", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, root: true },
        { key: "2", name: "Continent", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "3", name: "Type", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "4", name: "Car-Brand", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "5", name: "Europe", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "6", name: "Asia", group: "Contexts", active: false, isExpanded: true, isParentPresent: true },
        { key: "7", name: "USA", group: "Contexts", active: false, isParentPresent: true, isExpanded: true },
        { key: "8", name: "Budget", group: "Contexts", active: false, isParentPresent: true, isExpanded: true },
        { key: "9", name: "Mid", group: "Contexts", active: false, isParentPresent: true, isExpanded: true },
        { key: "10", name: "High-end", group: "Contexts", active: false, isParentPresent: true, isExpanded: true },
        { key: "11", name: "CarA", group: "Contexts", active: true, isParentPresent: true, isExpanded: true },
        { key: "12", name: "CarB", group: "Contexts", active: true, isParentPresent: true, isExpanded: true },
        { key: "13", name: "CarC", group: "Contexts", active: true, isParentPresent: true, isExpanded: true },
        { key: "14", name: "CarD", group: "Contexts", active: false, isParentPresent: true, isExpanded: true },
        { key: "100", name: "Features", group: "Features", category: "Feature", active: true, isParentPresent: true, root: true, isExpanded: true },
        { key: "101", name: "Maps", group: "Features", category: "Feature", active: true, isParentPresent: true, isExpanded: true },
        { key: "102", name: "Protocol", group: "Features", category: "Feature", active: true, isParentPresent: true, isExpanded: true },
        { key: "103", name: "Connections", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "104", name: "EU", group: "Features", category: "Feature", active: true,isParentPresent: true, isExpanded: true },
        { key: "105", name: "USA", group: "Features", category: "Feature", active: false,isParentPresent: true, isExpanded: true },
        { key: "106", name: "Asia", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "107", name: "Flexray", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "108", name: "ZigBee", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "109", name: "Bluetooth", group: "Features", category: "Feature", active: true, isParentPresent: true, isExpanded: true },
        { key: "110", name: "Interface", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "111", name: "Wifi", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "112", name: "Card-Slot", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true },
        { key: "113", name: "USB", group: "Features", category: "Feature", active: false, isParentPresent: true, isExpanded: true, methods: [
            { name: "meth1", type: "int", visibility: "public" }
        ] },
        {
            key: "1000",
            category: "code",
            group: "Code",
            active: false,
            name: "Class1",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "Currency", visibility: "public", default: "0" }
            ],
            methods: [
                { name: "meth1", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" },
                { name: "meth2", parameters: [{ name: "amount", type: "Currency" }], visibility: "public" }
            ]
        },
        {
            key: "1001",
            category: "code",
            group: "Code",
            active: false,
            name: "Class2",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "Date", visibility: "protected" }
            ],
            methods: [
                { name: "meth1", type: "int", visibility: "public" }
            ]
        },
        {
            key: "1002",
            category: "code",
            group: "Code",
            active: false,
            name: "Class3",
            properties: [
                { name: "prop1", type: "List", visibility: "public" }
            ],
            methods: [
                { name: "meth1", parameters: [{ name: "class", type: "Class1" }], visibility: "private" },
                { name: "meth2", visibility: "private" }
            ]
        },
        {
            key: "1003",
            category: "code",
            active: true,
            group: "Code",
            name: "Class4",
            properties: [
                { name: "prop", type: "List", visibility: "public" }
            ],
            methods: [
                { name: "meth", parameters: [{ name: "class", type: "Class1" }], visibility: "private" }
            ]
        },
        {
            key: "1004",
            category: "code",
            group: "Code",
            active: false,
            name: "Class6",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "String", visibility: "public" },
                { name: "prop3", type: "Professor", visibility: "public" },
                { name: "prop4", type: "String", visibility: "public" },
                { name: "prop5", type: "List", visibility: "public" },
                { name: "prop6", type: "List", visibility: "public" },
                { name: "prop7", type: "List", visibility: "public" }
            ]
        }
    ];
model.linkDataArray =
    [
        { from: "1", to: "2", group: "Contexts", category: "Optional" },
        { from: "1", to: "3", group: "Contexts", category: "Optional" },
        { from: "1", to: "4", group: "Contexts", category: "Optional" },
        { from: "2", to: "5", group: "Contexts", category: "Optional" },
        { from: "2", to: "6", group: "Contexts", category: "Optional" },
        { from: "2", to: "7", group: "Contexts", category: "Optional" },
        { from: "3", to: "8", group: "Contexts", category: "Optional" },
        { from: "3", to: "9", group: "Contexts", category: "Optional" },
        { from: "3", to: "10", group: "Contexts", category: "Optional" },
        { from: "4", to: "11", group: "Contexts", category: "OR" },
        { from: "4", to: "12", group: "Contexts", category: "OR" },
        { from: "4", to: "13", group: "Contexts", category: "OR" },
        { from: "4", to: "14", group: "Contexts", category: "OR" },
        { from: "7", to: "11", group: "Contexts", category: "Dependency", text: "exludes"  },
    
        { from: "100", to: "101", group: "Features", category: "Optional" },
        { from: "100", to: "102", group: "Features", category: "Mandatory" },
        { from: "100", to: "103", group: "Features", category: "Optional" },
        { from: "101", to: "104", group: "Features", category: "OR" },
        { from: "101", to: "105", group: "Features", category: "OR" },
        { from: "101", to: "106", group: "Features", category: "OR" },
        { from: "102", to: "107", group: "Features", category: "OR" },
        { from: "102", to: "108", group: "Features", category: "OR" },
        { from: "102", to: "109", group: "Features", category: "OR" },
        { from: "103", to: "110", group: "Features", category: "Optional" },
        { from: "103", to: "111", group: "Features", category: "Optional" },
        { from: "110", to: "112", group: "Features", category: "Optional" },
        { from: "110", to: "113", group: "Features", category: "Optional" },

        { from: "5", to: "104", category: "ContextFeature", text: "requires" },
        { from: "11", to: "107", category: "ContextFeature", text: "exludes" },
        { from: "8", to: "113", category: "ContextFeature", text: "sets cardinality" },

        { from: "1002", to: "1001", relationship: "generalization", category: "UML" },
        { from: "1003", to: "1001", relationship: "generalization", category: "UML" },
        { from: "1004", to: "1003", relationship: "aggregation", category: "UML" },
        { from: "109", to: "1003", category: "FeatureCode", text:"active 1 3" },
        { from: "105", to: "1004", category: "FeatureCode" }
    ];
myDiagram.model = model;