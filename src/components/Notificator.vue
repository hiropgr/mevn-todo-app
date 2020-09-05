<template>
    <v-snackbar
      v-model="alert.visible"
      right
      top
      :multi-line="true"
      :timeout="5000"
      :color="alert.color"
      @input="closeAlert"
      :value="true"
    >
      <span v-html="alert.text"></span>
      <v-btn
        dark
        text
        @click.native="closeAlert"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
</template>

<script>
export default {
  methods: {
    closeAlert () {
      this.$store.dispatch('clearAlert')
    }
  },
  computed: {
    alert () {
      return this.$store.state.shared.alert
    }
  }
};
</script>

<style>

</style>