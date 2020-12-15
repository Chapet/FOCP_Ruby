/*
 *  This section of the code contains the data of the graphs
 * 
 */

var model = maker(go.GraphLinksModel);

model.nodeDataArray =
    [
        { isGroup: true, key: "Contexts" },
        { isGroup: true, key: "Features" },
        { isGroup: true, key: "Code", category: "code" },
        { key: "1", name: "Contexts", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, root: true },
        //{ key: "2", name: "User Profile", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "3", name: "Weather", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "4", name: "Emergency", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: true },
        { key: "5", name: "Available services", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: true },
        // { key: "6", name: "Risk concerns", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        //{ key: "7", name: "Age", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "8", name: "Vicinity", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "9", name: "Rain", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "10", name: "Wind", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "11", name: "Clear", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "12", name: "Fog", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "13", name: "Type", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "14", name: "Status", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        //{ key: "15", name: "Zone", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "16", name: "Ambulance", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "17", name: "Police", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "18", name: "Fire brigade", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "19", name: "Natural disaster", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "20", name: "Domestic disaster", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "21", name: "Child", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "22", name: "Adult", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "23", name: "Senior", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "24", name: "Nuclear power plant", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "25", name: "Forest", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "26", name: "River", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },        
        { key: "27", name: "Domestic disaster", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "28", name: "Natural disaster", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "29", name: "Before", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "30", name: "During", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "31", name: "After", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "35", name: "Earthquake", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "36", name: "Heat wave", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "37", name: "Woodfire", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "38", name: "Domestic fire", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        // { key: "39", name: "Gas leak", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "40", name: "Earthquake", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        //{ key: "41", name: "Heat wave", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "42", name: "Woodfire", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "43", name: "Domestic fire", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "44", name: "Gas leak", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "45", name: "Severity", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "46", name: "High", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "47", name: "Medium", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "48", name: "Low", group: "Contexts", active: false, isParentPresent: true, isExpanded: true, firstChild: false },
        { key: "49", name: "Zone", group: "Contexts", active: true, isParentPresent: true, isExpanded: true, firstChild: false },
        
        
        
        
        { key: "100", name: "Features", group: "Features", active: true, isParentPresent: true, root: true, isExpanded: true },
        { key: "101", name: "Risk instructions", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "102", name: "Intervention sensitive", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        //{ key: "103", name: "Navigation", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        //{ key: "104", name: "User sensitive", group: "Features", active: false,isParentPresent: true, isExpanded: true },
        { key: "105", name: "Notify", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "106", name: "Emergency information", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "107", name: "Description", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "108", name: "Instructions in case of", group: "Features", active: true,isParentPresent: true, isExpanded: true },
        // { key: "109", name: "Age sensitive", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        // { key: "110", name: "Vicinity sensitive", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "111", name: "Display severity", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "112", name: "Show impacted zone", group: "Features", active: true,isParentPresent: true, isExpanded: true },
        { key: "113", name: "Domestic disaster", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "114", name: "Natural disaster", group: "Features", active: true,isParentPresent: true, isExpanded: true },
        // { key: "115", name: "Senior friendly", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        // { key: "116", name: "Child friendly", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "117", name: "Standard", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "118", name: "Richter", group: "Features", active: true,isParentPresent: true, isExpanded: true },
        { key: "119", name: "Polygon impact zone", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "120", name: "Circle impact zone", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "122", name: "Gas leak", group: "Features", active: false,isParentPresent: true, isExpanded: true },
        { key: "123", name: "Domestic fire", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "124", name: "Woodfire", group: "Features", active: false,isParentPresent: true, isExpanded: true },
        //{ key: "125", name: "Heat wave", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "126", name: "Earthquake", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "127", name: "Active", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "128", name: "Inactive", group: "Features", active: false,isParentPresent: true, isExpanded: true },
        { key: "129", name: "After", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "130", name: "During", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "131", name: "Before", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        // { key: "132", name: "Nuclear power plant", group: "Features", active: false, isParentPresent: true, isExpanded: true},
        // { key: "133", name: "Forest", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        // { key: "134", name: "River", group: "Features", active: false, isParentPresent: true, isExpanded: true},
        // { key: "135", name: "Profile edition", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        // { key: "136", name: "Age", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        // { key: "137", name: "Vicinity", group: "Features", active: true, isParentPresent: true, isExpanded: true},
        // { key: "138", name: "Location", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        // { key: "139", name: "Risk concerns", group: "Features", active: true, isParentPresent: true, isExpanded: true},
        { key: "140", name: "Alert", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        { key: "141", name: "Warn", group: "Features", active: true, isParentPresent: true, isExpanded: true },
        { key: "142", name: "Inform", group: "Features", active: false, isParentPresent: true, isExpanded: true },
        {
            key: "1000",
            category: "code",
            group: "Code",
            active: false,
            name: "Risk",
            properties: [
            ],
            methods: [
                { name: "inform", parameters: [], visibility: "public" },
                { name: "instruct", parameters: [], visibility: "public" }
            ]
        },
        {
            key: "1001",
            category: "code",
            group: "Code",
            active: false,
            name: "Domestic disaster",
            properties: [
            ],
            methods: [
            ]
        },
        {
            key: "1002",
            category: "code",
            group: "Code",
            active: false,
            name: "Natural disaster",
            properties: [
            ],
            methods: [
            ]
        },
        {
            key: "1003",
            category: "code",
            group: "Code",
            active: false,
            name: "Gas Leak",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "Date", visibility: "protected" }
            ],
            methods: [
                { name: "meth1", type: "int", visibility: "public" }
            ]
        },
        {
            key: "1004",
            category: "code",
            group: "Code",
            active: false,
            name: "Domestic fire",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "Date", visibility: "protected" }
            ],
            methods: [
                { name: "meth1", type: "int", visibility: "public" }
            ]
        },
        {
            key: "1006",
            category: "code",
            group: "Code",
            active: true,
            name: "Earthquake",
            properties: [
                { name: "severity", type: "float", visibility: "private" },
                { name: "radius", type: "int", visibility: "private" },
                { name: "description", type: "String", visibility: "private" }
            ],
            methods: [
            ]
        },
        {
            key: "1005",
            category: "code",
            group: "Code",
            active: false,
            name: "Woodfire",
            properties: [
                { name: "prop1", type: "String", visibility: "public" },
                { name: "prop2", type: "Date", visibility: "protected" }
            ],
            methods: [
                { name: "meth1", type: "int", visibility: "public" }
            ]
        },
        // {
        //     key: "1007",
        //     category: "code",
        //     group: "code",
        //     active: false,
        //     name: "Heatwave",
        //     properties: [
        //         { name: "prop1", type: "String", visibility: "public" },
        //         { name: "prop2", type: "Date", visibility: "protected" }
        //     ],
        //     methods: [
        //         { name: "meth1", type: "int", visibility: "public" }
        //     ]
        // },
        {
            key: "1008",
            category: "code",
            group: "Code",
            active: false,
            name: "User",
            properties: [
                { name: "age", type: "int", visibility: "private" },
                { name: "vicinity", type: "List", visibility: "private" },
                { name: "risks_concerns", type: "List", visibility: "private" }
            ],
            methods: [
            ]
        },
        {
            key: "1009",
            category: "code",
            group: "Code",
            active: true,
            name: "Point",
            properties: [
                { name: "X", type: "float", visibility: "private" },
                { name: "Y", type: "float", visibility: "private" }
            ],
            methods: [
            ]
        },
        {
            key: "1010",
            category: "code",
            group: "Code",
            active: true,
            name: "Notification",
            properties: [
            ],
            methods: [
                { name: "notify", parameters: [], visibility: "public" }
            ]
        },
        // {
        //     key: "1011",
        //     category: "code",
        //     group: "code",
        //     active: false,
        //     name: "Navigation",
        //     properties: [
        //     ],
        //     methods: [
        //     ]
        // },
    ];
model.linkDataArray =
    [
        { from: "1", to: "2", group: "Contexts", category: "Optional" },
        { from: "1", to: "3", group: "Contexts", category: "Optional" },
        { from: "1", to: "4", group: "Contexts", category: "Optional" },
        { from: "1", to: "5", group: "Contexts", category: "Optional" },
        { from: "2", to: "6", group: "Contexts", category: "OR" },
        { from: "2", to: "7", group: "Contexts", category: "OR" },
        { from: "2", to: "8", group: "Contexts", category: "OR" },
        { from: "3", to: "9", group: "Contexts", category: "OR" },
        { from: "3", to: "10", group: "Contexts", category: "OR" },
        { from: "3", to: "11", group: "Contexts", category: "OR" },
        { from: "3", to: "12", group: "Contexts", category: "OR" },
        { from: "4", to: "13", group: "Contexts", category: "Mandatory" },
        { from: "4", to: "14", group: "Contexts", category: "Mandatory" },
        { from: "2", to: "15", group: "Contexts", category: "Mandatory" },
        { from: "5", to: "16", group: "Contexts", category: "OR" },
        { from: "5", to: "17", group: "Contexts", category: "OR" },
        { from: "5", to: "18", group: "Contexts", category: "OR" },
        { from: "6", to: "19", group: "Contexts", category: "OR" },
        { from: "6", to: "20", group: "Contexts", category: "OR" },
        { from: "7", to: "21", group: "Contexts", category: "XOR" },
        { from: "7", to: "22", group: "Contexts", category: "XOR" },
        { from: "7", to: "23", group: "Contexts", category: "XOR" },
        { from: "8", to: "24", group: "Contexts", category: "OR" },
        { from: "8", to: "25", group: "Contexts", category: "OR" },
        { from: "8", to: "26", group: "Contexts", category: "OR" },
        { from: "13", to: "27", group: "Contexts", category: "OR" },
        { from: "13", to: "28", group: "Contexts", category: "OR" },
        { from: "14", to: "29", group: "Contexts", category: "XOR" },
        { from: "14", to: "30", group: "Contexts", category: "XOR" },
        { from: "14", to: "31", group: "Contexts", category: "XOR" },
        { from: "19", to: "35", group: "Contexts", category: "OR" },
        { from: "19", to: "36", group: "Contexts", category: "OR" },
        { from: "19", to: "37", group: "Contexts", category: "OR" },
        { from: "20", to: "38", group: "Contexts", category: "OR" },
        { from: "20", to: "39", group: "Contexts", category: "OR" },
        { from: "28", to: "40", group: "Contexts", category: "OR" },
        { from: "28", to: "41", group: "Contexts", category: "OR" },
        { from: "28", to: "42", group: "Contexts", category: "OR" },
        { from: "27", to: "43", group: "Contexts", category: "OR" },
        { from: "27", to: "44", group: "Contexts", category: "OR" },
        { from: "4", to: "45", group: "Contexts", category: "Mandatory" },
        { from: "4", to: "49", group: "Contexts", category: "Mandatory" },
        { from: "45", to: "46", group: "Contexts", category: "XOR" },
        { from: "45", to: "47", group: "Contexts", category: "XOR" },
        { from: "45", to: "48", group: "Contexts", category: "XOR" },
        
    
        { from: "100", to: "101", group: "Features", category: "Mandatory" },
        { from: "100", to: "102", group: "Features", category: "Optional" },
        { from: "100", to: "103", group: "Features", category: "Optional" },
        { from: "100", to: "104", group: "Features", category: "Optional" },
        { from: "100", to: "105", group: "Features", category: "Optional" },
        { from: "100", to: "106", group: "Features", category: "Optional" },
        { from: "101", to: "107", group: "Features", category: "Mandatory" },
        { from: "101", to: "108", group: "Features", category: "Mandatory" },
        { from: "104", to: "109", group: "Features", category: "OR" },
        { from: "104", to: "110", group: "Features", category: "OR" },
        { from: "106", to: "111", group: "Features", category: "OR" },
        { from: "106", to: "112", group: "Features", category: "OR" },
        { from: "108", to: "113", group: "Features", category: "OR" },
        { from: "108", to: "114", group: "Features", category: "OR" },
        { from: "109", to: "115", group: "Features", category: "XOR" },
        { from: "109", to: "116", group: "Features", category: "XOR" },
        { from: "111", to: "117", group: "Features", category: "XOR" },
        { from: "111", to: "118", group: "Features", category: "XOR" },
        { from: "112", to: "119", group: "Features", category: "XOR" },
        { from: "112", to: "120", group: "Features", category: "XOR" },
        { from: "113", to: "122", group: "Features", category: "OR" },
        { from: "113", to: "123", group: "Features", category: "OR" },
        { from: "114", to: "124", group: "Features", category: "OR" },
        { from: "114", to: "125", group: "Features", category: "OR" },
        { from: "114", to: "126", group: "Features", category: "OR" },
        { from: "130", to: "127", group: "Features", category: "OR" },
        { from: "130", to: "128", group: "Features", category: "OR" },
        { from: "126", to: "129", group: "Features", category: "XOR" },
        { from: "126", to: "130", group: "Features", category: "XOR" },
        { from: "126", to: "131", group: "Features", category: "XOR" },
        { from: "110", to: "132", group: "Features", category: "OR" },
        { from: "110", to: "133", group: "Features", category: "OR" },
        { from: "110", to: "134", group: "Features", category: "OR" },
        { from: "135", to: "136", group: "Features", category: "Mandatory" },
        { from: "135", to: "137", group: "Features", category: "Mandatory" },
        { from: "135", to: "138", group: "Features", category: "Mandatory" },
        { from: "135", to: "139", group: "Features", category: "Mandatory" },
        { from: "100", to: "135", group: "Features", category: "Mandatory" },
        { from: "105", to: "140", group: "Features", category: "XOR" },
        { from: "105", to: "141", group: "Features", category: "XOR" },
        { from: "105", to: "142", group: "Features", category: "XOR" },

        { from: "47", to: "141", category: "ContextFeature" },
        { from: "40", to: "127", category: "ContextFeature" },
        { from: "40", to: "118", category: "ContextFeature" },
        { from: "40", to: "120", category: "ContextFeature" },
        { from: "30", to: "130", category: "ContextFeature" },

        { from: "126", to: "1006", category: "FeatureCode" },
        { from: "120", to: "1009", category: "FeatureCode" },
        { from: "118", to: "1006", category: "FeatureCode" },
        { from: "141", to: "1010", category: "FeatureCode" },


        { from: "1001", to: "1000", relationship: "generalization", category: "UML" },
        { from: "1002", to: "1000", relationship: "generalization", category: "UML" },
        { from: "1003", to: "1001", relationship: "generalization", category: "UML" },
        { from: "1004", to: "1001", relationship: "generalization", category: "UML" },
        { from: "1005", to: "1002", relationship: "generalization", category: "UML" },
        { from: "1006", to: "1002", relationship: "generalization", category: "UML" },
        
        { from: "1007", to: "1002", relationship: "generalization", category: "UML" },
        { from: "1006", to: "1009", text: "Epicenter", toText: "1", category: "Entity"},
        { from: "1008", to: "1009", text: "Location", toText: "1", category: "Entity"},
        { from: "1005", to: "1009", toText: "x", category: "Entity"},
    ];
myDiagram.model = model;