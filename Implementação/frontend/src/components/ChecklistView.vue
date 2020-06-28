<template>
    <div class="flex-column">
        <upload-card v-if="picking"
                     @submit="selectDocument($event)"
                     @close="picking=false"
        />
        <export-card v-if="exporting" @export="exportDocument($event)" @close="exporting=false"/>
        <like-card v-if="liking" @like="endReview(true)" @close="endReview(false)" @cancel="liking=false"/>
        <div class="flex-column flex-shrink checklist-info">
            <span class="checklist-title">{{checklist.title}}</span>
            <span id="checklist-description">Likes: {{checklist.likes}}</span>
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
                <div id="checklist-document">
                    <pdf v-if="selectedDocument" :src="selectedDocument" :page="currentPage"
                         @num-pages="maxPage = $event" @page-loaded="setPageHeight" ref="document"></pdf>
                    <i class="fas fa-arrow-left" v-if="selectedDocument" @click="pageIndex--"></i>
                    <i class="fas fa-arrow-right" v-if="selectedDocument" @click="pageIndex++"></i>
                </div>
                <div id="checklist-checks">
                    <checklist :checks="values" @checked="checked[$event.index]=$event.state"/>
                </div>
            </div>

        </div>
        <html2pdf ref="html2pdf" :preview-modal="false" :enable-download="true" v-if="generating"
                  :filename="`Relatorio ${checklist.title}`" pdf-format="a4" :paginate-elements-by-height="2000"
                  pdf-content-width="800px" @hasGenerated="generating=false">
            <section slot="pdf-content">
                <print :title="checklist.title" :checks="values" :checked="checked"></print>
            </section>
        </html2pdf>
    </div>

</template>

<script>
    import pdf from 'vue-pdf'
    import html2pdf from 'vue-html2pdf'
    import DocumentUploadCard from "@/components/DocumentUploadCard";
    import DocumentExportCard from "@/components/DocumentExportCard";
    import DocumentLikeCard from "@/components/DocumentLikeCard";
    import Checklist from "@/components/Checklist";
    import ChecklistPrint from "./ChecklistPrint";
    import ConnectionMixin from "@/mixins/ConnectionMixin";

    export default {
        name: "ChecklistView",
        mixins: [ConnectionMixin],
        components: {
            pdf,
            html2pdf,
            'print': ChecklistPrint,
            'upload-card': DocumentUploadCard,
            'export-card': DocumentExportCard,
            'like-card': DocumentLikeCard,
            'checklist': Checklist
        },
        props:
            {
                checklist: {
                    require: true,
                    type: Object
                }
            },
        data: function () {
            return {
                checks: [],
                checked: [],
                picking: false,
                exporting: false,
                liking: false,
                generating: false,
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
            exportDocument() {
                this.generating = true
                this.$nextTick(() => {
                    this.$refs.html2pdf.generatePdf()
                    this.exporting = false
                    this.$alert('Seu PDF está sendo gerado')
                })

            },
            async endReview(like) {
                if (like) {
                    let connection = this.getUnauthenticatedRoute()
                    try {
                        await connection.patch('checklists/' + this.checklist.id)
                    } catch (e) {
                        await this.handleResponseError(e)
                        return
                    }
                }
                await this.$router.push('/')
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

                },
                values() {
                    return this.checks.map(x => x.text)
                }
            },
        async mounted() {
            if (this.checklist === null) {
                this.$router.push('Choice')
            }
            window.addEventListener('resize', this.setPageHeight)

            let connection = this.getUnauthenticatedRoute()
            let response
            try {
                response = await connection.get('/checklists/' + this.checklist.id + '/checks/')
            } catch (e) {
                await this.handleResponseError(e)
                return
            }
            this.checks = response.data || []
            this.checked = this.checks.map(() => false)
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
        margin-right: 15px;
    }
</style>