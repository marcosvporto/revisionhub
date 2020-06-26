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
                    if(!(this.added.indexOf(check)>=0 || this.edited.indexOf(check)>=0))
                    {
                        this.edited.push(check)
                    }
                },
                removeCheck(index) {
                    let removed = this.checks.splice(index, 1)[0]

                    let added = this.added.indexOf(removed)
                    if(added>=0)
                    {
                        this.added.splice(added,1)
                        return
                    }

                    let edited = this.edited.indexOf(removed)
                    if(edited>=0)
                    {
                        this.edited.splice(edited,1)
                    }

                    this.removed.push(removed)
                },
                //Função dedicada a salvar checklists
                async saveChecklist() {
                    //Entrada: Id e título da checklist atualmente sendo editada/criada.
                    //Tarefa: Checar se se trata de uma edição/criação. Caso seja uma criação uma requisição deve ser feita
                    //para comunicar a criação da checklist para o BackEnd
                    //V&V: O id da checklist é inicializado como -1 e só é preenchido se a checklist existe no BackEnd. Caso
                    //o id seja -1 é feita uma requisição para o servidor informando o título da nova checklist. A resposta
                    //recebida do servidor contém detalhes sobre a nova checklist, incluindo seu id que é capturado e preenchido para
                    //evitar que essa requisição se repita no próximo salvamento
                    //Pós Condições: Checklist criada no servidor caso se trate de uma criação de checklist e inalterada
                    //caso seja uma edição.
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
                        check.id = response.data['id']

                    }
                    this.added = []

                    for (let check of this.removed) {
                        try {
                            await this.authenticatedConnection.delete('/checklists/' + this.checklist.id + '/checks/' + check.id)
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                    }
                    this.removed = []

                    for (let check of this.edited) {
                        try {
                            await this.authenticatedConnection.put('/checklists/' + this.checklist.id + '/checks/' + check.id, {
                                text: check.text
                            })
                        } catch (e) {
                            await this.handleResponseError(e)
                            return
                        }
                    }
                    this.edited = []

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
                    this.titleEdited = false

                    await this.$alert('Salvo com sucesso')
                }
            },
        async mounted() {
            let connection
            try {
                connection = this.getAuthenticatedRoute()
            } catch (error) {
                await this.$router.push('/')
                return
            }
            this.authenticatedConnection = connection


            if (this.checklist.id !== -1) {
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
        padding: 20px 10px;
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
        margin-left: 50px;
        cursor: pointer;
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