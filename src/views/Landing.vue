<template lang="pug">
  #page-wrapper
    #header
      h1#logo
        a(href="/") Landed
      nav#nav
        ul
          li
            a(href="/") Home
          list-item
            a(href="#") Layouts
            ul
              li
                a(href="/left-sidebar") Left Sidebar
              li
                a(href="/right-sidebar.html") Right Sidebar
              li
                a(href="/no-sidebar.html") No Sidebar
              li
                a(href="#") Submenu
                ul
                  li
                    a(href="#") Option 1
                    a(href="#") Option 2
                    a(href="#") Option 3
                    a(href="#") Option 4
          li
            a(href="/element") Elements
          li
            a.button.primary(href="#") Sign Up
</template>

<script>
import ListItem from '@/components/dropotron/ListItem.vue'

export default {
  name: 'landing',
  components: { ListItem },
  methods: {
  }
}
</script>

<style lang="scss" scoped src="@/styles/landed/sass/main.scss">

</style>
