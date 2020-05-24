<template>
    <div style="display:flex;flex-direction: column;">
        <upload-card v-if="picking"
                     @submit="selectDocument($event)"
                     @close="picking=false"
        />
        <div id="checklist-info">
            <span id="checklist-title">{{tituloMockado}}</span>
            <span id="checklist-description">Likes: {{numLikesMockado}}</span>
        </div>
        <div id="checklist-container">
            <div id="checklist-actions">
                <i class="fas fa-plus-circle" @click="picking=true"/>
                <button class="bg-blue">Export</button>
            </div>
            <div id="checklist-body">
                <div id="checklist-document">
                    <pdf v-if="selectedDocument" :src="selectedDocument" :page="currentPage" @num-pages="maxPage = $event"></pdf>
                    <i class="fas fa-arrow-left" v-if="selectedDocument" @click="pageIndex--"></i>
                    <i class="fas fa-arrow-right" v-if="selectedDocument" @click="pageIndex++"></i>
                </div>
                <div id="checklist-checks">

                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import pdf from 'vue-pdf'
    import DocumentUploadCard from "@/components/DocumentUploadCard";

    export default {
        name: "ChecklistView",
        components: {
            pdf,
            'upload-card':DocumentUploadCard
        },
        props:
        {
            checklistId: Number
        },
        data: function(){
            return {
                picking: false,
                tituloMockado: "Checklist 1",
                numLikesMockado: 3,
                selectedDocument: null,
                pageIndex: 0,
                maxPage: null
            }
        },
        methods: {
            selectDocument(file)
            {
                var reader = new FileReader()
                reader.onload = () => {
                    this.selectedDocument = reader.result
                    this.pageIndex = 0
                }
                reader.readAsDataURL(file)
            }
        },
        computed:
        {
            currentPage()
            {
                if(this.pageIndex >= 0)
                {
                    return (this.pageIndex + 1)%this.maxPage + 1
                }
                else
                {
                    return this.maxPage - ((-this.pageIndex)%this.maxPage)
                }

            }
        },
        mounted() {
            if(this.checklistId === null)
            {
                this.$router.push('Choice')
            }
        }
    }
</script>

<style scoped>
    #checklist-info
    {
        display:flex;
        flex-direction: column;
        margin-top: -80px;
        padding-bottom: 100px;
        pointer-events: none;
    }
    #checklist-title
    {
        font-size: 40px;
        font-weight: 300;
    }
    #checklist-description
    {
        font-weight: lighter;
        color: var(--light-green)
    }
    #checklist-container
    {
        flex: 1 1 auto;
        display:flex;
        flex-direction: column;
        background-color: white;
        min-width: max-content;
    }
    #checklist-actions
    {
        flex: 0 0 auto;
        height: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding-left: 50px;
        padding-right: 50px;
    }
    #checklist-actions > i
    {
        color: var(--blue);
        font-size: 60px;
        cursor: pointer;
    }
    #checklist-actions > button
    {
        font-size: 15px;
        color: white;
        padding: 8px 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    #checklist-actions > button:focus
    {
        outline: none;
    }
    #checklist-body
    {
        flex: 1 1 auto;
        display:flex;
        flex-direction: row;
        width:100%;
    }

    #checklist-document
    {
        border-right: var(--light) solid;
        min-width: 500px;
        width: 50%;
        padding: 5px;
    }
    #checklist-document > i
    {
        color: var(--dark);
        margin: 8px;
        font-size: 30px;
    }
    #checklist-checks
    {
        width: 50%;
        border-right: var(--light) solid;
        min-width: 500px;
    }
</style>