<template lang='pug'>
  q-page.q-pa-md
    q-form(
      ref='AuthenticationForm'
      @submit='onSubmit'
      @reset='onReset'
    ).authentication.q-gutter-md
      router-link(to='/')
        img(src='/statics/hyper-logo-blue.png', alt='Logo', height='180').authentication__logo

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
          @click='generate'
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
    ...mapState(['wallet', 'user']),
    password: {
      get () {
        return this.user.password
      },
      set (val) {
        this.$store.commit('user/UPDATE_PASSWORD', val)
      }
    },
    name: {
      get () {
        return this.user.name
      },
      set (val) {
        this.$store.commit('user/UPDATE_NAME', val)
      }
    },
    email: {
      get () {
        return this.user.email
      },
      set (val) {
        this.$store.commit('user/UPDATE_EMAIL', val)
      }
    }
  },
  data () {
    return {
      isPwd: true,
      loading: false
    }
  },
  methods: {
    ...mapActions('wallet', [
      'addSeedStore',
      'generate'
    ]),
    authenticate () {
      this.loading = true
      this.checkCredentials()
      this.performAuthentication()
        .then((user) => {
          this.loading = false
          // If you want to push the user further
          // into your app uncomment the line below and add your route
          // this.$router.push('/SOME_AUTHENTICATION_GUARDED_ROUTE')
          console.log('SUCCESS YOUR CURRENT USER OBJECT FROM FIREBASE IS:', this.$currentUser)
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'positive',
            message: `Success. Check your console for your current user object.`
          })
          this.resetFormFields()
        })
        .catch((error) => {
          console.error('FAILURE:', error)
          this.$q.notify({
            classes: 'text-weight-bold text-center',
            color: 'negative',
            message: `Looks like there is an issue: ${error.message}`
          })
          this.loading = false
        })
    },
    checkCredentials () {
      if (this.$v.email.$invalid || this.$v.password.$invalid) {
        this.$v.email.$touch()
        this.$v.password.$touch()
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
      if (this.isRegisterUser && this.$v.passwordMatch.$invalid) {
        this.$v.password.$touch()
        this.$v.passwordMatch.$touch()
        this.$q.notify({
          classes: 'text-weight-bold text-center',
          color: 'negative',
          message: 'Your passwords don\'t match'
        })
        setTimeout(() => {
          this.loading = false
        }, 1000)
        throw new Error('Password Mismatch')
      }
    },
    onSubmit (callback) {
      this.generate(callback)
      alert('Hello')
    },
    performAuthentication () {
      return this.isRegisterUser
        ? this.$registerUser(this.email, this.password)
        : this.$login(this.email, this.password)
    },
    onReset () {
      this.email = null
      this.password = null
      this.passwordMatch = null
      this.$refs.contactForm.resetValidation()
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
