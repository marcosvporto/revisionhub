<template>
    <div class="flex-column">
        <upload-card v-if="picking"
                     @submit="selectDocument($event)"
                     @close="picking=false"
        />
        <export-card v-if="exporting" @export="exportDocument($event)" @close="exporting=false" />
        <like-card v-if="liking" @like="endReview(true)" @close="endReview(false)" />
        <div class="flex-column flex-shrink checklist-info">
            <span class="checklist-title">{{tituloMockado}}</span>
            <span id="checklist-description">Likes: {{numLikesMockado}}</span>
        </div>
        <div id="checklist-container" class="flex-column flex-grow">
            <div id="checklist-actions" class="flex-row flex-shrink">
                <i class="fas fa-plus-circle" @click="picking=true"/>
                <div>
                    <button class="bg-blue" @click="exporting=true">Export</button>
                    <button class="bg-blue" @click="liking=true">Finalizar</button>
                </div>

            </div>
            <div id="checklist-body" class="flex-row flex-grow" ref="page">
                <div id="checklist-document" >
                    <pdf v-if="selectedDocument" :src="selectedDocument" :page="currentPage"
                         @num-pages="maxPage = $event" @page-loaded="setPageHeight" ref="document"></pdf>
                    <i class="fas fa-arrow-left" v-if="selectedDocument" @click="pageIndex--"></i>
                    <i class="fas fa-arrow-right" v-if="selectedDocument" @click="pageIndex++"></i>
                </div>
                <div id="checklist-checks">
                    <checklist :checklist="checklistMockado"/>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import pdf from 'vue-pdf'
    import DocumentUploadCard from "@/components/DocumentUploadCard";
    import DocumentExportCard from "@/components/DocumentExportCard";
    import DocumentLikeCard from "@/components/DocumentLikeCard";
    import Checklist from "@/components/Checklist";

    export default {
        name: "ChecklistView",
        components: {
            pdf,
            'upload-card': DocumentUploadCard,
            'export-card': DocumentExportCard,
            'like-card': DocumentLikeCard,
            'checklist': Checklist
        },
        props:
            {
                checklistId: Number
            },
        data: function () {
            return {
                picking: false,
                exporting: false,
                liking:false,
                tituloMockado: "Checklist 1",
                checklistMockado: ['Pergunta 1', 'Pergunta 2', 'Pergunta 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue nibh sit amet sapien pharetra, at luctus nulla pharetra. Nulla vehicula mattis massa quis imperdiet. Proin porttitor hendrerit odio, ut consequat ipsum elementum quis. Suspendisse potenti. Phasellus posuere tempus accumsan. In varius, justo id eleifend auctor, lorem odio aliquet nisi, dignissim vestibulum arcu erat nec metus. Nunc ornare tempor enim, eu egestas odio. Morbi non sollicitudin ante, ut auctor urna. Nunc interdum sodales tincidunt. Suspendisse volutpat tortor nec efficitur consequat. Morbi dolor magna, vehicula laoreet rutrum ut, convallis sed neque. Integer eu tincidunt quam, a finibus lorem.',
                    'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta','Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta', 'Pergunta',
                ],
                numLikesMockado: 3,
                selectedDocument: null,
                pageIndex: 0,
                maxPage: null
            }
        },
        methods: {
            selectDocument(file) {
                var reader = new FileReader()
                reader.onload = () => {
                    this.selectedDocument = reader.result
                    this.pageIndex = 0
                }
                reader.readAsDataURL(file)
            },
            setPageHeight() {
                let page = this.$refs.page
                let document = this.$refs.document
                if (page && document) {
                    page.style.height = (document.$el.clientHeight + 50).toString() + 'px'
                }
            },
            exportDocument()
            {
                this.liking = true
            },
            endReview(like)
            {
                if(like)
                {
                    console.log(like)
                }
                this.$router.push('/')
            }
        },
        computed:
            {
                currentPage() {
                    if (this.pageIndex >= 0) {
                        return (this.pageIndex + 1) % this.maxPage + 1
                    } else {
                        return this.maxPage - ((-this.pageIndex) % this.maxPage)
                    }

                }
            },
        mounted() {
            if (this.checklistId === null) {
                this.$router.push('Choice')
            }
            window.addEventListener('resize',this.setPageHeight)
        }
    }
</script>

<style scoped>
    #checklist-description {
        font-weight: lighter;
        color: var(--light-green)
    }

    #checklist-container {
        background-color: white;
    }

    #checklist-actions {
        height: 100px;
        justify-content: space-between;
        align-items: center;
        padding-left: 50px;
        padding-right: 50px;
    }

    #checklist-actions > i {
        color: var(--blue);
        font-size: 60px;
        cursor: pointer;
    }

    #checklist-actions > div > button {
        font-size: 15px;
        color: white;
        padding: 8px 30px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
    }

    #checklist-body {
        width: 100%;
        height: 69vh;
    }

    #checklist-document {
        border-right: var(--light) solid;
        min-width: 500px;
        width: 50%;
        padding: 5px;
    }

    #checklist-document > i {
        color: var(--dark);
        margin: 8px;
        font-size: 30px;
        cursor: pointer;
    }

    #checklist-checks {
        width: 50%;
        border-right: var(--light) solid;
        min-width: 500px;
        overflow: auto;
        margin-right:15px;
    }
</style>