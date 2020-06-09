<template>
    <div class="flex-column">
        <div class="checklist-info">
            <input id="title-input" class="checklist-title" v-model="checklist.title" @input="titleEdited=true"/>
        </div>
        <div id="page-body" class="flex-grow bg-white flex-column">
            <div id="button-group" class="flex-row">
                <i id="add-button" class="fas fa-plus-circle" @click="addCheck"/>
                <button id="save-button" class="rounded-button bg-light-green flex-shrink" @click="saveChecklist">Save
                </button>
            </div>
            <transition-group name="checklist" id="check-container" class="flex-grow flex-column" tag="div">
                <check-edit class="checklist-item" v-for="(check,index) in checks" v-model="checks[index].text"
                            :key="checks[index].id" @remove="removeCheck(index)"
                            @input="editCheck(index)"/>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import CheckEdit from "@/components/CheckEdit";
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    export default {
        name: "ChecklistCreate",
        mixins: [ConnectionMixin],
        components:
            {
                'check-edit': CheckEdit
            },
        props:
            {
                checklist: {
                    require: false,
                    type: Object,
                    default: function () {
                        return {
                            title: 'Titulo da sua checklist',
                            id: -1
                        }
                    }
                }
            },
        data: function () {
            return {
                checks: [],
                authenticatedConnection: null,
                added: [],
                edited: [],
                removed: [],
                titleEdited: false
            }
        },
        methods:
            {
                addCheck() {
                    let check = {
                        text: '',
                        id: this.checks.length,
                        checklist_id: this.checklist.id
                    }
                    this.checks.push(check)
                    this.added.push(check)
                },
                editCheck(index) {
                    let check = this.checks[index]
                    this.edited.push(check)
                },
                removeCheck(index) {
                    let removed = this.checks.splice(index, 1)[0]
                    this.removed.push(removed)
                },
                async saveChecklist() {
                    if (this.checklist.id === -1) {
                        let response
                        try {
                            response = await this.authenticatedConnection.post('/checklists', {
                                title: this.checklist.title
                            })
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                        this.checklist.id = response.data.id
                    }

                    for (let check of this.added) {
                        let response
                        try {
                            response = await this.authenticatedConnection.post('/checklists/' + this.checklist.id + '/checks/', {
                                text: check.text
                            })
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                        check.checklist_id = response.data['checklist_id']
                    }
                    for (let check of this.removed) {
                        if (this.added.indexOf(check) >= 0) {
                            continue
                        }
                        try {
                            await this.authenticatedConnection.delete('/checklists/' + this.checklist.id + '/checks/' + check.id)
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                    }
                    for (let check of this.edited) {
                        if (this.added.indexOf(check) >= 0 || this.removed.indexOf(check) >= 0) {
                            continue
                        }
                        try {
                            await this.authenticatedConnection.put('/checklists/' + this.checklist.id + '/checks/' + check.id, {
                                text: check.text
                            })
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                    }
                    if (this.titleEdited) {
                        try {
                            await this.authenticatedConnection.put('/checklists/' + this.checklist.id, {
                                title: this.checklist.title
                            })
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                    }

                    this.added = []
                    this.removed = []
                    this.edited = []
                    this.titleEdited = false

                    await this.$alert('Salvo com sucesso')
                }
            },
        async mounted() {
            let connection
            try {
                connection = this.getAuthenticatedRoute()
            } catch (error) {
                console.log(error)
                await this.$router.push('/')
                return
            }
            this.authenticatedConnection = connection


            if (this.checklist.id !== null) {


                let response
                /* Requisitando checks */
                try {
                    response = await connection.get('/checklists/' + this.checklist.id + '/checks')
                } catch (e) {
                    if (e.response) {
                        await this.$alert(e.response.data.message)
                    } else {
                        await this.$alert(e)
                    }
                    await this.$router.push('/')
                    return
                }
                this.checks = response.data
            }
        }

    }
</script>

<style scoped>
    #title-input {
        pointer-events: all;
        text-align: center;
        background-color: var(--light);
        border: none;
    }

    #page-body {
        height: 69vh;
    }

    #button-group {
        align-items: center;
    }

    #save-button {
        padding: 13px 50px;
        font-size: 17px;
        color: white;
        font-weight: 400;
        margin-right: 50px;
        margin-left: auto;
        margin-top: 1%;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }

    #add-button {
        color: var(--light-green);
        font-size: 60px;
        cursor: pointer;
        margin-left: 50px;
    }

    #check-container {
        margin-top: 50px;
        padding: 0 50px;
        align-items: center;
        overflow: auto;
    }

    /* Transições */
    .checklist-item {
        width: 100%;
    }

    .checklist-enter-active, .checklist-leave-active {
        transition: all 0.5s;
    }

    .checklist-enter, .checklist-leave-to {
        opacity: 0;
    }
</style>