<template>
    <div id="checklist">
        <check v-for="(check,index) in checks" :key="index" :index="index+1">{{check}}</check>
    </div>
</template>

<script>
    import Check from "@/components/Check";

    export default {
        name: "Checklist",
        components:
            {
                'check': Check
            },
        props:
            {
                checks: Array
            }
    }
</script>

<style scoped>
    #checklist {
        overflow: auto;
    }
</style>