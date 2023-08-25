import defaults from "@/scripts/game/defaults";
import Room from "@/scripts/game/room";
import { processInput } from "./utils";

class ContentManager {
    constructor (contentType) {
        this.contentType = contentType;
        this.data = {};
    }
    set (itemID, item) {
        if (!(item instanceof this.contentType)) {
            item = new this.contentType(item);
        }
        this.data[itemID] = item;
        return item;
    }
    get (item) {
        if (item instanceof this.contentType) {
            return item;
        }
        if (typeof item === "string") {
            item = this.data[item];
            if (item) {
                return item;
            }
            else {
                throw new Error(`No ${this.contentType.name} with such ID`);
            }
        }
    }
    remove (itemID) {
        if (this.data[itemID]) {
            delete this.data[itemID];
            return true;
        }
        return false;
    }
}

class Game {
    constructor (config) {
        this.rooms = new ContentManager(Room);
        this.currentRoom = null;
        if (config) {
            this.setup(config);
        }
    }

    setup (config) {
        this.rooms = new ContentManager(Room);  
        if (config.rooms) {
            for (let key in config.rooms) {
                this.rooms.set(key, config.rooms[key]);
            }
        }
        if (config.start) {
            this.setStartRoom(config.start);
        }
    }

    setStartRoom (room) {
        this.currentRoom = this.rooms.get(room);
    }

    travel (locationName) {
        const status = {
            success: true,
            command: "",
            room: null
        };
        let roomID, room;
        if (defaults.compass.directions.includes(locationName)) {
            roomID = this.currentRoom.compass.get(locationName);
            if (!roomID) {
                return {
                    success: false,
                    message: "You can't go there!"
                };
            }
            status.command = "go " + locationName;
        }
        else {
            roomID = this.currentRoom.map.get(locationName);
            if (!roomID) {
                return {
                    success: false,
                    message: "No such location: " + locationName
                };
            }
            status.command = "enter " + locationName;
        }
        room = this.rooms.get(roomID)
        this.currentRoom = room;
        status.room = room;
        return status;
    }

    handleInput (text) {
        const commands = {
            "go": arg => this.travel(arg),
            "enter": arg => this.travel(arg)
        };
        const {command, argument} = processInput(text);

        if (command in commands) {
            return commands[command](argument);
        }
        else {
            return {
                success: false,
                message: "Invalid command"
            };
        }
    }
}

export default Game;