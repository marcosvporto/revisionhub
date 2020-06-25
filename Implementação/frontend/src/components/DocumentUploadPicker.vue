<template>
    <div id="picker-container" class="flex-row">
        <span>{{(pickedDocument)?pickedDocument.name : ""}}</span>
        <label for="file-upload">
            <i class="far fa-folder-open"></i>
        </label>
        <input id="file-upload" type="file" style="display:none;" @change="selectDocument($event)">
    </div>
</template>

<script>
    export default {
        name: "DocumentUploadPicker",
        data: function () {
            return {
                pickedDocument: null
            }
        },
        methods:
            {
                selectDocument(event) {
                    let files = event.target.files
                    if (files && files.length) {
                        if (files[0].type !== "application/pdf") {
                            alert("O tipo de arquivo deve ser PDF")
                        } else {
                            this.pickedDocument = files[0]
                            this.$emit('change', files[0])
                        }

                    }
                }
            }
    }
</script>

<style scoped>
    #picker-container {
        min-height: 50px;
        color: black;
        border: var(--light) solid 5px;
        align-items: center;
    }

    #picker-container > span {
        width: 90%;
        text-align: left;
        padding-left: 3px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    #picker-container > label {
        cursor: pointer;
    }
</style>