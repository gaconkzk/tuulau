<template lang="pug">
  el-button(type="primary" @click="onClick")
    slot
</template>

<script>
  export default {
    name: 'my-button',

    methods: {
      onClick() {
        this.$emit('click')
      }
    }
  }
</script>

