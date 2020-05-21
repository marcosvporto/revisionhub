<template>
    <div class="main-container">
        <div id="text-box">
            <div id="main-text">Descubra Checklists</div>
            <div id="secondary-text">
                Uma aplicação web que te ajudará a achar a melhor lista de inspeção.
            </div>
        </div>
        <div id="select-container">
            <checklist-opcoes class="select-box"></checklist-opcoes>
            <button>Go</button>
        </div>

    </div>
</template>

<script>
    import CheckListOpcoes from './ChecklistOpcoes'
    export default {
        name: "ChecklistChoice",
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
        margin-bottom: 30px;
    }
    #main-text
    {
        font-size: 50px;
        white-space: nowrap;
        margin-bottom: 30px;
    }
    #secondary-text
    {
        font-size: 20px;
    }

    #select-container
    {
        width: 70%;
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
        border-radius: 8px;
        border: none;
        color: var(--dark);
        height:100%;
    }

    .main-container
    {
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: baseline;
        padding:20px;
    }
</style>