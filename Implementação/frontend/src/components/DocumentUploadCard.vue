<template>
    <div id="background" @click.self="$emit('close')">
        <div id="card-container">
            <div id="card-title">
                <img src="../assets/img/rev-hub-icon.svg" width="90" height="100" alt="Icone">
                RevHub
                <span id="card-reason">Upload</span>
            </div>
            <div id="card-body" class="flex-column">
                <span>Selecione um arquivo pdf:</span>
                <picker @change="selectedDocument=$event"/>
                <div id="button-group" class="flex-row">
                    <button id="button-ok" class="bg-light-green" @click="submit">Ok</button>
                    <button id="button-cancel" class="bg-red" @click="$emit('close')">Cancelar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import DocumentUploadPicker from "@/components/DocumentUploadPicker";
    export default {
        name: "DocumentUploadCard",
        components:{
            'picker': DocumentUploadPicker
        },
        data: function() {
            return {
                selectedDocument: null
            }
        },
        methods: {
            submit()
            {
                if(this.selectedDocument)
                {
                    this.$emit('submit',this.selectedDocument)
                    this.$emit('close')
                }
                else
                {
                    alert('Selecione um documento PDF')
                }
            }
        }
    }
</script>

<style scoped>
    #background
    {
        position: absolute;
        top:0;
        left: 0;
        background-color: transparent;
        width: 100vw;
        height: 100vh;
        z-index: 9000;
    }
    #card-container
    {
        position: absolute;
        top: 40%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 400px;
        height: 300px;
        z-index: 99999;
        background-color: white;
        /* Sombra suave */
        box-shadow:
                0 2.8px 2.2px rgba(0, 0, 0, 0.034),
                0 6.7px 5.3px rgba(0, 0, 0, 0.048),
                0 12.5px 10px rgba(0, 0, 0, 0.06),
                0 22.3px 17.9px rgba(0, 0, 0, 0.072),
                0 41.8px 33.4px rgba(0, 0, 0, 0.086),
                0 100px 80px rgba(0, 0, 0, 0.12);
    }
    #card-title
    {
        background-color: var(--dark);
        height: 40%;
        width: 100%;
        display: flex;
        align-items: center;
        font-weight: 300;
        font-size: 25px;
        padding: 10px;
    }
    #card-reason
    {
        margin-left: auto;
        margin-right: 8px;
        font-weight: 700;
    }
    #card-body
    {
        width: 100%;
        height: 60%;
        padding:20px;
    }
    #card-body > span
    {
        color:black;
        text-align: left;
        font-weight: bolder;
        margin-bottom: 10px;
    }
    #button-group
    {
        justify-content: space-between;
        padding: 10px 30px;
        margin-top:auto;
        margin-bottom:3px;

    }
    #button-group > button
    {
        color:white;
        padding: 8px 30px;
        border:none;
        cursor:pointer;
    }
</style>