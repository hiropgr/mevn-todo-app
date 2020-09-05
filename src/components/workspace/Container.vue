<template>
    <div>
        <app-nav-drawer></app-nav-drawer>
        
        <v-main class="background">
            <v-container fluid class="overflow-x-auto">
                
                <v-row class="pa-3 pb-16">
                <v-spacer></v-spacer>
                <v-btn icon color="black" large class="white">
                    <v-icon large>mdi-cog-outline</v-icon>
                </v-btn>
                </v-row>

                <app-desktop></app-desktop>

            </v-container>
        </v-main>
    </div>
</template>

<script>
import AppNavDrawer from './NavDrawer'
import AppDesktop from './Desktop'

export default {
    created () {
        this.$store.commit('setTaskList')
    },
    components: {
        AppNavDrawer,
        AppDesktop
    },
    data() {
        return {
        }
    }
};
</script>

<style lang="sass">
    html
        overflow-y: auto !important

    .nunito
        font-family: Nunito, sans-serif !important

    .background
        background: url(../../../public/images/background.jpg)
        background-size: cover
</style>
