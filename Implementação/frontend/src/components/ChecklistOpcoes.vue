<template>
    <div class="select-box" v-click-outside="close">
        <input @click.self="click()" class="select-label" v-model="currentLabel"
               :style="(currentLabel === label)?'color:var(--light)':''"/>
        <i @click.self="click()" class="fas fa-caret-down caret-icon"></i>
        <div class="select-options" v-show="isOpen">
            <checklistItem
                    v-for="(option,index) in currentOptions"
                    :key="index"
                    @click.native="clickOption(values[index])"
                    v-show="currentOptions.length>0"
            >
                <template v-slot:label>{{option}}</template>
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
                get() {
                    if (!this.isOpen) {
                        if (this.value) {
                            return this.options[this.values.findIndex(v => {
                                return v === this.value
                            })]
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
    /* Corpo do select */
    input:focus {
        outline: none;
    }

    .select-box {
        background: #fff;
        display: flex;
        flex-flow: row;
        align-items: center;
        position: relative;
        padding: 0 5px;
        height: 100%;
        width: 100%;
    }

    .select-label {
        flex: 1 1 auto;
        height: 90%;
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        min-height: 25px;
        border: none;
        font-size: 15px;
    }

    .select-options {
        width: 100%;
        height: fit-content;
        z-index: 100;
        position: absolute;
        top: 100%;
        left:0;
        border: 1px #bbb solid;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        box-shadow: 0 0 1px 1px #ddd;
    }

    .caret-icon {
        flex: 0 0 auto;
        color:black;
        cursor:pointer;
        height: 100%;
        display:flex;
        align-items: center;
    }
</style>
