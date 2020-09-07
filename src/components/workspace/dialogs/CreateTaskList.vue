<template> 
    <v-dialog
        v-model="dialog"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card>
            <v-card-title>
                <h3>Name new task list</h3>
            </v-card-title>
            <v-card-text>
                <v-text-field
                    v-model="name"
                    :rules="[v => !!v || `List name can't be empty`]"
                    label="List name"
                ></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="secondary" @click="dialog = false">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" text class="font-weight-bold" :disabled="name == ''" :loading="loading" @click="createTaskList">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['value'],
    data () {
        return {
            name: '',
            loading: false
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
                this.name = ''
            }
        }
    },
    methods: {
        async createTaskList() {
            try {
                this.loading = true
                await this.$store.dispatch('createTaskList', this.name)
                this.dialog = false
            } finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>