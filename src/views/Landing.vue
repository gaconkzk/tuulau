<template lang="pug">
#landing
  #header
    #header-content
      #search
        form
          input.search_input(type="text" value="Looking for something?")
          input(type="image" src="/img/landing/search-btn.png")
      #social_media
        |Follow us &nbsp;&nbsp;
        a(href="#")
          img(src="/img/landing/icons/twitter_16.png" width="16" height="16" alt="Twitter")
          img(src="/img/landing/icons/facebook_16.png" width="16" height="16" alt="Facebook")
          img(src="/img/landing/icons/technorati_16.png" width="16" height="16" alt="Technorati")
          img(src="/img/landing/icons/rss_16.png" width="16" height="16" alt="RSS")
    #logo
      a(href="#")
        img(src="/img/landing/logo.png" width="340" height="135" alt="tuulau")
    ul#main_navigation
      li
        a(href="#") Home
      li
        a(href="#") About us
      li
        a(href="#") Contact us
  #content
    #top_banner Top Banner
  #footer Footer
</template>

<script>
// import ListItem from '@/components/dropotron/ListItem.vue'

export default {
  name: 'landing',
  // components: { ListItem },
  methods: {
  }
}
</script>

<style lang="stylus" src="@/styles/reset.styl">
</style>

<style lang="stylus">
/*Font Face Kits*/
@import url("/fonts/komika-text/stylesheet.css") screen
@import url("/fonts/komika-title/stylesheet.css") screen

// Common
body
  background-color #000
  background-image url(/img/landing/bg-body.jpg)
  background-position center top
  background-repeat no-repeat
  font-family 'KomikaTextTightRegular', Arial, Helvetica, sans-serif
  font-size 1em

#landing
  margin 0px auto
  width 960px

#header
  width 960px
  height 180px
  float left
  // background-color transparent

#header-content
  // background-color transparent
  float right
  width 440px
  height 105px
  background-image url(/img/landing/bg-search.png)

#search
  text-align right
  padding-top 10px
  input
    vertical-align middle
  .search_input
    width 160px
    margin-right 10px
    padding 6px 10px
    color #f2aa00
    font-family 'KomikaTextTightRegular', Arial, Helvetica, sans-serif
    font-size 14px
    background-color #280000
    border 1 solid #7c0000
    -webkit-border-radius 3px
    -khtml-border-radius 3px
    -moz-border-radius 3px
    border-radius 3px

#social_media
  padding-top 15px
  text-align right
  color #fff
  font-family 'KomikaTitleRegular', Arial, Helvetica, sans-serif
  font-size 15px
  vertical-align middle
  text-shadow 2px 2px 2px rgba(0, 0, 0, .5)

#logo
  padding-top 32px
  padding-left 70px

#main_navigation
  float right
  margin-top -18px
  margin-right 20px
  li
    display inline
    width 120px
    a
      display block
      float left
      padding-top 7px
      padding-bottom 8px
      padding-left 20px
      padding-right 20px
      margin-left 5px
      color #fff
      font-family 'KomikaTextItalic', Arial, Helvetica, sans-serif
      font-size 18px
      text-decoration none
      text-shadow 2px 2px 2px rgba(0,0,0,.5)
      -webkit-border-top-right-radius 3px
      -khtml-border-radius-topright 3px
      -moz-border-radius-topright 3px
      border-top-right-radius 3px
      &.selected
      &:hover
        background-image url(/img/landing/bg-main-navigation.png)
        background-position left
        background-repeat no-repeat

#content
  width 960px
  height 400px
  float left
  background-color #FCC

#top_banner
  float left
  width 960px
  height 250px
  background-image url(/img/landing/bg-banner.jpg)
  background-position center top
  background-repeat no-repeat

#footer
  width 960px
  height 250px
  float left
  background-image url(/img/landing/bg-footer.jpg)
  background-position top center
  background-repeat no-repeat
</style>
