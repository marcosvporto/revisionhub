<template>
    <div class="flex-column fill-screen">
        <div class="checklist-info flex-shrink">
            <span class="checklist-title">
                Minhas Checklists
            </span>
        </div>
        <div id="page-body" class="flex-grow bg-white flex-column">
            <button class="bg-light-green rounded-button" @click="createChecklist">Create</button>
            <div id="body-container" class="flex-column flex-grow">
                <span id="select-label" class="flex-shrink">Administre suas checklists aqui</span>
                <div id="select-container" class="flex-row flex-shrink">
                    <checklist-options class="select-box" :options="options" :values="values" :likes="likes"
                                       :deleting="true" @delete="deleteChecklist($event)"
                                       v-model="selectedChecklist" label="Escolha uma checklist"></checklist-options>
                    <button class="bg-white rounded-button"
                            :class="(selectedChecklist!=null)?'enabled-edit':'disabled-edit'" @click="editChecklist">
                        Editar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChecklistOptions from "@/components/ChecklistOptions";
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    export default {
        name: "ChecklistMyChecklists",
        components:
            {
                'checklist-options': ChecklistOptions
            },
        mixins: [ConnectionMixin],
        data: function () {
            return {
                selectedChecklist: null,
                checklists: [],
                connection: null
            };
        },
        methods: {
            editChecklist() {
                if (this.selectedChecklist != null) {
                    this.$router.push({
                        name: 'Edit',
                        params: {checklist: this.checklists.find(x => x.id == this.selectedChecklist)}
                    })
                }
            },
            createChecklist() {
                this.$router.push({name: 'Create'})
            },
            async deleteChecklist(id) {
                const checklist = this.checklists.find((el) => el.id === id)
                if (checklist) {
                    try {
                        await this.connection.delete('/checklists/' + checklist.id)
                    } catch (e) {
                        await this.handleResponseError(e)
                        return
                    }
                    this.checklists.splice(this.checklists.findIndex((el) => el.id === id),1)
                    this.$alert('Removido com sucesso')
                }
            }
        },
        computed: {
            options() {

                return this.checklists.map(x => {
                    return x.title
                })
            },
            likes() {
                return this.checklists.map(x => {
                    return x.likes
                })
            },
            values() {
                return this.checklists.map(x => {
                    return x.id
                })
            }
        },
        async mounted() {
            try {
                this.connection = this.getAuthenticatedRoute()
            } catch (error) {
                await this.handleResponseError(error)
                await this.$router.push('/')
                return
            }
            let response
            try {
                response = await this.connection.get('/checklists/' + this.getUserId())
            } catch (e) {
                await this.handleResponseError(e)
                await this.$router.push('/')
                return
            }
            this.checklists = response.data
        }
    }
</script>

<style scoped>
    #page-body > button {
        padding: 10px 30px;
        font-size: 17px;
        color: white;
        font-weight: 400;
        margin-left: 50px;
        margin-right: auto;
        margin-top: 5%;
        box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    }

    #body-container {
        color: var(--blue);
        height: 65px;
        width: 50%;
        min-width: 450px;
        margin-left: 50px;
        margin-right: auto;
        margin-top: 5%;
        text-align: left;
    }


    .disabled-edit {
        padding: 12px 40px;
        color: var(--light);
        border: var(--light) 3px solid;
        height: 50px;
        font-weight: 400;
        font-size: 15px;
        margin-left: 35px;
    }

    .enabled-edit {
        padding: 12px 40px;
        color: var(--light-green);
        border: var(--light-green) 3px solid;
        height: 50px;
        font-weight: 400;
        font-size: 15px;
        margin-left: 35px;
    }

    #select-label {
        font-size: 15px;
        margin: 2px 5px;
    }

    .select-box {
        border: var(--blue) 3px solid;
        height: 50px;
    }
</style>