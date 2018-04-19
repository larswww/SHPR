    <template>
        <div id="signup">
            <div class="signup-form">
                <form @submit.prevent="onSubmit">
                    <div class="input">
                        <label for="email">Mail</label>
                        <input
                                type="email"
                                id="email"
                                v-model="email">
                    </div>
                    <div class="input">
                        <label for="password">Password</label>
                        <input
                                type="password"
                                id="password"
                                v-model="password">
                    </div>
                    <div class="input">
                        <label for="confirm-password">Confirm Password</label>
                        <input
                                type="password"
                                id="confirm-password"
                                v-model="confirmPassword">
                    </div>

                    <div class="submit">
                        <button type="submit">Submit</button>
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
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      onSubmit() {
        const formData = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        this.$store.dispatch('signup', formData)
      }
    }
  }
</script>

<style scoped>

</style>