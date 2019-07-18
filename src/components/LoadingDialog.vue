<template>
  <v-dialog
      v-model="visible"
      hide-overlay
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text>
        <slot>
          Please stand by
        </slot>
        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'LoadingDialog',
    props: {
      'visible': {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
