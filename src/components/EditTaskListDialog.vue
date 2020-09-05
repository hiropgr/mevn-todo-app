<template> 
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card v-if="taskList">
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
                    <v-btn color="yellow darken-2" class="font-weight-bold" text @click="setDefaultTaskList">
                        <v-icon left>mdi-star-circle</v-icon>
                        Set as default
                    </v-btn>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="error" @click="deleteTaskList">Delete</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" class="font-weight-bold" :disabled="name == ''" @click="saveTaskList">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['value', 'taskList'],
    data () {
        return {
            name: ''
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
        }
    },
    watch: {
        dialog(value) {
            if(value) {
                this.name = this.taskList.name
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
            this.$store.dispatch('deleteTaskList', this.taskList)
            this.dialog = false
        },
        setDefaultTaskList() {
            this.$store.dispatch('setDefaultTaskList', this.taskList)
            this.dialog = false
        }
    }
}
</script>

<style>

</style>