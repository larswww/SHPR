<template>
    <nav class="navbar fixed-top navbar-light bg-light">
        <a class="navbar-brand" href="#">Fixed top</a>
        <button @click="setLang('cn')">cn</button>

    </nav>
</template>

<script>
  export default {
    name: 'NavTop',
    methods: {
      setLang: function (lang) {
        this.$store.dispatch('setLang', lang)
        
      }
    }
  }
</script>

<style scoped>

</style>