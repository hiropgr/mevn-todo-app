<template>
    <v-row>
        <v-col cols="12" md="6">
            <app-task-list></app-task-list>
        </v-col>
        <v-col v-if="brPointName != 'sm' && brPointName != 'xs'" cols="12" md="6" style="min-width: 330px; max-width: 600px">
            <app-task-parameters></app-task-parameters>
        </v-col>
        
        <v-dialog v-else :value="!!task" @click:outside="closeDialog" width="600px" modal>
            <app-task-parameters></app-task-parameters>
        </v-dialog>
    </v-row>
</template>

<script>
import AppTaskList from './TaskList'
import AppTaskParameters from './TaskParameters'

export default {
    computed: {
        brPointName() {
            return this.$vuetify.breakpoint.name
        },
        task() {
            return this.$store.state.tasks.activeTask
        }
    },
    methods: {
        closeDialog() {
            this.$store.commit('setActiveTask', null)
        }
    },
    components: {
        AppTaskList, AppTaskParameters
    }
}
</script>

<style>

</style>