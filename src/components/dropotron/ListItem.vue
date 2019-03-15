<template lang="pug">
  li(@mouseover="liClass = 'opener active'" @mouseleave="liClass = ''" :class="liClass")
    slot
</template>

<script>
export default {
  data() {
    return {
      liClass: ''
    }
  }
}
</script>
