<template> 
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>
                <h3>Add task</h3>
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="text"
                    single-line
                    label="I want to..."
                ></v-text-field>
                
                <label>Task list</label>
                <v-select
                    v-model="taskListId"
                    :items="selectItems"
                    class="pt-0"
                ></v-select>

                <label>Priority</label> 
                <app-priority-picker v-model="priority"></app-priority-picker>
            </v-card-text>

            <v-card-actions>
                <v-btn text color="secondary" @click="dialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text class="font-weight-bold" :disabled="text == ''" @click="addTask">Add</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import AppPriorityPicker from './PriorityPicker'

export default {
    props: ['value'],
    data () {
        return {
            text: '',
            taskListId: null,
            priority: 0
        }
    },
    computed: {
        dialog: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        taskLists() {
            return this.$store.state.tasks.taskLists
        },
        selectItems() {
            let lists = []
            for (const taskList of this.taskLists) {
                    lists.push({
                        text: taskList.name,
                        value: taskList._id
                    })
            }
            return lists
        },
        userDefaultTaskListId() {
            return this.$store.state.user.config.defaultTaskListId
        },
    },
    watch: {
        dialog(value) {
            if(value) {
                this.text = ''
                this.priority = 0
                this.taskListId = this.userDefaultTaskListId
            }
        }
    },
    methods: {
        addTask() {
            this.$store.dispatch('addTask', {
                text: this.text,
                priority: this.priority,
                taskListId: this.taskListId
            })
            this.dialog = false
        }
    },
    components: {
        AppPriorityPicker
    }
}
</script>

<style>

</style>