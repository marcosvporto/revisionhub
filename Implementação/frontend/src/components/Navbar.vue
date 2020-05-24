<template>
    <nav>
        <div class="navbar-title">
            <img src="../assets/img/rev-hub-icon.svg" width="90" height="100" alt="Icone">
            <span class="title-text">
                <slot name="default"></slot>
            </span>
        </div>
        <div>
            <span class="title-text">
                <slot name="highlighted-text"></slot>
            </span>
        </div>
        <div class="button-group">
            <button id="listButton" class="bg-light">Minhas Listas</button>
            <button id="logButton" class="bg-light-green">Registrar</button>
        </div>

    </nav>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    nav
    {
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .navbar-title
    {
        margin-left: 10px;
        display: flex;
        align-items: center;
    }
    .title-text
    {
        font-weight: 300;
        font-size: 25px;
    }
    .button-group
    {

    }
    .button-group > button
    {
        margin: 10px 15px;
        padding: 12px 20px;
        border-radius: 5px;
        font-size: 17px;
        color: white;
        font-weight: 400;
        cursor: pointer;
        border: none;
    }
</style>