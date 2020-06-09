<template>
    <div id="background" @mousedown.self="$emit('close')">
        <div id="card-container" :style="{'height':height,'width':width}">
            <div id="card-title">
                <img src="../assets/img/rev-hub-icon.svg" width="90" height="100" alt="Icone">
                RevHub
                <span id="card-reason"><slot name="title"></slot></span>
            </div>
            <div id="card-body" class="flex-column">
                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:
            {
                height: {
                    required: false,
                    default: "300px"
                },
                width: {
                    required: false,
                    default: "400px"
                }
            }
    }
</script>

<style scoped>
    #background {
        position: absolute;
        top: 0;
        left: 0;
        background-color: transparent;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        backdrop-filter: blur(1px);
    }

    #card-container {
        min-height: 200px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 400px;
        height: 300px;
        z-index: 200;
        background-color: white;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
    }

    #card-title {
        background-color: var(--dark);
        height: 100px;
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 300;
        font-size: 25px;
        padding: 10px;
    }

    #card-reason {
        margin-left: auto;
        margin-right: 8px;
        font-weight: 700;
    }

    #card-body {
        width: 100%;
        height: 60%;
        padding: 20px;
    }
</style>