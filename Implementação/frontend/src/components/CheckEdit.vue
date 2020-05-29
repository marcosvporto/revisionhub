<template>
    <div id="check-body" class="flex-row">
        <textarea id="check-text" class="flex-grow" v-model="value"/>
        <div id="delete-icon" class="flex-row" @click="$emit('remove')"><i class="fas fa-times"></i></div>
    </div>
</template>

<script>
    export default {
        name: "CheckEdit",
        props: {
            value: String,
        },
        watch:
        {
            value(newValue)
            {
                this.$emit('input',newValue)
            }
        }
    }
</script>

<style scoped>
    #check-body
    {
        align-items: start;
        color:var(--blue);
        border:var(--blue) 2px solid;
        margin-bottom: 30px;
        padding: 3px 3px 3px 10px;
    }
    #check-text
    {
        height: 100%;
        border: none;
        box-sizing: border-box;
        color: var(--blue);
        font-size: 20px;
        font-weight: 400;
        min-height: 60px;
    }
    #delete-icon
    {
        height: 100%;
        text-align: center;
        align-items: center;
        padding:10px;
        cursor: pointer;
        color: var(--blue);
        font-size: 30px;
    }
</style>