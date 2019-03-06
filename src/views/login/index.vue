<template lang="pug">
#login
  form
    .svgContainer(ref="mySVG")
      div
        login-avatar
    .inputGroup.inputGroup1
      label(for="loginEmail" id="loginEmailLabel" ref="emailLabel") Email
      el-input(id="loginEmail" type="email" maxlength="254" placeholder="email@domain.com" v-model="email" ref="email"
        @focus="onEmailFocus"
        @blur="onEmailBlur"
        @input="onEmailInput"
      )
    .inputGroup.inputGroup2
      label(for="loginPassword" id="loginPasswordLabel" ref="passwordLabel") Password
      el-input(id="loginPassword" placeholder="your password" show-password v-model="password" ref="password")
    .inputGroup.inputGroup3
      el-button(id="loginBtn" type="primary") Login
</template>

<script>
import { TweenMax, Expo } from 'gsap'
import LoginAvatar from '@/assets/login-avatar.svg?inline'
import { setTimeout } from 'timers';

import anime from 'animejs'

function getPosition(el) {
  let xPos = 0
  let yPos = 0

  while (el) {
    if (el.tagName === 'BODY') {
      // deal with browser quirks with body/windo/document and page scroll
      let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      let yScroll = el.scrollTop || document.documentElement.scrollTop;

      xPos += (el.offsetLeft -xScroll + el.clientLeft)
      yPos += (el.offsetTop -yScroll + el.clientTop)
    } else {
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft)
      yPos += (el.offsetTop - el.scrollTop + el.clientTop)
    }

    el = el.offsetParent
  }

  return {
    x: xPos,
    y: yPos
  }
}

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y1 - y2, x1 - x2)
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

export default {
  components: {
    LoginAvatar
  },
  data() {
    return {
      email: '',
      password: '',
      // login animation
      svgCoords: {},
      emailCoords: {},
      screenCenter: 0,
      eyeLCoords: {},
      eyeRCoords: {},
      noseCoords: {},
      mouthCoords: {},
      mouthStatus: 'small',
      eyeScale: 1,
      chinMin: .5,
      dFromC: null,
      //
      eyeLAngle: null,
      eyeRAngle: null,
      noseAngle: null,
      mouthAngle: null,
      // svg refs
      mySVG: null,
      theEmail: null,
      tooth: null,
      tongue: null,
      eyeL: null,
      eyeR: null,
      nose: null,
      mouth: null,
      mouthBG: null,
      mouthOutline: null,
      mouthMaskPath: null,
      chin: null,
      face: null,
      eyebrow: null,
      outerEarL: null,
      outerEarR: null,
      earHairL: null,
      earHairR: null,
      hair: null,
      //
      emailScrollMax: null,
      //
      blinking: null,
    }
  },
  methods: {
    calculateFaceMove() {
      let
        carPos = this.theEmail.selectionEnd,
        div = document.createElement('div'),
        span = document.createElement('span'),
        caretCoords = {}

      if (!carPos) {
        // if browser doesn't support 'selectionEnd' property on input[type="email"], use 'value.length' property instead
        carPos = this.email.length;
      }
      
      div.style.position = 'absolute';
      document.body.appendChild(div);
      div.textContent = this.email.substr(0, carPos);
      span.textContent = this.email.substr(carPos) || '.';
      div.appendChild(span);

      if (this.theEmail.scrollWidth <= this.emailScrollMax) {
        caretCoords = getPosition(span);
        this.dFromC = this.screenCenter - (caretCoords.x + this.emailCoords.x);
        this.eyeLAngle = getAngle(this.eyeLCoords.x, this.eyeLCoords.y, this.emailCoords.x + caretCoords.x, this.emailCoords.y + 25);
        this.eyeRAngle = getAngle(this.eyeRCoords.x, this.eyeRCoords.y, this.emailCoords.x + caretCoords.x, this.emailCoords.y + 25);
        this.noseAngle = getAngle(
          this.noseCoords.x, 
          this.noseCoords.y, 
          this.emailCoords.x + caretCoords.x, 
          this.emailCoords.y + 25)
        
        this.mouthAngle = getAngle(this.mouthCoords.x, this.mouthCoords.y, this.emailCoords.x + caretCoords.x, this.emailCoords.y + 25);
      } else {
        this.eyeLAngle = getAngle(this.eyeLCoords.x, this.eyeLCoords.y, this.emailCoords.x + this.emailScrollMax, this.emailCoords.y + 25);
        this.eyeRAngle = getAngle(this.eyeRCoords.x, this.eyeRCoords.y, this.emailCoords.x + this.emailScrollMax, this.emailCoords.y + 25);
        this.noseAngle = getAngle(
          this.noseCoords.x, 
          this.noseCoords.y, 
          this.emailCoords.x + this.emailScrollMax, 
          this.emailCoords.y + 25)
        this.mouthAngle = getAngle(this.mouthCoords.x, this.mouthCoords.y, this.emailCoords.x + this.emailScrollMax, this.emailCoords.y + 25);
      }

      let eyeLX = Math.cos(this.eyeLAngle) * 20;
      let eyeLY = Math.sin(this.eyeLAngle) * 10;
      let eyeRX = Math.cos(this.eyeRAngle) * 20;
      let eyeRY = Math.sin(this.eyeRAngle) * 10;
      let noseX = Math.cos(this.noseAngle) * 23;
      let noseY = Math.sin(this.noseAngle) * 10;
      let mouthX = Math.cos(this.mouthAngle) * 23;
      let mouthY = Math.sin(this.mouthAngle) * 10;
      let mouthR = Math.cos(this.mouthAngle) * 6;
      let chinX = mouthX * .8;
      let chinY = mouthY * .5;
      let chinS = 1 - ((this.dFromC * .15) / 100);
      if (chinS > 1) {
        chinS = 1 - (chinS - 1);
        if (chinS < this.chinMin) {
          chinS = this.chinMin;
        }
      }
      let faceX = mouthX * .3;
      let faceY = mouthY * .4;
      let faceSkew = Math.cos(this.mouthAngle) * 5;
      let eyebrowSkew = Math.cos(this.mouthAngle) * 25;
      let outerEarX = Math.cos(this.mouthAngle) * 4;
      let outerEarY = Math.cos(this.mouthAngle) * 5;
      let hairX = Math.cos(this.mouthAngle) * 6;
      let hairS = 1.2;

      TweenMax.to(this.eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: Expo.easeOut })
      TweenMax.to(this.eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: Expo.easeOut })
      TweenMax.to(this.nose, 1, { x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
      TweenMax.to(this.mouth, 1, { x: -mouthX, y: -mouthY, rotation: mouthR, transformOrigin: "center center", ease: Expo.easeOut });
      TweenMax.to(this.chin, 1, { x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut });
      TweenMax.to(this.face, 1, { x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: "center top", ease: Expo.easeOut });
      TweenMax.to(this.eyebrow, 1, { x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: "center top", ease: Expo.easeOut });
      TweenMax.to(this.outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: Expo.easeOut });
      TweenMax.to(this.outerEarR, 1, { x: outerEarX, y: outerEarY, ease: Expo.easeOut });
      TweenMax.to(this.earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: Expo.easeOut });
      TweenMax.to(this.earHairR, 1, { x: -outerEarX, y: outerEarY, ease: Expo.easeOut });
      TweenMax.to(this.hair, 1, { x: hairX, scaleY: hairS, transformOrigin: "center bottom", ease: Expo.easeOut });

      document.body.removeChild(div);
    },
    resetFace() {
      TweenMax.to([this.eyeL, this.eyeR], 1, { x: 0, y: 0, ease: Expo.easeOut })
      TweenMax.to(this.nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut })
      TweenMax.to(this.mouth, 1, { x: 0, y: 0, rotation: 0, ease: Expo.easeOut })
      TweenMax.to(this.chin, 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut })
      TweenMax.to([this.face, this.eyebrow], 1, { x: 0, y: 0, skewX: 0, ease: Expo.easeOut })
      TweenMax.to([this.outerEarL, this.outerEarR, this.earHairL, this.earHairR, this.hair], 1, { x: 0, y: 0, scaleY: 1, ease: Expo.easeOut })
    },
    onEmailFocus(e) {
      this.activeElement = 'email'
      e.target.parentElement.classList.add('focusWithText')
      this.onEmailInput()
    },
    onEmailBlur(e) {
      this.activeElement = null
      setTimeout(() => {
        if (this.activeElement !== 'email' && e.target.value === '') {
          e.target.parentElement.classList.remove('focusWithText')
        }
        this.resetFace()
      }, 100)
    },
    onEmailInput(e) {
      this.calculateFaceMove(e)
      let value = this.email
      let curEmailIndex = value.length

      if (curEmailIndex > 0) {
        if (this.mouthStatus === 'small') {
          this.mouthStatus = 'medium';
          // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, shapeIndex: 8, ease: Expo.easeOut });
          anime({
            targets: [this.mouthBG, this.mouthOutline, this.mouthMaskPath],
            d: [
              {
                value: 'M95,104.2c-4.5,0-8.2-3.7-8.2-8.2v-2c0-1.2,1-2.2,2.2-2.2h22c1.2,0,2.2,1,2.2,2.2v2 c0,4.5-3.7,8.2-8.2,8.2H95z'
              }
            ],
            duration: 1000,
            easing: 'easeOutExpo'
          })
          TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
          TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
          TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
          this.eyeScale = .85;
        }
        if (value.includes('@')) {
          this.mouthStatus = 'large';
          // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthLargeBG, ease: Expo.easeOut });
          TweenMax.to(this.tooth, 1, { x: 3, y: -2, ease: Expo.easeOut });
          TweenMax.to(this.tongue, 1, { y: 2, ease: Expo.easeOut });
          TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: "center center" });
          this.eyeScale = .65;
        } else {
          this.mouthStatus = "medium";
          // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthMediumBG, ease: Expo.easeOut });
          TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
          TweenMax.to(this.tongue, 1, { x: 0, y: 1, ease: Expo.easeOut });
          TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: .85, scaleY: .85, ease: Expo.easeOut });
          this.eyeScale = .85;
        }
      } else {
        this.mouthStatus = 'small'
        
        // TweenMax.to([mouthBG, mouthOutline, mouthMaskPath], 1, { morphSVG: mouthSmallBG, shapeIndex: 9, ease: Expo.easeOut });
        TweenMax.to(this.tooth, 1, { x: 0, y: 0, ease: Expo.easeOut });
        TweenMax.to(this.tongue, 1, { y: 0, ease: Expo.easeOut });
        TweenMax.to([this.eyeL, this.eyeR], 1, { scaleX: 1, scaleY: 1, ease: Expo.easeOut });
        this.eyeScale = 1;
      }
    },
    startBlinking(delay) {
      if (delay) {
        delay = getRandomInt(delay)
      } else {
        delay = 1
      }
      const self = this

      anime({
        targets: [this.eyeL, this.eyeR],
        delay: delay*1000,
        duration: 100,
        scaleY: 0,
        direction: 'alternate', // yoyo
        transformOrigin: ['0px 82px 0', '0px 82px 0'], //  transformOrigin: "center center",
        loop: 1, // repeat
        easing: 'linear',
        complete: () => {
          self.startBlinking(12)
        }
      })
      // this.blinking = TweenMax.to([this.eyeL, this.eyeR], .1, {
      //   delay: delay/10, 
      //   scaleY: 0, 
      //   yoyo: true, 
      //   repeat: 1, 
      //   transformOrigin: "center center",
      //   onComplete: () => self.startBlinking(12)
      // })
    },
    stopBlinking() {
      this.blinking.kill()
      this.blinking = null
      TweenMax.set([this.eyeL, this.eyeR], { scaleY: this.eyeScale });
    }
  },
  mounted() {
    this.tooth = document.querySelector('.tooth')
    this.tongue = document.querySelector('.tongue')
    this.eyeL = document.querySelector('.eyeL')
    this.eyeR = document.querySelector('.eyeR')
    this.nose = document.querySelector('.nose')
    this.mouth = document.querySelector('.mouth')
    this.mouthBG = document.querySelector('.mouthBG')
    this.mouthOutline = document.querySelector('.mouthOutline')
    this.mouthMaskPath = document.querySelector('.mouthMaskPath')
    this.chin = document.querySelector('.chin')
    this.face = document.querySelector('.face')
    this.eyebrow = document.querySelector('.eyebrow')
    this.outerEarL = document.querySelector('.earL .outerEar')
    this.outerEarR = document.querySelector('.earR .outerEar')
    this.earHairL = document.querySelector('.earL .earHair')
    this.earHairR = document.querySelector('.earR .earHair')
    this.hair = document.querySelector('.hair')

    this.mySVG = document.querySelector('.svgContainer')
    this.theEmail = document.querySelector('#loginEmail')
    this.svgCoords = getPosition(this.mySVG)
    this.emailCoords = getPosition(this.theEmail)
    this.screenCenter = this.svgCoords.x + this.mySVG.offsetWidth / 2
    this.eyeLCoords = {
      x: this.svgCoords.x + 84,
      y: this.svgCoords.y + 76
    }
    this.eyeRCoords = {
      x: this.svgCoords.x + 113,
      y: this.svgCoords.y + 76
    }
    this.noseCoords = {
      x: this.svgCoords.x + 97,
      y: this.svgCoords.y + 81
    }
    this.mouthCoords = {
      x: this.svgCoords.x + 100,
      y: this.svgCoords.y + 100
    }

    // TweenMax.set(this.mouth, { transformOrigin: "center center" });
    this.mouth.transformOrigin = 'center center'
    anime({
      target: '.mouth',
      transformOrigin: 'center center'
    })
    // console.log(this.mouth)

    // activate blinking
    this.startBlinking(5);

    this.emailScrollMax = this.theEmail.scrollWidth;
  }
}
</script>

<style lang="stylus" scoped>
dark-blue = #217093
med-blue = #4eb8dd
light-blue = #ddf1fa
input-bg = #f3fafd

#login
  width 100%
  height 100%
  position relative
  font-family 'Source Sans Pro', sans-serif
  font-weight 400
  -webkit-font-smoothing antialiased
  background-color #eff3f4
  form
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -10%)
    display block
    width 100%
    max-width 400px
    background-color #fff
    margin 0
    padding 2.25em
    box-sizing border-box
    border solid 1px #ddd
    border-radius .5em
    font-family 'Source Sans Pro', sans-serif
    .svgContainer
      position relative
      width 200px
      height 200px
      margin 0 auto 1em
      border-radius 50%
      pointer-events none
      div
        position relative
        width 100%
        height 0
        overflow hidden
        border-radius 50%
        padding-bottom 100%
        .mySVG
          position absolute
          left 0
          top 0
          width 100%
          height 100%
          pointer-events none
        &:after
          content ''
          position absolute
          top 0
          left 0
          z-index 10
          width inherit
          height inherit
          box-sizing border-box
          border solid 2.5px dark-blue
          border-radius 50%
    .inputGroup
      margin 0 0 2em
      padding 0
      position relative
      &:last-of-type
        margin-bottom 0
    label
      margin 0 0 12px 
      display block
      font-size 1.25em
      color #217093
      font-weight 700
      font-family inherit
    >>>input[type='email']
    >>>input[type='text']
    >>>input[type='password']
      display block
      margin 0
      padding 0 1em 0
      background-color input-bg
      border solid 2px dark-blue
      box-sizing border-box
      width 100%
      height 45px
      font-size 1.55em
      color #353538
      font-weight 600
      font-family inherit
      transition box-shadow .2s linear, border-color .25s ease-out
      &:focus
        outline none
        box-shadow 0px 2px 10px rgba(0,0,0,.1)
        border solid 2px med-blue
</style>
