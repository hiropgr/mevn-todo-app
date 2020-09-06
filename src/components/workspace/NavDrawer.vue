<template>
    <v-navigation-drawer
        v-model="drawer"
        app
        class="white"
        :permanent="brPointName != 'sm' && brPointName != 'xs'"
        :mini-variant="!drawer"
        absolute
    >
        <h1 v-if="drawer" class="font-weight-bold text-center pa-3">
            <strong><span>TODO</span>s</strong>
        </h1>

        <v-divider></v-divider>

        <v-list-item two-line>
            <v-list-item-avatar v-if="drawer">
                <v-icon large>mdi-check</v-icon>
            </v-list-item-avatar>
            <v-list-item-icon v-else>
                <v-icon>mdi-check</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>
                    {{ user.email }}
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        
        <v-divider></v-divider>

        <v-btn color="teal" :icon="!drawer" tile text block class="mt-3" @click="addTaskDialog = true">
            <h3 v-if="drawer">Add task</h3>
            <v-icon v-else>mdi-plus</v-icon>
        </v-btn>

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
                                <v-btn icon color="grey" v-on="on" @click.stop="createDialog = true">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </template>
                            <span>Create task list</span>    
                        </v-tooltip>
                    </v-list-item-action>
                </template>

                <v-slide-y-transition group>
                    <v-list-item
                        v-for="(taskList, index) in taskLists"
                        :key="index"
                        link
                        @click="setTaskList(taskList)"
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
                </v-slide-y-transition>
            </v-list-group>
        </v-list>

        <app-edit-task-list-dialog v-model="editDialog" :taskList="editingTaskList"></app-edit-task-list-dialog>
        <app-create-task-list-dialog v-model="createDialog"></app-create-task-list-dialog>
        <app-add-task-dialog v-model="addTaskDialog"></app-add-task-dialog>
    </v-navigation-drawer>
</template>

<script>
import AppEditTaskListDialog from './dialogs/EditTaskList'
import AppCreateTaskListDialog from './dialogs/CreateTaskList'
import AppAddTaskDialog from './dialogs/AddTask'

export default {
    props: ['value'],
    data() {
        return {
            editingTaskList: null,
            addTaskDialog: false,
            editDialog: false,
            createDialog: false
        }
    },
    computed: {
        user() {
            return this.$store.state.user
        },
        taskLists() {
            return this.$store.state.tasks.taskLists
        },
        allTasks() {
            return this.$store.getters.allTasks
        },
        activeList() {
            return this.$store.state.tasks.activeList || this.allTasks
        },
        brPointName() {
            return this.$vuetify.breakpoint.name
        },
        drawer: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        setTaskList(taskList) {
            this.$store.commit('setTaskList', taskList)
        },
        editTaskList(taskList) {
            this.editingTaskList = taskList
            this.editDialog = true
        }
    },
    components: {
        AppEditTaskListDialog, AppCreateTaskListDialog, AppAddTaskDialog
    }
}
</script>

<style>

</style>