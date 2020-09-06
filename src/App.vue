<template>
  <v-app class="nunito">
    <v-fade-transition hide-on-leave>
      <router-view></router-view>
    </v-fade-transition>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="sass">
    html
      overflow-y: auto !important

    .nunito
      font-family: Nunito, sans-serif !important

    .background-1
      background: url(../public/images/background-1.jpg)
      background-size: cover
    .background-2
      background: url(../public/images/background-2.jpg)
      background-size: cover
    .background-3
      background: url(../public/images/background-3.jpg)
      background-size: cover
</style>
