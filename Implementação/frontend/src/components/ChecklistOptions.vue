<template>
    <div id="select-box" class="flex-column" v-click-outside="close">
        <div id="input-box" class="flex-row flex-shrink">
            <input @click.self="click()" id="select-label" class="flex-grow" v-model="currentLabel"
                   :style="(currentLabel === label)?'color:var(--light)':''"/>
            <i @click.self="click()" id="caret-icon" class="fas fa-caret-down flex-shrink"></i>
        </div>

        <div id="select-options" class="flex-grow" v-show="isOpen">
            <checklistItem
                    v-for="(option,index) in currentOptions"
                    :key="index"
                    @click.native="clickOption(values[index])"
                    v-show="currentOptions.length>0"
            >
                <template v-slot:label>
                    <span id="option-title">{{option}}</span>
                    <span id="option-likes">
                        Likes:{{likes[index]}}
                        <i @click.prevent="$emit('delete',values[index])"
                            v-if="deleting"
                           class="far fa-trash-alt"
                           style="color:black;margin-left:10px;"></i>
                    </span>
                </template>
            </checklistItem>
        </div>
    </div>
</template>

<script>
    import checklistItem from './ChecklistItem'

    export default {
        name: 'checklistOpcoes',
        components: {
            checklistItem: checklistItem
        },
        props: {
            label: String,
            options: {
                required: true,
                type: Array
            },
            values: {
                required: true,
                type: Array
            },
            likes: {
                required: true,
                type: Array
            }
            value: {
                required: true
            },
            deleting: {
                required: false,
                default: () => false,
                type: Boolean
            }
        },
        data: function () {
            return {
                isOpen: false,
                searchValue: ''
            }
        },
        methods: {
            click() {
                if (this.options.length > 0) {
                    this.isOpen = !this.isOpen
                }
            },
            close() {
                this.isOpen = false
            },
            clickOption(option) {
                this.close()
                this.$emit('input', option)
            }
        },
        computed: {
            currentLabel: {
                //Função que determina a mensagem a ser mostrada na caixa do dropdown.
                //Entrada: Estado atual do dropdown, termo de pesquisa digitado pelo usuário, lista de opções do dropdown.
                //Tarefa: Mostrar um texto informativo sobre o estado atual do dropdown. No caso do dropdown estar fechado
                //deve ser mostrado ou a opção atualmente selecionada ou, caso não haja seleção, um label que indentifique
                //que ação o usuário tomar. Caso o dropdown esteja aberto deve ser mostrado o termo de busca do usuário.
                //V&V: O status do dropdown é checado, dependendo dele é checado se existe seleção, caso exista ela é mostrada,
                //caso contrário é mostrada a label. Se o dropdown estiver fechado a label é mostrada.
                //Pós Condições: Exibição de uma mensagem informativa sobre o status atual do dropdown para o usuário.
                get() {
                    if (!this.isOpen) {
                        if (this.value !== null) {
                            let index = this.values.findIndex(value => {
                                return value === this.value
                            })
                            return this.options[index]
                        } else {
                            return this.label
                        }
                    } else {
                        return this.searchValue
                    }
                },
                set(newValue) {
                    this.searchValue = newValue
                }
            },
            currentOptions() {
                if (!this.searchValue) return this.options
                else {
                    return this.options.filter((option) => {
                        return option.toLowerCase().includes(this.searchValue.toLowerCase())
                    })
                }
            }
        }
    }
</script>

<style scoped>
    #select-box {

        height: 100%;
        width: 100%;
    }

    #input-box {
        background: #fff;
        align-items: center;
        position: relative;
        padding: 0 5px;
        min-height: 50px;
    }

    #select-label {
        height: 90%;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        min-height: 25px;
        border: none;
        font-size: 15px;
    }

    #select-options {
        width: 100%;
        max-height: 300px;
        overflow: auto;
        border: 1px #bbb solid;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        box-shadow: 0 0 1px 1px #ddd;
    }

    #option-likes {
        margin-left: auto;
        margin-right: 5px;
        color: var(--light-green);
        font-size: small;
    }

    #caret-icon {
        color: black;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
