<template>
  <div id="game-wrapper">
      <div class="flexbox">
          <game-log :log-list="logs" :current-room="room"></game-log>
          <locations-panel :locations="locations" @location-click="onLocationClick"> </locations-panel>
      </div>
  </div>
</template>

<script>
import LocationsPanel from "@/components/game/LocationsPanel.vue";
import GameLog from "@/components/game/GameLog.vue";
import game from "@/scripts/game/demo";

export default {
components: { LocationsPanel, GameLog },
  data () {
      return {
          room: game.currentRoom,
          logs: [],
          locations: {compass: {}, map: {}}
      };
  },
  methods: {
      update (command) {
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
          this.room = room;
          this.update(command);
      }
  },
  created() {
      this.update("start");
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