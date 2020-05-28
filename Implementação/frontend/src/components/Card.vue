<template>
    <div id="background" @click.self="$emit('close')">
        <div id="card-container">
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
        name: "Card"
    }
</script>

<style scoped>
    #background
    {
        position: absolute;
        top:0;
        left: 0;
        background-color: transparent;
        width: 100vw;
        height: 100vh;
        z-index: 9000;
        backdrop-filter: blur(1px);
    }
    #card-container
    {
        position: absolute;
        top: 40%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        height: 300px;
        z-index: 99999;
        background-color: white;
        /* Sombra suave */
        box-shadow:
                0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06),
                0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                0 100px 80px rgba(0, 0, 0, 0.12);
    }
    #card-title
    {
        background-color: var(--dark);
        height: 40%;
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 300;
        font-size: 25px;
        padding: 10px;
    }
    #card-reason
    {
        margin-left: auto;
        margin-right: 8px;
        font-weight: 700;
    }
    #card-body
    {
        width: 100%;
        height: 60%;
        padding:20px;
    }
</style>