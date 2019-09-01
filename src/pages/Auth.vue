<template lang='pug'>
  q-page.q-pa-md
    q-form(
      ref='AuthenticationForm'
      @submit='performAuthentication'
      @reset='onReset'
    ).authentication.q-gutter-md
      router-link(to='/')
        img(src='/statics/hypersign-logo-new.png', alt='Logo', height='120').authentication__logo

      q-input(
        v-if='isRegisterUser'
        lazy-rules
        outlined
        autocomplete='name'
        data-cy='name'
        label='NAME'
        type='text'
        v-model='name'
        :rules="[val => !!val || '*Field is required']"
      )

      q-input(
        v-if='isRegisterUser'
        lazy-rules
        outlined
        autocomplete='email'
        data-cy='email'
        label='EMAIL'
        type='email'
        v-model='email'
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
      )
      q-input(
        lazy-rules
        outlined
        autocomplete="current-password new-password"
        data-cy='password'
        label='PASSWORD'
        v-model='password'
        :rules="[val => !!val || '*Field is required']"
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter='onSubmit(); $event.target.blur()'
      )
        template(v-slot:append='')
          q-icon.cursor-pointer(
            :name="isPwd ? 'visibility_off' : 'visibility'"
            @click='isPwd = !isPwd'
          )

      .flex.justify-between
        span.text-body1 {{ $route.name }} or&nbsp;
          .inline(v-if='!isRegisterUser', data-cy='userRegLink')
            | register a&nbsp;
            router-link(to='/auth/register' class='text-primary')
              | new user.
          .inline(v-else, data-cy='loginLink')
            router-link(to='/auth/login' class='text-primary') log in.
        q-btn(
          data-cy='submit'
          color='primary'
          :label='getAuthType'
          :loading='loading'
          @click='performAuthentication'
        )
          template(v-slot:loading='')
            q-spinner-gears
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Auth',
  created () {
    // console.log(this.$fb.test)
  },
  computed: {
    isRegisterUser () {
      return this.$route.name === 'Register'
    },
    getAuthType () {
      return this.isRegisterUser ? 'Register' : 'Login'
    },
    ...mapState(['wallet', 'user'])
  },
  data () {
    return {
      isPwd: true,
      loading: false,
      password: null,
      name: null,
      email: null
    }
  },
  methods: {
    ...mapActions('wallet', [
      'addSeedStore',
      'generate'
    ]),
    ...mapActions('user', [
      'authenticate'
    ]),

    checkCredentials () {
      console.log(this.$registerUser)
      if (this.email === '' || this.password === '') {
        this.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: 'Your credentials are invalid.'
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        throw new Error('Credentials are invalid.')
      }
    },
    register () {
      this.loading = true
      this.$store.commit('user/UPDATE_PASSWORD', this.password)
      this.$store.commit('user/UPDATE_NAME', this.name)
      this.$store.commit('user/UPDATE_EMAIL', this.email)
      this.generate()
        .then(res => {
          this.onReset()
          this.loading = false
        })
    },
    login () {
      this.loading = true
      this.authenticate(this.password)
        .then(res => {
          this.loading = false
          this.onReset()
          this.$router.push('/')
        })
        .catch(err => {
          this.loading = false
          console.error(err)
        })
    },
    performAuthentication () {
      return this.isRegisterUser
        ? this.register()
        : this.login()
    },
    onReset () {
      this.email = null
      this.name = null
      this.password = null
      this.$refs.AuthenticationForm.resetValidation()
    }
  }
}
</script>

<style lang='stylus'>
// variable place holder
// $
  +b('authentication')
    min-height 20vh
    max-width 30em
    margin auto
    position relative

    .inline
      display inline
      a
        text-decoration none

    +b('q-field__control.text-negative')
      &::before
        border-color rgba(0,0,0,0)

    +e('logo')
      display block
      margin 2em auto 1em
</style>
