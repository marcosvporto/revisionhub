<template>
    <div class="flex-column">
        <div class="checklist-info">
            <input id="title-input" class="checklist-title" v-model="mockedTitle"/>
        </div>
        <div id="page-body" class="flex-grow bg-white flex-column">
            <div id="button-group" class="flex-row">
                <i id="add-button" class="fas fa-plus-circle" @click="addCheck"/>
                <button id="save-button" class="rounded-button bg-light-green flex-shrink" @click="saveChecklist">Save</button>
            </div>
            <transition-group name="checklist" id="check-container" class="flex-grow flex-column" tag="div">
                <check-edit class="checklist-item" v-for="(check,index) in mockedChecklist" v-model="mockedChecklist[index]" :key="values[index]" @remove="removeCheck(index)"/>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import CheckEdit from "@/components/CheckEdit";
    export default {
        name: "ChecklistCreate",
        components:
        {
            'check-edit': CheckEdit
        },
        props:
        {
            checklistId: {
                require: false,
                type: Number
            }
        },
        data: function()
        {
            return {
                mockedTitle: 'Checklist Teste',
                mockedChecklist: ['Check1','Check2','Check Test','Check Test','Check Test','Check Test','Check Test','Check Test','Check Test','Check Test'],
                values: [1,2,3,4,5,6,7,8,9,10]
            }
        },
        methods:
        {
            addCheck()
            {
                this.mockedChecklist.unshift("")
                this.values.unshift(this.values.length+1)
            },
            removeCheck(index)
            {
                this.mockedChecklist.splice(index,1)
                this.values.splice(index,1)
            },
            saveChecklist()
            {
                this.$router.push({name:'MyChecklists'})
            }
        }

    }
</script>

<style scoped>
    #title-input
    {
        pointer-events: all;
        text-align: center;
        background-color: var(--light);
        border: none;
    }
    #page-body
    {
        height: 69vh;
    }
    #button-group
    {
        align-items: center;
    }
    #save-button
    {
        padding: 13px 50px;
        font-size: 17px;
        color: white;
        font-weight: 400;
        margin-right: 50px;
        margin-left: auto;
        margin-top:1%;
        box-shadow: 0 10px 10px rgba(0,0,0,0.1);
    }
    #add-button
    {
        color: var(--light-green);
        font-size: 60px;
        cursor: pointer;
        margin-left: 50px;
    }
    #check-container
    {
        margin-top:50px;
        padding: 0 50px;
        align-items: center;
        overflow: auto;
    }
    /* Transições */
    .checklist-item
    {
        width: 100%;
    }
    .checklist-enter-active, .checklist-leave-active {
        transition: all 0.5s;
    }
    .checklist-enter, .checklist-leave-to {
        opacity: 0;
    }
</style>