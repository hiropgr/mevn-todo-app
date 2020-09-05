<template>
    <v-navigation-drawer
        app
        permanent
        class="white"
    >
        <h1 class="font-weight-bold text-center pa-3">
            <strong><span>TODO</span>s</strong>
        </h1>

        <v-divider></v-divider>

        <v-list-item two-line>
                <v-list-item-avatar>
                    <v-icon large>mdi-check</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>

        <v-list-item
            link
            class="mt-3"
            @click="setTaskList(null)"
            :class="[allTasks == activeList ? 'grey lighten-4' : 'white' ]"
        >
            <v-list-item-icon>
                <v-icon>mdi-format-list-bulleted</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>
                    <h3>
                        All tasks
                        <v-chip class="pa-2 ml-1" small>
                            <strong>{{ allTasks.items.length }}</strong>
                        </v-chip>
                    </h3>
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list>
            <v-list-group
                value="true"
                color="#099"
            >
                <template v-slot:activator>
                    <v-list-item-icon>
                        <v-icon>mdi-account-details</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        <h3>Lists</h3>
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon color="grey" v-on="on" @click.stop="true">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Create task list</span>    
                        </v-tooltip>
                    </v-list-item-action>
                </template>

                <v-list-item
                    v-for="(taskList, index) in taskLists"
                    :key="index"
                    link
                    @click="setTaskList(taskList)"
                    class="pl-10"
                    :class="[taskList == activeList ? 'grey lighten-4' : 'white' ]"
                >
                    <v-list-item-title>
                        {{taskList.name}}
                        <v-chip class="pa-2 ml-1" small>
                            <strong>{{ taskList.items.length }}</strong>
                        </v-chip>
                        <v-tooltip bottom :key="user.config.defaultTaskListId == taskList._id">
                            <template v-slot:activator="{ on }">
                                <v-icon 
                                    v-if="user.config.defaultTaskListId == taskList._id"
                                    v-on="on"
                                    color="yellow darken-2" 
                                    class="mx-3"
                                >mdi-star-circle</v-icon>
                            </template>
                            <span>Default task list</span>
                        </v-tooltip>
                    </v-list-item-title>
                    <v-list-item-action>
                        <v-btn icon color="grey" @click.stop="editTaskList(taskList)">
                            <v-icon>settings</v-icon>
                        </v-btn>
                    </v-list-item-action>
                </v-list-item>
            </v-list-group>
        </v-list>

        <app-edit-task-list-dialog v-model="dialog" :taskList="editingTaskList"></app-edit-task-list-dialog>
    </v-navigation-drawer>
</template>

<script>
import AppEditTaskListDialog from './EditTaskListDialog'

export default {
    data() {
        return {
            drawer: true,
            editingTaskList: null,
            dialog: false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        taskLists() {
            return this.$store.state.taskLists
        },
        allTasks() {
            return this.$store.getters.allTasks
        },
        activeList() {
            return this.$store.state.activeList || this.allTasks
        }
    },
    methods: {
        setTaskList(taskList) {
            this.$store.commit('setTaskList', taskList)
        },
        editTaskList(taskList) {
            this.editingTaskList = taskList
            this.dialog = true
        }
    },
    components: {
        AppEditTaskListDialog
    }
}
</script>

<style>

</style>