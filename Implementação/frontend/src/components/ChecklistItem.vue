<template>
    <div class="option-box">
        <span class="option-label">
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
    .option-box{
        border-bottom: 1px #bbb solid;
        width: 100%;
        background: #fff;
        display:flex;
        flex-flow:column;
        cursor:pointer;
        padding: 8px 10px;
    }
    .option-box:hover {
        background: var(--light)
    }
</style>
