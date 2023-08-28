<template>
    <div class="game-area">
        <div class="game-log" ref="gameLog">
            <p class="game-log-text" v-for="(item, index) in logList" :key="index">
                <strong> > {{ item.command }} </strong>
                <br>
                {{ item.text }}
            </p>
            <p class="game-log-text game-log-guide"> {{ currentRoom.guide }} </p>
        </div>
        <div class="game-command-input">
            <hr>
            <label for="user-input"> What do you want to now? </label>
            <input type="text" id="user-input" v-model="input" @keydown.enter="onCommandInput">
        </div>
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
    data () {
        return {
            input: "",
        };
    },
    watch: {
        logList: {
            handler () {
                const el = this.$refs.gameLog;
                el.scrollTop = el.scrollHeight;
            },
            deep: true
        },
        inputState (value) {
            this.input = value;
        }
    },
    methods: {
        onCommandInput () {
            this.$emit("command-input", this.input);
            this.input = "";
        }
    }
}
</script>

<style>
.game-area {
    border: 1px solid black;
    height: 90vh;
    overflow-y: scroll;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.game-log {
    overflow-y: scroll;
    scroll-behavior: smooth;
}
.game-log-text {
    padding-left: 5px;
    padding-right: 5px;
}
.game-log-guide {
    color: rgb(8, 110, 141);
}
.game-command-input {
    margin-bottom: 8px;
}
.game-command-input label {
    display: block;
    text-align: center;
}
.game-command-input input[type=text]{
    display: block;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
}
</style>