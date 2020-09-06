<template>
    <v-slide-x-transition>
        <v-card v-if="task">
            <v-fade-transition hide-on-leave>
                <div :key="task._id">
                    <v-card-title>
                        Task details
                        <v-spacer></v-spacer>
                        <v-btn icon color="grey" @click="close">
                            <v-icon small>mdi-close</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="text"
                            label="Text"
                        ></v-text-field>

                        <label>Priority</label>
                        <app-priority-picker v-model="priority"></app-priority-picker>

                        <label>Created</label>
                        <v-row class="px-3 black--text">{{ task.createdAt | date }}</v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-col>
                            <v-btn color="error" text class="font-weight-bold" block @click="deleteTask">Delete</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn 
                                v-if="!task.completed"
                                color="primary" 
                                text 
                                block
                                class="font-weight-bold" 
                                @click="restoreTask"
                            >Mark as done</v-btn>
                            <v-btn
                                v-else
                                color="black" 
                                text 
                                block
                                class="font-weight-bold" 
                                @click="restoreTask"
                            >Restore</v-btn>
                        </v-col>
                    </v-card-actions>
                </div>
            </v-fade-transition>
        </v-card>
    </v-slide-x-transition>
</template>

<script>
import AppPriorityPicker from './PriorityPicker'
import debounce from 'lodash/debounce'

export default {
    data () {
        return {
            textfieldFocused: false,
        }
    },
    computed: {
        task() {
            return this.$store.state.tasks.activeTask
        },
        text: {
            get() {
                return this.task.text
            },
            set: debounce(function (value) {
                this.$store.dispatch('updateTaskText', { task: this.task, value })
            }, 300)
        },
        priority: {
            get() {
                return this.task.priority
            },
            set(value) {
                this.$store.dispatch('updateTaskPriority', { task: this.task, value } )
            }
        }
    },
    methods: {
        deleteTask() {
            this.$store.dispatch('deleteTask', this.task)
        },
        restoreTask() {
            this.$store.dispatch('toggleTaskStatus', this.task)
        },
        close() {
            this.$store.commit('setActiveTask', null)
        }
    },
    filters: {
        date(value) {
            const date = new Date(value)
            return date.toLocaleDateString("en-US", {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', 'minute': 'numeric'
            })
        }
    },
    components: {
        AppPriorityPicker
    }
}
</script>

<style>

</style>