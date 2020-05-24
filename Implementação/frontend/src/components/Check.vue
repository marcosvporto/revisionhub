<template>
    <div id="check-container" class="flex-row">
        <div id="check-body" class="flex-row flex-grow">
            <span id="check-index" class="flex-shrink">
                {{index}}
            </span>
            <span id="check-content">
                <slot></slot>
            </span>
        </div>
        <div id="check-state">
            <label :for="'checkbox'+index">
                <i v-if="state" class="far fa-check-square"></i>
                <i v-if="!state" class="far fa-square"></i>
            </label>
            <input :id="'checkbox'+index" type="checkbox" v-model="state"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Check",
        props: {
            index: Number,
        },
        data: function() {
            return {
                    state: false
            };
        }
    }
</script>

<style scoped>
    #check-container
    {
        height: 100px;
        width: 100%;
        align-items: center;
        margin-bottom: 12px;
    }
    #check-body
    {
        padding: 20px;
        align-items: start;
        /* Sombra suave */
        box-shadow: 0 3px 15px rgba(0,0,0,0.2);
        height: 100%;
        color:var(--blue);
    }
    #check-index
    {
        color:var(--blue);
        font-size: 50px;
    }
    #check-content
    {
        font-weight: bolder;
        font-size:  18px;
        text-align: left;
        margin: 5px 50px;
        height: 100%;
        overflow: auto;
    }
    #check-state
    {
        height: 100%;
        margin: auto 30px;
        height: auto;
    }
    #check-state > input
    {
        display:none;
    }
    #check-state > label
    {
        color: var(--blue);
        font-size: 30px;
    }
</style>