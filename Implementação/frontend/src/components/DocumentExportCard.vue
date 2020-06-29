<template>
    <card @close="$emit('close')">
        <template slot="title">Exportar</template>
        <template slot="body">
            <span>Deseja exportar o documento?</span>
            <div id="button-group" class="flex-row">
                <button id="button-ok" class="bg-light-green" @click="$emit('export')">Exportar</button>
                <button id="button-cancel" class="bg-red" @click="$emit('close')">Cancelar</button>
            </div>
        </template>
    </card>
</template>

<script>
    import Card from "@/components/Card";

    export default {
        name: "DocumentExportCard",
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
    }
</style>