<template>
    <div class="main-container flex-column fill-screen">
        <div id="text-box">
            <div id="main-text">Descubra Checklists</div>
            <div id="secondary-text">
                Uma aplicação web que te ajudará a achar a melhor lista de inspeção.
            </div>
        </div>
        <div id="select-container" class="flex-row">
            <checklist-opcoes class="select-box flex-grow" :options="options" :values="values" :likes="likes"
                              v-model="selectedChecklist" label="Escolha uma checklist"></checklist-opcoes>
            <button @click="selectChecklist" class="bg-light flex-shrink">Go</button>
        </div>

    </div>
</template>

<script>
    import CheckListOpcoes from './ChecklistOptions'
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    export default {
        name: "ChecklistChoice",
        components:
            {
                'checklist-opcoes': CheckListOpcoes
            },
        mixins: [ConnectionMixin],
        data: function () {
            return {
                checklists: [],
                selectedChecklist: null
            };
        },
        methods:
            {
                selectChecklist() {
                    if (this.selectedChecklist !== null) {
                        this.$router.push({
                            name: "View",
                            params: {checklist: this.checklists.find(x => x.id === this.selectedChecklist)}
                        },)
                    }
                }
            },
        computed:
            {
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
            let connection = this.getUnauthenticatedRoute()
            let response
            try {
                response = await connection.get('/checklists')
            } catch (e) {
                await this.handleResponseError(e)
                return
            }
            this.checklists = response.data.sort((check1, check2) => check2.likes - check1.likes) || []
        }
    }
</script>

<style scoped>
    #text-box {
        color: var(--light);
        text-align: justify;
        width: min-content;
        margin-bottom: 50px;
        margin-top: 10%
    }

    #main-text {
        font-size: 50px;
        font-weight: bold;
        white-space: nowrap;
        margin-bottom: 20px;
    }

    #secondary-text {
        font-size: 20px;
    }

    #select-container {
        width: 60%;
        justify-content: space-between;
        min-width: 450px;
        height: 50px;
    }

    .select-box {
        height: 100%;
    }

    #select-container > button {
        padding: 12px 35px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border: none;
        color: var(--dark);
        height: 100%;
        font-weight: 400;
        font-size: 20px;
        cursor: pointer;
    }

    .main-container {
        text-align: left;
        align-items: baseline;
        padding: 20px;
    }
</style>