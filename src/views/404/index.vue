<template lang="pug">
  .page_404
    el-row(justify="center")
      el-col(:span="20" :offset="2" align="center")
        div
          .four_zero_four_bg
            h1.text-center 404
          .contant_box_404
            h3.h2 Look like you're lost
            p the page you are looking for not avaible!
            a.link_404(href="/") Home
</template>

<style lang="stylus" scoped>
.text-center
  text-align center
.page_404
  padding 40px 0
  background #ffffff
  height 100vh
  font-family Arvo, serif
  .four_zero_four_bg
    background-image url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)
    height 400px
    background-position center
    background-repeat no-repeat
    h1
      font-size 80px
    h3
      font-size 80px
  .link_404
    color #fff !important
    padding 10px 20px
    background #39ac31
    margin 20px 0
    display inline-block
  .contant_box_404
    margin-top -50px
</style>
