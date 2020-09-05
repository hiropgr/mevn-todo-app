<template>
    <v-row>
        <v-col cols="12" sm="6" style="max-width: 700px">
            <app-task-list></app-task-list>
        </v-col>
        <v-col cols="12" sm="6" style="min-width: 330px; max-width: 600px">
            <app-task-parameters></app-task-parameters>
        </v-col>
    </v-row>
</template>

<script>
import AppTaskList from './TaskList'
import AppTaskParameters from './TaskParameters'

export default {
    components: {
        AppTaskList, AppTaskParameters
    }
}
</script>

<style>

</style>