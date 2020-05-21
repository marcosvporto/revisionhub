<template>
    <nav>
        <div class="navbar-title">
            <img src="../assets/img/placeholder.png" width="90" height="100" alt="Icone">
            <span class="title-text"><slot></slot></span>
        </div>

        <div class="button-group">
            <button id="listButton">Minhas Listas</button>
            <button id="logButton">Registrar</button>
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
        display: flex;
        align-items: center;
    }
    .title-text
    {
        font-weight: 500;
        font-size: 23px;
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
    }
    #listButton
    {
        background-color: var(--light);
        border: none;
    }
    #logButton
    {
        background-color: var(--light-green);
        border: none;
    }
</style>