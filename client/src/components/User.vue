<template>
    <div id="userpage">
        <h2 v-if="!auth">Your are not logged in</h2>
        <h2 v-if="auth">You should only see this when logged in</h2>

        <button v-if="auth" @click="logout()">Logout</button>
    </div>
</template>

<script>
    //list venues not reviewed
    //list venues reviewed
    //link to create venue if admin


  import axios from 'axios'
  export default {
    name: 'user',
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped>

</style>