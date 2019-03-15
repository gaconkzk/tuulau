<template lang="pug">
  .center
    .ear.ear--left
    .ear.ear--right

    .face(ref="face" :style="faceStyle")
      .eyes
        .eye.eye--left
          .glow
        .eye.eye--right
          .glow
      .nose
        svg(width="38.161" height="22.03")
          path(d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z" fill="#243946")
        .glow

      .mouth
        svg.smile(viewBox="-2 -2 84 23" width="84" height="23")
          path(d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161" fill="none" stroke-width="3" stroke-linecap="square" stroke-miterlimit="3")
        .mouth-hole
        .tongue(:class="breathClass")
          .tongue-top
          .line
          .median

    .hands
      .hand.hand--left(:class="handClass")
        .finger
          .bone
          .nail
        .finger
          .bone
          .nail
        .finger
          .bone
          .nail

      .hand.hand--right(:class="handClass")
        .finger
          .bone
          .nail
        .finger
          .bone
          .nail
        .finger
          .bone
          .nail

    .login
      label
        fai.fa(icon="user")
        input.email(type='text' autocomplete='on' placeholder='your_email@example.com'
          @focus="onEmailFocus"
          @input="throttle(onEmailInput, 100)"
          @blur="onEmailBlur"
          v-model="auth.email"
        )
      label
        fai.fa(:icon="['far', 'comment']")
        input.password(:type='passwordType'
          autocomplete='off'
          placeholder='@v3ry_cO0l_p44s!l'
          ref="password"
          @focus="onPasswordFocus"
          @blur="onPasswordBlur"
          v-model="auth.password"
        )
        button.password-button(@click.prevent="onShowPasswordClick")
          fai(:icon="passwordType==='password' ? 'eye' : 'eye-slash'")

      button.login-button(@click="register") Register

    .footer The Flies

    a(href='https://codepen.io/FilipVitas/pen/GdMbOX' class='inspiration' target='_blank' rel='noopener')
      img(src='https://cdn.dribbble.com/assets/logo-footer-hd-a05db77841b4b27c0bf23ec1378e97c988190dfe7d26e32e1faea7269f9e001b.png' alt='inspiration')
</template>

<script>
import throttle from 'lodash/throttle'

import firebase from 'firebase/app'
import('firebase/auth')

import { mapActions } from 'vuex'

export default {
  data() {
    return {
      auth: {
        email: '',
        password: ''
      },
      // show password
      passwordType: 'password',
      // animation
      faceFocus: false,
      handHide: false,
      handPeek: false,
      breath: true
    }
  },
  computed: {
    faceStyle() {
      if (!this.faceFocus) {
        return '0deg'
      }
      const l = Math.min((this.auth.email.length || 0) - 16, 19)
      return {
        '--rotate-head': `${-l}deg`
      }
    },
    breathClass() {
      if (!this.breath)
        return {}
      return 'breath'
    },
    handClass() {
      if (this.handHide) {
        return 'hide'
      }
      if (this.handPeek) {
        return 'peek'
      }
      return ''
    }
  },
  methods: {
    throttle,
    ...mapActions(['setAuth']),
    onEmailFocus() {
      this.faceFocus = true
      this.handHide = false
      this.handPeek = false
    },
    onEmailInput() {
      this.faceFocus = true
    },
    onEmailBlur() {
      this.faceFocus = false
    },
    onPasswordFocus() {
      if (this.passwordType === 'text') {
        this.handHide = false
        this.handPeek = true
      } else {
        this.handHide = true
        this.handPeek = false
      }
      this.breath = false
    },
    onPasswordBlur() {
      this.handHide = false
      this.handPeek = false
      this.breath = true
    },
    onShowPasswordClick() {
      if (this.passwordType === 'text') {
        this.passwordType = 'password'
        this.handHide = false
        this.handPeek = true
      } else {
        this.passwordType = 'text'
        this.handHide = true
        this.handPeek = false
      }
      this.$refs.password.focus()
    },
    register() {
      // TODO stop after done
      // setTimeout(() => loading.close(), 2000)
      firebase.auth()
        .createUserWithEmailAndPassword(
          this.auth.email, 
          this.auth.password)
        .then(() => {
          this.$router.replace('/')
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="stylus" src="./register.styl" scoped>
</style>
