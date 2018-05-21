    <template>

        <div class="container">
            <div id="login">
                <form @submit.prevent="login" class="col-sm-4 col-sm-offset-4">
                    <h2>{{$t('global.login')}}</h2>
                    <div class="alert alert-danger" v-if="error">
                        <p>{{ error }}</p>
                    </div>
                    <div class="form-group">
                        <input
                                type="email"
                                class="form-control"
                                placeholder="Enter your email"
                                v-model="credentials.email"
                        >
                    </div>
                    <div class="form-group">
                        <input
                                type="password"
                                class="form-control"
                                placeholder="Enter your password"
                                v-model="credentials.password"
                        >
                    </div>
                    <button class="btn btn-primary" type="submit">{{$t('global.login')}}</button>
                </form>
            </div>


            <div class="container" id="signup">
                <h2>{{$t('Signup.signup')}}</h2>
                    <form @submit.prevent="signup">
                        <div class="input">
                            <label for="email">{{$t('Signup.email')}}</label>
                            <input
                                    type="email"
                                    id="email"
                                    v-model="email">
                        </div>
                        <div class="input">
                            <label for="password">{{$t('Signup.password')}}</label>
                            <input
                                    type="password"
                                    id="password"
                                    v-model="password">
                        </div>
                        <div class="input">
                            <label for="confirm-password">{{$t('Signup.confirmPassword')}}</label>
                            <input
                                    type="password"
                                    id="confirm-password"
                                    v-model="confirmPassword">
                        </div>

                        <div class="submit">
                            <button class="btn btn-primary" type="submit">{{$t('global.submit')}}</button>
                        </div>
                    </form>
            </div>
        </div>
    </template>

<script>
  export default {
    name: 'signup',
    data() {
      return {
        credentials: {
          email: '',
          password: '',
        },
        email: '',
        password: '',
        confirmPassword: '',
        error: '',
      }
    },
    methods: {
      signup () {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        this.$store.dispatch('signup', formData)
      },
      login () {
        const credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        this.$store.dispatch('login', credentials)
      }
    }
  }
</script>

<style scoped>

</style>