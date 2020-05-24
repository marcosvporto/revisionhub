<template>
    <div class="main-container flex-column">
        <div id="text-box">
            <div id="main-text">Descubra Checklists</div>
            <div id="secondary-text">
                Uma aplicação web que te ajudará a achar a melhor lista de inspeção.
            </div>
        </div>
        <div id="select-container" class="flex-row">
            <checklist-opcoes class="select-box flex-grow" :options="optionsMock" :values="values" v-model="selectedChecklist" label="Escolha uma checklist"></checklist-opcoes>
            <button @click="selectChecklist" class="bg-light flex-shrink">Go</button>
        </div>

    </div>
</template>

<script>
    import CheckListOpcoes from './ChecklistOptions'
    export default {
        name: "ChecklistChoice",
        components:
        {
            'checklist-opcoes': CheckListOpcoes
        },
        data: function() {
            return {
                optionsMock: ['Teste1','Teste2','Checklist Teste'],
                values: [1,2,3],
                selectedChecklist: null
            };
        },
        methods:
        {
            selectChecklist()
            {
                if(this.selectedChecklist !== null)
                {
                    this.$router.push({name:"View",params: { checklistId: this.selectedChecklist }},)
                }
            }
        }
    }
</script>

<style scoped>
    #text-box
    {
        color:var(--light);
        text-align: justify;
        width: min-content;
        margin-bottom: 50px;
        margin-top: 10%
    }
    #main-text
    {
        font-size: 50px;
        font-weight: bold;
        white-space: nowrap;
        margin-bottom: 20px;
    }
    #secondary-text
    {
        font-size: 20px;
    }

    #select-container
    {
        width: 60%;
        justify-content: space-between;
        min-width: 450px;
        height: 50px;
    }
    .select-box
    {
        height:100%;
    }
    #select-container > button
    {
        padding: 12px 35px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: none;
        color: var(--dark);
        height:100%;
        font-weight: 400;
        font-size: 20px;
        cursor: pointer;
    }

    .main-container
    {
        text-align: left;
        align-items: baseline;
        padding:20px;
    }
</style>