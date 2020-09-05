<template>
    <v-row justify="center">
        <v-tooltip bottom>
            <template v-slot:activator={on}>
                <v-btn icon :color="priority == 0 ? $priorityColors[0] : 'grey'" large @click="priority = 0">
                    <v-icon v-on="on" large>mdi-fire</v-icon>
                </v-btn>
            </template>
            <span>Low priority</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator={on}>
                <v-btn v-on="on" icon :color="priority == 1 ? $priorityColors[1] : 'grey'" large @click="priority = 1">
                    <v-icon large>mdi-fire</v-icon>
                </v-btn>
            </template>
            <span>Medium priority</span>
        </v-tooltip>

        <v-tooltip bottom>
            <template v-slot:activator={on}>
                <v-btn v-on="on" icon :color="priority == 2 ? $priorityColors[2] : 'grey'" large @click="priority = 2">
                    <v-icon large>mdi-fire</v-icon>
                </v-btn>
            </template>
            <span>High priority</span>
        </v-tooltip>
    </v-row>
</template>

<script>
export default {
    props: ['value'],
    computed: {
        priority: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<style>

</style>