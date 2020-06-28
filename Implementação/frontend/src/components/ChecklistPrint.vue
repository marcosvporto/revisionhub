<template>
    <div>
        <h1>RevisionHub</h1>
        <h1>Relatório da Checklist - {{title}}</h1>
        <table>
            <tr>
                <th>
                    Index
                </th>
                <th colspan="6">
                    Check
                </th>
                <th colspan="1">
                    Valor
                </th>
            </tr>
            <tr v-for="(check,index) in checks" :key="index">
                <td colspan="1">
                    {{index + 1}}
                </td>
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
    table {
        color:black;
        width:90%;
        text-align: left;
        border-collapse: collapse;
        margin-left: auto;
        margin-right: auto;
    }
    td {
        border: 1px solid black;
        font-size:35px;
    }
    td:nth-child(1) {
        text-align:center;
        padding:9px 0px;
    }
    td:nth-child(3) {
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