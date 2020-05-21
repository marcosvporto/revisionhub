<template>
    <div class="main-container">
        <div id="text-box">
            <div id="main-text">Descubra Checklists</div>
            <div id="secondary-text">
                Uma aplicação web que te ajudará a achar a melhor lista de inspeção.
            </div>
        </div>
        <div id="select-container">
            <checklist-opcoes class="select-box" :options="optionsMock" :values="values" v-model="selectedChecklist" label="Escolha uma checklist"></checklist-opcoes>
            <button>Go</button>
        </div>

    </div>
</template>

<script>
    import CheckListOpcoes from './ChecklistOpcoes'
    export default {
        name: "ChecklistChoice",
        data: function() {
            return {
                optionsMock: ['Teste1','Teste2','Checklist Teste'],
                values: [1,2,3],
                selectedChecklist: null
            };
        },

        components:
        {
            'checklist-opcoes': CheckListOpcoes
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
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        min-width: 450px;
        height: 50px;
    }
    .select-box
    {
        flex: 1 1 auto;
        height:100%;
    }
    #select-container > button
    {
        flex: 0 1 auto;
        padding: 12px 35px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: none;
        color: var(--dark);
        background-color: var(--light);
        height:100%;
    }

    .main-container
    {
        text-align: left;
        display: flex;
        flex-direction: column;
        align-items: baseline;
        padding:20px;
    }
</style>