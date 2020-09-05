<template>
  <v-app class="nunito">
    
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
  </v-app>
</template>

<script>
import AppNavDrawer from './components/NavDrawer'
import AppDesktop from './components/Desktop'

export default {
  created () {
    this.$store.commit('setTaskList')
  },
  name: 'App',
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
    background: url(../public/images/background.jpg)
    background-size: cover
</style>
