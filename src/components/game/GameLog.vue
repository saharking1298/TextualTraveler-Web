<template>
    <div class="game-log" ref="gameLog">
        <p class="game-log-text" v-for="(item, index) in logList" :key="index">
            <strong> > {{ item.command }} </strong>
            <br>
            {{ item.text }}
        </p>
        <p class="game-log-text game-log-guide"> {{ currentRoom.guide }} </p>
    </div>
</template>

<script>
export default {
    props: {
        logList: {
            required: true,
            type: Array
        },
        currentRoom: {
            required: true,
            type: Object
        }
    },
    watch: {
        logList: {
            handler () {
                const el = this.$refs.gameLog;
                el.scrollTop = el.scrollHeight;
            },
            deep: true
        }
    }
}
</script>

<style>
.game-log {
    border: 1px solid black;
    height: 90vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
}
.game-log-text {
    padding-left: 5px;
    /* padding-right: 5px; */
}
.game-log-guide {
    color: rgb(8, 110, 141);
}
</style>