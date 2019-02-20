<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      lazy
  >
    <v-text-field
        slot="activator"
        :value="formattedDate"
        :label="label"
        :prepend-icon="prependIcon">
    </v-text-field>
    <v-date-picker :value="date" @input="datePicked" @change="menu = false"></v-date-picker>
  </v-menu>
</template>

<script>
  import spacetime from 'spacetime'

  export default {
    name: 'date-picker',
    props: [
      'value',
      'label',
      'prependIcon'
    ],
    data() {
      return {
        date: this.value,
        menu: false
      }
    },
    methods: {
      datePicked(event) {
        this.date = event
        this.$emit('input', event)
      }
    },
    computed: {
      formattedDate () {
        return this.date ? spacetime(this.date).format('{day-short} {month-short} {date} {year}') : ''
      }
    }
  }

</script>

<style scoped>

</style>
