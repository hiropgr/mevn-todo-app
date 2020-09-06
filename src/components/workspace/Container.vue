<template>
    <div>
        <app-nav-drawer v-model="navDrawer"></app-nav-drawer>
        
        <v-main class="background-3">
            <v-container fluid style="height: 100vh" class="overflow-x-auto py-0">
                
                <v-row class="pa-3">
                    <v-btn 
                        icon
                        class="white"
                        color="black" 
                        @click="navDrawer = !navDrawer"
                        large
                    >  
                        <v-slide-x-transition>
                            <v-icon large>{{ navDrawer ? 'mdi-backburger' : 'mdi-menu' }}</v-icon>
                        </v-slide-x-transition>
                    </v-btn>
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
        this.navDrawer = this.isBigWindow
    },
    components: {
        AppNavDrawer,
        AppDesktop
    },
    data() {
        return {
            navDrawer: true
        }
    },
    computed: {
        isUserLoggedIn() {
            return !!this.$store.state.user
        },
        brPointName() {
            return this.$vuetify.breakpoint.name
        },
        isBigWindow() {
            return this.brPointName != 'sm' && this.brPointName != 'xs'
        }
    }
};
</script>
