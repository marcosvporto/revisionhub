<template>
    <card @close="$emit('cancel')">
        <template slot="title">Finalizar</template>
        <template slot="body">
            <span>Você deseja dar sua opinião sobre essa checklist?</span>
            <div id="button-group" class="flex-row">
                <button id="button-ok" class="bg-light-green" @click="$emit('like')">Like</button>
                <button id="button-continue" class="bg-light" @click="$emit('close')">Continuar</button>
                <button id="button-cancel" class="bg-red" @click="$emit('cancel')">Cancelar</button>
            </div>
        </template>
    </card>
</template>

<script>
    import Card from "@/components/Card";

    export default {
        name: "DocumentLikeCard",
        components:
            {
                'card': Card
            }
    }
</script>

<style scoped>
    #card-body > span {
        color: black;
        text-align: left;
        font-weight: bolder;
        margin-bottom: 10px;
    }

    #button-group {
        justify-content: space-between;
        padding: 10px 30px;
        margin-top: auto;
        margin-bottom: 3px;

    }

    #button-group > button {
        color: white;
        padding: 8px 30px;
        border: none;
        cursor: pointer;
        margin-right: 5px;
    }
</style>