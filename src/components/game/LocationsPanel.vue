<template>
    <div class="room-locations-card">
        <div>
            <h2> Locations </h2>
            <hr>
            <div class="panel-location-group" v-if="showCompass">
                <h3> You can go: </h3>
                <button class="room-location-btn" v-for="(item, index) in locations.compass" :key="index" @click="$emit('location-click', item)">
                    {{ item }}
                </button>
            </div>
            <div class="panel-location-group" v-if="showMap">
                <h3> You can enter: </h3>
                <button class="room-location-btn" v-for="(item, index) in locations.map" :key="index" @click="$emit('location-click', item)">
                    {{ item }}
                </button>
            </div>
            <p v-if="!showCompass && !showMap"> No locations available! </p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        locations: {
            required: true,
            type: Object
        }
    },
    computed: {
        showCompass() {
            return this.locations.compass.length > 0;
        },
        showMap() {
            return this.locations.map.length > 0;
        }
    }
}
</script>

<style scoped>
h2, h3 {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
}
.room-locations-card {
    min-width: 200px;
    border: 1px solid black;
    padding-left: 10px;
    padding-right: 10px;
}
.room-location-btn {

}
</style>