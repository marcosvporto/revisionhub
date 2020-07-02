<template>
    <div>
        <h1>RevisionHub</h1>
        <h1>Relatório da Checklist - {{title}}</h1>
        <table>
            <tr>
                <th colspan="6">
                    Check
                </th>
                <th colspan="1">
                    Valor
                </th>
            </tr>
            <tr v-for="(check,index) in checks" :key="index">
                <td colspan="6">
                    {{check}}
                </td>
                <td colspan="1">
                    {{checked[index]?'☑':'☐'}}
                </td>
            </tr>
        </table>
        <p>Gerado em {{new Date().toLocaleDateString('pt-BR')}}</p>
    </div>

</template>

<script>
    export default {
        name: "ChecklistPrint",
        props: {
            title: String,
            checks: Array,
            checked: Array
        }
    }
</script>

<style scoped>
    h1 {
        color:black;
        font-size:30px;
    }
    th {
        font-size:20px;
    }
    th:nth-child(2)
    {
        text-align: center;
    }
    table {
        color:black;
        width:90%;
        text-align: left;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
    }
    td {
        font-size:35px;
    }
    td:nth-child(2) {
        font-size:50px;
        text-align: center;
        padding:0;
    }
    p {
        color:black;
        text-align:left;
        width: 100%;
        padding-left:40px;
    }
</style>