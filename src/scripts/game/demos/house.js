export default {
    "rooms": {
        // House bedroom
        "house.bedroom": {
            name: "bedroom",
            description: "This is the bedroom. Here you can sleep and use your computer.",
            compass: {
                "out": "house.hallway"
            }
        },
        // House hallway
        "house.hallway": {
            name: "Hallway",
            description: "This is the hallway. You can enter the bedroom.",
            map: {
                "bedroom": "house.bedroom"
            }
        }
    }
};