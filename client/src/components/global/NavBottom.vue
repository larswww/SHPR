<template>
    <nav class="nav nav-pills fixed-bottom bg-dark nav-fill">
        <router-link class="nav-item nav-link" to="/" exact> <i class="fal fa-list-ol"></i></router-link>
        <router-link class="nav-item nav-link" to="#" exact> <i class="fal fa-map"></i></router-link>
        <router-link v-if="auth" class="nav-item nav-link" to="/user" exact> <i class="fal fa-user-secret"></i></router-link>
        <router-link v-if="!auth" class="nav-item nav-link" to="/signup" exact> <i class="fal fa-user-secret"></i></router-link>
    </nav>

</template>

<script>
  export default {
    name: 'nav-bottom',
    computed: {
      auth () {
        return this.$store.getters.isAuthenticated
      }
    }
  }
</script>

<style scoped>

</style>