<template>
    <card @close="$emit('close')">
        <template slot="title">Upload</template>
        <template slot="body">
            <span>Selecione um arquivo pdf:</span>
            <picker @change="selectedDocument=$event"/>
            <div id="button-group" class="flex-row">
                <button id="button-ok" class="bg-light-green" @click="submit">Ok</button>
                <button id="button-cancel" class="bg-red" @click="$emit('close')">Cancelar</button>
            </div>
        </template>
    </card>

</template>

<script>
    import DocumentUploadPicker from "@/components/DocumentUploadPicker";
    import Card from "@/components/Card";

    export default {
        name: "DocumentUploadCard",
        components: {
            'picker': DocumentUploadPicker,
            'card': Card
        },
        data: function () {
            return {
                selectedDocument: null
            }
        },
        methods: {
            submit() {
                if (this.selectedDocument) {
                    this.$emit('submit', this.selectedDocument)
                    this.$emit('close')
                } else {
                    alert('Selecione um documento PDF')
                }
            }
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
    }
</style>