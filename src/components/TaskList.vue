<template>
    <v-card>
        <v-card-title>
            <v-fade-transition hide-on-leave>
                <h2 :key="taskList.name">{{ taskList.name }}</h2>
            </v-fade-transition>
            <v-chip color="primary" class="mx-3">
                <v-slide-y-transition hide-on-leave>
                    <strong :key="taskList.items.length">{{ taskList.items.length }}</strong>
                </v-slide-y-transition>
            </v-chip>
            <v-spacer></v-spacer>
            <v-progress-circular
                :value="progress"
                color="black"
                class="mr-2"
            ></v-progress-circular>
        </v-card-title>
        <v-card-text>
                <v-list two-line rounded class="overflow-y-auto" style="height: 63vh" :key="taskList.name">
                <v-slide-y-transition leave-absolute group>
                    <v-list-item
                        v-for="item in sortedTasks"
                        :key="item._id"
                        @click="setActiveTask(item)"
                        :class="{ 'teal lighten-5': activeTask && item._id == activeTask._id }"
                    >
                        <v-simple-checkbox
                            @click.stop="toggleTaskStatus(item)"
                            :value="item.completed"
                            class="pr-3"
                            color="grey"
                            :ripple="false"
                            on-icon="mdi-check-circle"
                            off-icon="mdi-checkbox-blank-circle-outline"
                        ></v-simple-checkbox>

                        <v-list-item-content>
                            <v-list-item-title 
                                :class="{'grey--text': item.completed}"
                            >
                                <span :style="{'text-decoration': item.completed ? 'line-through' : 'none'}">
                                    {{ item.text }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                {{ item.list.name }}
                                <v-icon small :color="$priorityColors[item.priority]">mdi-fire</v-icon>
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-slide-x-reverse-transition>
                                <v-btn v-if="item.completed" icon @click.stop="deleteTask(item)">
                                    <v-icon color="grey">mdi-close</v-icon>
                                </v-btn>
                            </v-slide-x-reverse-transition>
                        </v-list-item-action>
                    </v-list-item>
                </v-slide-y-transition>
            </v-list>
            
            <v-row class="px-3" align="center" no-gutters>
                <v-col cols="11">
                    <v-text-field
                        v-model="taskText"
                        @keypress.enter.prevent="addTaskQuickly"
                        @focus="textfieldFocused = true"
                        @blur="textfieldFocused = false"
                        :label="`Click to quickly add a task to the ${addressList} list`"
                        single-line
                        clearable
                        class="mt-3 mr-3"
                    ></v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn 
                        :color="textfieldFocused ? 'primary' : 'grey'" 
                        justify-self="center" 
                        icon large 
                        class="mt-1" 
                        @click.prevent="addTaskQuickly"
                    >
                        <v-icon>mdi-arrow-up</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            taskText: '',
            textfieldFocused: false,
        }
    },
    computed: {
        allTasks() {
            return this.$store.getters.allTasks
        },
        taskList() {
            return this.$store.state.tasks.activeList || this.allTasks
        },
        activeTask() {
            return this.$store.state.tasks.activeTask
        },
        sortedTasks() { 
            let tasks = [...this.taskList.items].sort((a, b) => {
                return b.priority - a.priority
            })
            tasks.sort((a, b) => {
                return a.completed - b.completed
            })
            
            return tasks
        },
        addressList() {
            return this.$store.state.tasks.activeList ? `"${this.taskList.name}"` : 'default task'
        },
        countCompletedTask() {
            return this.taskList.items.reduce((total, task) => {
                return task.completed ? total + 1 : total
            }, 0)
        },
        progress() {
            return this.countCompletedTask / this.taskList.items.length * 100
        }
    },
    methods: {
        addTaskQuickly() {
            if(this.taskText == '')
                return
            this.$store.dispatch('addTaskQuickly', this.taskText)
            this.taskText = ''
        },
        toggleTaskStatus(task) {
            this.$store.dispatch('toggleTaskStatus', task)
        },
        setActiveTask(task) {
            this.$store.commit('setActiveTask', task)
        },
        deleteTask(task) {
            this.$store.dispatch('deleteTask', task)
        }
    }
}
</script>

<style>

</style>