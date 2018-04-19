<template>
    <div id="userpage">
        <h2 v-if="!auth">Your are not logged in</h2>
        <h2 v-if="auth">You should only see this when logged in</h2>
    </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'user',
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style scoped>

</style>