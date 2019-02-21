<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="time"
      lazy
  >
    <v-text-field tabindex=-1
        slot="activator"
        :value="formattedTime"
        :label="label"
        :prepend-icon="prependIcon">
    </v-text-field>
    <v-time-picker v-if="menu" :value="time" @input="timePicked" @click:minute="$refs.menu.save(time)"></v-time-picker>
  </v-menu>
</template>

<script>
  import spacetime from 'spacetime'

  export default {
    name: 'time-picker',
    props: [
      'value',
      'label',
      'prependIcon'
    ],
    data() {
      return {
        time: this.value,
        menu: false
      }
    },
    methods: {
      timePicked(event) {
        this.time = event
        this.$emit('input', event)
      }
    },
    computed: {
      formattedTime () {
        return this.time ? spacetime().time(this.time).format('{hour}:{minute-pad} {ampm}') : ''
      }
    }
  }

</script>

<style scoped>

</style>
