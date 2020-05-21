<template>
    <div class="select-box" v-click-outside="close">
        <input @click.self="click" class="select-label form-control custom-select" v-model="currentLabel" />
        <div class="select-options" v-show="isOpen">
            <checklistItem
                    v-for="(option,index) in currentOptions"
                    :key="index"
                    @click.native="clickOption(option.value)"
                    v-show="currentOptions.length>0"
            >
                <template v-slot:label>{{option.nome}}</template>
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
            options: Array,
            value: {
                required: true
            }
        },
        data: function () {
            return {
                isOpen: false,
                searchValue: ''
            }
        },
        methods: {
            click () {
                if(this.options.length > 0)
                {
                    this.open = !this.open
                }
            },
            close () {
                this.isOpen = false
            },
            clickOption (option) {
                this.close()
                this.$emit('input', option)
            }
        },
        computed: {
            currentLabel: {
                get () {
                    if (!this.isOpen) {
                        if (this.value) {
                            return this.options.find(option => {
                                return option.value === this.value
                            }).nome
                        } else {
                            return this.label
                        }
                    } else {
                        return this.searchValue
                    }
                },
                set (newValue) {
                    this.searchValue = newValue
                }
            },
            currentOptions () {
                if (!this.searchValue) return this.options
                else {
                    return this.options.filter((option) => {
                        return option.nome.toLowerCase().includes(this.searchValue.toLowerCase())
                    })
                }
            }
        }
    }
</script>

<style scoped>
    /* Corpo do select */
    .select-box {
        background: #fff;
        display: flex;
        flex-flow: column;
        align-items: center;
        position: relative;
    }
    .select-label {
        height: 100%;
        width: 100%;
        padding-left: 10px;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        min-height: 25px;
    }
    .select-options {
        width: 100%;
        height: fit-content;
        z-index: 100;
        position: absolute;
        top: 100%;
        border: 1px #bbb solid;
        border-radius: 2px;
        box-shadow: 0 0 1px 1px #ddd;
    }
</style>
