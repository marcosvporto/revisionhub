<template>
    <div id="select-box" v-click-outside="close">
        <input @click.self="click()" id="select-label" class="flex-grow" v-model="currentLabel"
               :style="(currentLabel === label)?'color:var(--light)':''"/>
        <i @click.self="click()" id="caret-icon" class="fas fa-caret-down flex-shrink"></i>
        <div id="select-options" v-show="isOpen">
            <checklistItem
                    v-for="(option,index) in currentOptions"
                    :key="index"
                    @click.native="clickOption(values[index])"
                    v-show="currentOptions.length>0"
            >
                <template v-slot:label>
                    <span id="option-title">{{option}}</span>
                    <span id="option-likes">Likes:{{likes[index]}}</span>
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
                        if (this.value !== null) {
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
    #select-box {
        background: #fff;
        display: flex;
        flex-flow: row;
        align-items: center;
        position: relative;
        padding: 0 5px;
        height: 100%;
        width: 100%;
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
        z-index: 100;
        position: absolute;
        top: 100%;
        left:0;
        border: 1px #bbb solid;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        box-shadow: 0 0 1px 1px #ddd;
    }

    #option-likes
    {
        margin-left:auto;
        margin-right: 5px;
        color: var(--light-green);
        font-size: small;
    }

    #caret-icon {
        color:black;
        cursor:pointer;
        height: 100%;
        display:flex;
        align-items: center;
    }
</style>
