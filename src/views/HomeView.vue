<template>
  <div id="game-wrapper">
      <div class="flexbox">
          <game-area :log-list="logs" :current-room="room" @command-input="onCommandInput"></game-area>
          <locations-panel :locations="locations" @location-click="onLocationClick"> </locations-panel>
      </div>
  </div>
</template>

<script>
import LocationsPanel from "@/components/game/LocationsPanel.vue";
import GameArea from "@/components/game/GameArea.vue";
import game from "@/scripts/game/demo";

export default {
    components: { LocationsPanel, GameArea },
    data () {
        return {
            room: null,
            logs: [],
            locations: {
                compass: {},
                map: {}
            },
            inputState: {
                input: ""
            },
        };
    },
    methods: {
        update (room, command) {
            // Updating current room
            this.room = room ;

            // Updating room locations
            this.locations.compass = this.room.compass.getAll(true);
            this.locations.map = this.room.map.getAll(true);

            // Adding to game log
            this.logs.push({
                command,
                text: this.room.description
            });
        },
        onLocationClick (location) {
            const {room, command} = game.travel(location);
            this.update(room, command);
        },
        onCommandInput (command) {
            const status = game.handleInput(command);
            if (status.success) {
                if (status.room) {
                    this.update(status.room, status.command);
                }
            }
            else {
                // TODO: Show command errors
                console.log(status.message)
            }
        }
    },
    created() {
        this.update(game.currentRoom, "start");
    },
}
</script>

<style scoped>
#game-wrapper {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 12px;
}
.flexbox {
  display: flex;
}
</style>