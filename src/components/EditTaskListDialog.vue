<template> 
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card v-if="taskList">
            <v-slide-x-transition hide-on-leave>
                <div v-if="!defaultListPicker">
                    <v-card-title>
                        <h3>Edit task list</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            v-model="name"
                            :rules="[v => !!v || `List name can't be empty`]"
                            label="List name"
                        ></v-text-field>
                        <v-row>
                            <v-spacer></v-spacer>
                            <v-btn color="yellow darken-2" class="font-weight-bold" text @click="setDefaultTaskList(taskList)">
                                <v-icon left>mdi-star-circle</v-icon>
                                Set as default
                            </v-btn>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="error" @click="deleteTaskList">Delete</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text class="font-weight-bold" :disabled="name == ''" @click="saveTaskList">Save</v-btn>
                    </v-card-actions>
                </div>

                <div v-else :key="2">
                    <v-card-title>
                        <h3>Default list will be deleted, select a new one</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            v-model="newDefaultListId"
                            :items="selectItems"
                            label="Choose new default task list"
                        ></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="secondary" @click="defaultListPicker = false">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="error" class="font-weight-bold" text :disabled="!newDefaultListId" @click="deleteDefaultTaskList">Delete</v-btn>
                    </v-card-actions>
                </div>
            </v-slide-x-transition>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['value', 'taskList'],
    data () {
        return {
            name: '',
            defaultListPicker: false,
            newDefaultListId: null
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
        allLists() {
            return this.$store.state.taskLists
        },
        userDefaultTaskListId() {
            return this.$store.state.user.config.defaultTaskListId
        },
        selectItems() {
            let lists = []
            for (const taskList of this.allLists) {
                if(taskList._id != this.taskList._id)
                    lists.push({
                        text: taskList.name,
                        value: taskList._id
                    })
            }
            return lists
        }
    },
    watch: {
        dialog(value) {
            if(value) {
                this.name = this.taskList.name
            } else {
                this.name = '',
                this.defaultListPicker = false,
                this.newDefaultListId = null
            }
        }
    },
    methods: {
        saveTaskList() {
            this.$store.dispatch('updateTaskList', {
                taskList: this.taskList, set: { name: this.name }
            })
            this.dialog = false
        },
        deleteTaskList() {
            if(this.taskList._id != this.userDefaultTaskListId) {
                this.$store.dispatch('deleteTaskList', this.taskList._id)
                this.dialog = false
            } else {
                this.defaultListPicker = true
            }
        },
        deleteDefaultTaskList() {
            const newDefaultListId = this.newDefaultListId
            if(newDefaultListId) {
                this.$store.dispatch('setDefaultTaskList', newDefaultListId)
                this.$store.dispatch('deleteTaskList', this.taskList._id)
                this.dialog = false
            }
        },
        setDefaultTaskList(taskList) {
            this.$store.dispatch('setDefaultTaskList', taskList._id)
            this.dialog = false
        }
    }
}
</script>

<style>

</style>