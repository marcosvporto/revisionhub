<template>
    <nav class="flex-row">
        <login v-if="loginOpen" @close="loginOpen=false"/>
        <div class="navbar-title" @click="returnHome">
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
            <button id="listButton" class="bg-light rounded-button" @click="$router.push('MyChecklists')">Minhas Listas</button>
            <button id="logButton" class="bg-light-green rounded-button" @click="loginOpen=true">Registrar</button>
        </div>
    </nav>
</template>

<script>
    import Login from "@/components/Login";
    export default {
        name: "Navbar",
        components:
        {
            'login':Login
        },
        data() {
            return {
                loginOpen: false
            }
        },
        methods:
        {
            returnHome()
            {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    nav
    {
        align-items: center;
        justify-content: space-between;
    }
    .navbar-title
    {
        margin-left: 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .title-text
    {
        font-weight: 300;
        font-size: 25px;
    }
    .button-group > button
    {
        margin: 10px 15px;
        padding: 12px 20px;
        font-size: 17px;
        color: white;
        font-weight: 400;
    }
</style>