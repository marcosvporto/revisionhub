<template>
    <div id="option-box">
        <span id="option-label">
            <slot name="label"></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'checklistItem'
    }
</script>

<style scoped>
    /* Corpo da opção */
    #option-box {
        border-bottom: 1px #bbb solid;
        background: #fff;
        display: flex;
        flex-flow: column;
        cursor: pointer;
        padding: 8px 10px;
    }

    #option-box:hover {
        background: var(--light)
    }

    #option-label {
        color: var(--dark);
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
</style>
