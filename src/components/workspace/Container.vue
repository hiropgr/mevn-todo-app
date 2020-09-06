<template>
    <div>
        <app-nav-drawer></app-nav-drawer>
        
        <v-main class="background-3">
            <v-container fluid class="overflow-x-auto">
                
                <v-row class="pa-3 pb-16">
                    <v-spacer></v-spacer>
                    <v-menu
                        transition="slide-y-transition"
                        bottom
                        offset-y
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="white"
                                color="black"
                                dark
                                icon
                                large
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon large>mdi-cog-outline</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="true">
                                <v-list-item-title>
                                    <v-icon left>mdi-logout</v-icon>
                                    Sign out
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
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
        if(!this.isUserLoggedIn) {
            this.$router.redirect('/signin')
            return
        }
        this.$store.commit('setTaskList')
    },
    components: {
        AppNavDrawer,
        AppDesktop
    },
    data() {
        return {
        }
    },
    computed: {
        isUserLoggedIn() {
            return !!this.$store.state.user
        }
    }
};
</script>
