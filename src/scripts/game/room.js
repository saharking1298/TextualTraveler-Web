import defaults from "@/scripts/game/defaults";

class Compass {
    constructor () {
        this.directions = defaults.compass.directions;
        this.data = {};
    }
    set(location, value) {
        if (this.directions.includes(location)) {
            if (typeof value === "string") {
                this.data[location] = value;
            }
            else {
                throw new Error("Compass location must be a string (room ID)")
            }
        }
        else {
            throw new Error("Invalid compass direction: " + location)
        } 
    }
    get(location) {
        return this.data[location];
    }
    getAll(list=false) {
        if (list) {
            return Object.keys(this.data);
        }
        return this.data;
    }
    remove(location) {
        if (this.data[location] !== undefined) {
            delete this.data[location];
            return true;
        }
        return false;
    }
}

class Map {
    constructor () {
        this.data = {};
    }
    set(location, value) {
        if (typeof value === "string") {
            this.data[location] = value;
        }
        else {
            throw new Error("Map location must be a string (room ID)")
        }
    }
    get(location) {
        return this.data[location];
    }
    getAll(list = false) {
        if (list) {
            return Object.keys(this.data);
        }
        return this.data;
    }
    remove(location) {
        if (this.data[location] !== undefined) {
            delete this.data[location];
            return true;
        }
        return false;
    }
}

class Room {
    constructor(config) {
        this.name = config.name || defaults.room.name;
        this.description = config.description || defaults.room.description;
        this.guide = config.guide || defaults.room.guide;
        this.flags = config.flags || {};
        this.compass = new Compass();
        this.map = new Map();

        // Registering locations
        if (config.locations) {
            for (let item in config.locations) {
                if (this.compass.directions.includes(item)) {
                    this.compass.set(item, config.locations[item]);
                }
                else {
                    this.map.set(item, config.locations[item]);
                }
            }
        }
        // Registering compass locations
        if (config.compass) {
            for (let item in config.compass) {
                this.compass.set(item, config.compass[item]);
            }
        }

        // Registering map locations
        if (config.map) {
            for (let item in config.map) {
                this.map.set(item, config.map[item]);
            }
        }
    }
}

export default Room;